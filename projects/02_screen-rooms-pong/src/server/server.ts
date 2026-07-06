import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const root = process.cwd();
const port = Number(process.env.PORT || 8000);
const types: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".ts": "text/typescript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
};

let clientBundle: string | null = null;

async function bundleClient() {
  if (clientBundle) return clientBundle;

  console.log("Building client bundle...");
  const result = await Bun.build({
    entrypoints: ["./src/client/main.ts"],
    outdir: "./dist",
    target: "browser",
  });

  if (!result.success) {
    console.error("Build failed:", result.logs);
    throw new Error("Failed to build client");
  }

  clientBundle = await readFile("./dist/main.js", "utf-8");
  console.log("Client bundle ready!");
  return clientBundle;
}

createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://127.0.0.1:${port}`);
    let pathname = url.pathname === "/" ? "/index.html" : url.pathname;

    // Handle main.js from bundle
    if (pathname === "/main.js") {
      const bundle = await bundleClient();
      res.writeHead(200, { "content-type": types[".js"] });
      res.end(bundle);
      return;
    }

    // Serve HTML files from public directory
    if (pathname.endsWith(".html")) {
      pathname = `/public${pathname}`;
    }

    const file = normalize(join(root, pathname));
    if (!file.startsWith(root)) throw new Error("bad path");

    const body = await readFile(file);
    res.writeHead(200, {
      "content-type": types[extname(file)] || "application/octet-stream",
    });
    res.end(body);
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("Server error:", msg);
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("not found");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Screen Rooms Pong: http://127.0.0.1:${port}/`);
});
