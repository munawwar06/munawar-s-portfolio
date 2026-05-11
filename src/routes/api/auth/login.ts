import { createFileRoute } from "@tanstack/react-router";
import { corsPreflight, json, publicClient, readJson } from "@/lib/api.server";

export const Route = createFileRoute("/api/auth/login")({
  server: {
    handlers: {
      OPTIONS: async () => corsPreflight(),
      POST: async ({ request }) => {
        const body = await readJson<{ email?: string; password?: string }>(request);
        if (!body?.email || !body?.password) {
          return json({ error: "email and password required" }, 400);
        }
        const sb = publicClient();
        const { data, error } = await sb.auth.signInWithPassword({
          email: body.email,
          password: body.password,
        });
        if (error) return json({ error: error.message }, 401);
        return json({
          user: { id: data.user.id, email: data.user.email },
          access_token: data.session?.access_token,
          refresh_token: data.session?.refresh_token,
          expires_at: data.session?.expires_at,
          token_type: "bearer",
        });
      },
    },
  },
});
