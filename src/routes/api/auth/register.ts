import { createFileRoute } from "@tanstack/react-router";
import { corsPreflight, json, publicClient, readJson } from "@/lib/api.server";

export const Route = createFileRoute("/api/auth/register")({
  server: {
    handlers: {
      OPTIONS: async () => corsPreflight(),
      POST: async ({ request }) => {
        const body = await readJson<{ email?: string; password?: string; username?: string }>(request);
        if (!body?.email || !body?.password) {
          return json({ error: "email and password required" }, 400);
        }
        if (body.password.length < 6) {
          return json({ error: "password must be at least 6 characters" }, 400);
        }
        const sb = publicClient();
        const { data, error } = await sb.auth.signUp({
          email: body.email,
          password: body.password,
          options: { data: { username: body.username ?? null } },
        });
        if (error) return json({ error: error.message }, 400);
        return json({
          user: data.user ? { id: data.user.id, email: data.user.email } : null,
          session: data.session,
        }, 201);
      },
    },
  },
});
