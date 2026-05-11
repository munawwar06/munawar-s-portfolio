import { createFileRoute } from "@tanstack/react-router";
import { corsPreflight, json, requireAuth } from "@/lib/api.server";

export const Route = createFileRoute("/api/summary")({
  server: {
    handlers: {
      OPTIONS: async () => corsPreflight(),
      GET: async ({ request }) => {
        const ctx = await requireAuth(request);
        if (ctx instanceof Response) return ctx;

        const url = new URL(request.url);
        const start = url.searchParams.get("start");
        const end = url.searchParams.get("end");

        let q = ctx.client.from("transactions").select("amount,type,date");
        if (start) q = q.gte("date", start);
        if (end) q = q.lte("date", end);

        const { data, error } = await q;
        if (error) return json({ error: error.message }, 400);

        let income = 0;
        let expenses = 0;
        for (const row of data ?? []) {
          const amt = Number(row.amount);
          if (row.type === "income") income += amt;
          else expenses += amt;
        }
        return json({
          range: { start: start ?? null, end: end ?? null },
          total_income: income,
          total_expenses: expenses,
          balance: income - expenses,
          transaction_count: data?.length ?? 0,
        });
      },
    },
  },
});
