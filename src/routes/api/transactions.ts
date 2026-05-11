import { createFileRoute } from "@tanstack/react-router";
import { corsPreflight, json, readJson, requireAuth } from "@/lib/api.server";

export const Route = createFileRoute("/api/transactions")({
  server: {
    handlers: {
      OPTIONS: async () => corsPreflight(),
      GET: async ({ request }) => {
        const ctx = await requireAuth(request);
        if (ctx instanceof Response) return ctx;

        const url = new URL(request.url);
        const month = url.searchParams.get("month");
        const year = url.searchParams.get("year");
        const categoryId = url.searchParams.get("category_id");
        const type = url.searchParams.get("type");
        const page = Math.max(1, Number(url.searchParams.get("page") || 1));
        const limit = Math.min(100, Math.max(1, Number(url.searchParams.get("limit") || 20)));
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        let q = ctx.client
          .from("transactions")
          .select("*, category:categories(id,name,type)", { count: "exact" })
          .order("date", { ascending: false })
          .range(from, to);

        if (categoryId) q = q.eq("category_id", categoryId);
        if (type === "income" || type === "expense") q = q.eq("type", type);
        if (year) {
          const y = Number(year);
          if (month) {
            const m = Number(month);
            const start = `${y}-${String(m).padStart(2, "0")}-01`;
            const endDate = new Date(Date.UTC(y, m, 0));
            const end = endDate.toISOString().slice(0, 10);
            q = q.gte("date", start).lte("date", end);
          } else {
            q = q.gte("date", `${y}-01-01`).lte("date", `${y}-12-31`);
          }
        }

        const { data, error, count } = await q;
        if (error) return json({ error: error.message }, 400);
        return json({
          transactions: data,
          pagination: { page, limit, total: count ?? 0, pages: Math.ceil((count ?? 0) / limit) },
        });
      },
      POST: async ({ request }) => {
        const ctx = await requireAuth(request);
        if (ctx instanceof Response) return ctx;
        const body = await readJson<{
          amount?: number;
          type?: "income" | "expense";
          category_id?: string;
          date?: string;
          description?: string;
        }>(request);
        if (!body || typeof body.amount !== "number" || !body.type) {
          return json({ error: "amount and type required" }, 400);
        }
        if (body.amount < 0) return json({ error: "amount must be >= 0" }, 400);
        if (body.type !== "income" && body.type !== "expense") {
          return json({ error: "type must be 'income' or 'expense'" }, 400);
        }
        const { data, error } = await ctx.client
          .from("transactions")
          .insert({
            user_id: ctx.userId,
            amount: body.amount,
            type: body.type,
            category_id: body.category_id ?? null,
            date: body.date ?? new Date().toISOString().slice(0, 10),
            description: body.description ?? null,
          })
          .select()
          .single();
        if (error) return json({ error: error.message }, 400);
        return json({ transaction: data }, 201);
      },
    },
  },
});
