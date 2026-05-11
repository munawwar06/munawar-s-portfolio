import { createFileRoute } from "@tanstack/react-router";
import { corsPreflight, json, readJson, requireAuth } from "@/lib/api.server";

export const Route = createFileRoute("/api/categories")({
  server: {
    handlers: {
      OPTIONS: async () => corsPreflight(),
      GET: async ({ request }) => {
        const ctx = await requireAuth(request);
        if (ctx instanceof Response) return ctx;
        const { data, error } = await ctx.client
          .from("categories")
          .select("*")
          .order("is_default", { ascending: false })
          .order("name");
        if (error) return json({ error: error.message }, 400);
        return json({ categories: data });
      },
      POST: async ({ request }) => {
        const ctx = await requireAuth(request);
        if (ctx instanceof Response) return ctx;
        const body = await readJson<{ name?: string; type?: "income" | "expense" }>(request);
        if (!body?.name || !body?.type) return json({ error: "name and type required" }, 400);
        if (body.type !== "income" && body.type !== "expense") {
          return json({ error: "type must be 'income' or 'expense'" }, 400);
        }
        const { data, error } = await ctx.client
          .from("categories")
          .insert({ name: body.name, type: body.type, user_id: ctx.userId, is_default: false })
          .select()
          .single();
        if (error) return json({ error: error.message }, 400);
        return json({ category: data }, 201);
      },
    },
  },
});
