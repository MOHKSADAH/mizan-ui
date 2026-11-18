export function PageHeader({ title, description, children }: { title: string; description?: string; children?: React.ReactNode }) {
  return (
    <header className="mb-8 grid gap-2">
      <h1 className="text-3xl font-semibold tracking-tight text-balance">{title}</h1>
      {description && <p className="text-base text-pretty text-muted-foreground">{description}</p>}
      {children}
    </header>
  );
}
