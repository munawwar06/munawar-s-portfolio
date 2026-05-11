import { createFileRoute } from "@tanstack/react-router";
import { corsPreflight, json, requireAuth } from "@/lib/api.server";

function csvEscape(v: unknown): string {
  if (v === null || v === undefined) return "";
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export const Route = createFileRoute("/api/export")({
  server: {
    handlers: {
      OPTIONS: async () => corsPreflight(),
      GET: async ({ request }) => {
        const ctx = await requireAuth(request);
        if (ctx instanceof Response) return ctx;

        const { data, error } = await ctx.client
          .from("transactions")
          .select("date,type,amount,description,category:categories(name)")
          .order("date", { ascending: false });
        if (error) return json({ error: error.message }, 400);

        const header = "date,type,amount,category,description";
        const rows = (data ?? []).map((r) => {
          const cat = (r.category as { name?: string } | null)?.name ?? "";
          return [r.date, r.type, r.amount, cat, r.description].map(csvEscape).join(",");
        });
        const csv = [header, ...rows].join("\n");

        return new Response(csv, {
          status: 200,
          headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename="vault-transactions-${new Date()
              .toISOString()
              .slice(0, 10)}.csv"`,
            "Access-Control-Allow-Origin": "*",
          },
        });
      },
    },
  },
});
