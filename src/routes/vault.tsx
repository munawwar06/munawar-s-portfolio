import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/vault")({
  component: VaultDocs,
  head: () => ({
    meta: [
      { title: "Vault — Personal Finance REST API" },
      {
        name: "description",
        content:
          "Vault is a secure REST API for tracking income, expenses, categories, and financial summaries.",
      },
    ],
  }),
});

type EndpointProps = {
  method: string;
  path: string;
  desc: string;
  auth?: boolean;
  body?: string;
};

function Endpoint({ method, path, desc, auth, body }: EndpointProps) {
  const colors: Record<string, string> = {
    GET: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    POST: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    PUT: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    DELETE: "bg-red-500/15 text-red-400 border-red-500/30",
  };
  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-2">
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`px-2 py-0.5 rounded border text-xs font-mono font-semibold ${colors[method]}`}
        >
          {method}
        </span>
        <code className="font-mono text-sm text-foreground">{path}</code>
        {auth && (
          <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
            auth
          </span>
        )}
      </div>
      <p className="text-sm text-muted-foreground">{desc}</p>
      {body && (
        <pre className="bg-muted/40 border border-border rounded p-2 overflow-x-auto text-xs font-mono text-foreground/80">
{body}
        </pre>
      )}
    </div>
  );
}

function VaultDocs() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-10">
          <p className="text-sm font-mono text-primary mb-2">v1.0 · REST API</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Vault</h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
            A secure personal finance REST API. Track income, expenses, categories
            and financial summaries. All endpoints return JSON. Authenticate with a
            Bearer token from <code className="font-mono">/api/auth/login</code>.
          </p>
        </header>

        <section className="space-y-3 mb-10">
          <h2 className="text-xl font-semibold">Authentication</h2>
          <Endpoint
            method="POST"
            path="/api/auth/register"
            desc="Create an account."
            body={`{
  "email": "you@example.com",
  "password": "secret123",
  "username": "optional"
}`}
          />
          <Endpoint
            method="POST"
            path="/api/auth/login"
            desc="Returns access_token. Send as 'Authorization: Bearer <token>'."
            body={`{ "email": "you@example.com", "password": "secret123" }`}
          />
        </section>

        <section className="space-y-3 mb-10">
          <h2 className="text-xl font-semibold">Categories</h2>
          <Endpoint method="GET" path="/api/categories" auth desc="List your categories plus defaults." />
          <Endpoint
            method="POST"
            path="/api/categories"
            auth
            desc="Create a custom category."
            body={`{ "name": "Coffee", "type": "expense" }`}
          />
        </section>

        <section className="space-y-3 mb-10">
          <h2 className="text-xl font-semibold">Transactions</h2>
          <Endpoint
            method="GET"
            path="/api/transactions"
            auth
            desc="List your transactions. Query: ?month=05&year=2026&category_id=...&type=expense&page=1&limit=20"
          />
          <Endpoint
            method="POST"
            path="/api/transactions"
            auth
            desc="Create a new income or expense."
            body={`{
  "amount": 49.90,
  "type": "expense",
  "category_id": "uuid-or-null",
  "date": "2026-05-11",
  "description": "Groceries"
}`}
          />
          <Endpoint method="GET" path="/api/transactions/:id" auth desc="Fetch a single transaction." />
          <Endpoint
            method="PUT"
            path="/api/transactions/:id"
            auth
            desc="Update any subset of fields."
            body={`{ "amount": 60, "description": "Updated note" }`}
          />
          <Endpoint method="DELETE" path="/api/transactions/:id" auth desc="Delete a transaction." />
        </section>

        <section className="space-y-3 mb-10">
          <h2 className="text-xl font-semibold">Analytics & Export</h2>
          <Endpoint
            method="GET"
            path="/api/summary"
            auth
            desc="Totals + balance. Optional: ?start=YYYY-MM-DD&end=YYYY-MM-DD"
          />
          <Endpoint method="GET" path="/api/export" auth desc="Download all transactions as CSV." />
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Data Isolation</h2>
          <p className="text-sm text-muted-foreground">
            Row-Level Security on the database guarantees each user can only read
            and modify their own categories and transactions. The Bearer token
            scopes every query to the authenticated user automatically.
          </p>
        </section>
      </div>
    </div>
  );
}
