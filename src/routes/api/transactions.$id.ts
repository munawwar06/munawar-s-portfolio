import { createFileRoute } from "@tanstack/react-router";
import { corsPreflight, json, readJson, requireAuth } from "@/lib/api.server";
import type { Database } from "@/integrations/supabase/types";

type TxUpdate = Database["public"]["Tables"]["transactions"]["Update"];

export const Route = createFileRoute("/api/transactions/$id")({
  server: {
    handlers: {
      OPTIONS: async () => corsPreflight(),
      GET: async ({ request, params }) => {
        const ctx = await requireAuth(request);
        if (ctx instanceof Response) return ctx;
        const { data, error } = await ctx.client
          .from("transactions")
          .select("*, category:categories(id,name,type)")
          .eq("id", params.id)
          .maybeSingle();
        if (error) return json({ error: error.message }, 400);
        if (!data) return json({ error: "Not found" }, 404);
        return json({ transaction: data });
      },
      PUT: async ({ request, params }) => {
        const ctx = await requireAuth(request);
        if (ctx instanceof Response) return ctx;
        const body = await readJson<{
          amount?: number;
          type?: "income" | "expense";
          category_id?: string | null;
          date?: string;
          description?: string | null;
        }>(request);
        if (!body) return json({ error: "Invalid JSON" }, 400);
        const patch: TxUpdate = {};
        if (body.amount !== undefined) {
          if (body.amount < 0) return json({ error: "amount must be >= 0" }, 400);
          patch.amount = body.amount;
        }
        if (body.type !== undefined) {
          if (body.type !== "income" && body.type !== "expense")
            return json({ error: "type must be 'income' or 'expense'" }, 400);
          patch.type = body.type;
        }
        if (body.category_id !== undefined) patch.category_id = body.category_id;
        if (body.date !== undefined) patch.date = body.date;
        if (body.description !== undefined) patch.description = body.description;

        const { data, error } = await ctx.client
          .from("transactions")
          .update(patch)
          .eq("id", params.id)
          .select()
          .maybeSingle();
        if (error) return json({ error: error.message }, 400);
        if (!data) return json({ error: "Not found" }, 404);
        return json({ transaction: data });
      },
      DELETE: async ({ request, params }) => {
        const ctx = await requireAuth(request);
        if (ctx instanceof Response) return ctx;
        const { error, count } = await ctx.client
          .from("transactions")
          .delete({ count: "exact" })
          .eq("id", params.id);
        if (error) return json({ error: error.message }, 400);
        if (!count) return json({ error: "Not found" }, 404);
        return json({ success: true });
      },
    },
  },
});
