const root = `${import.meta.dir}/../public`;
const port = Number(process.env.PORT ?? 4000);

Bun.serve({
  port,
  async fetch(req) {
    const file = Bun.file(root + decodeURIComponent(new URL(req.url).pathname));
    return (await file.exists()) ? new Response(file) : new Response('Not found', { status: 404 });
  },
});
console.log(`registry on http://localhost:${port}`);
