import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const root = process.cwd();
  const configPath = path.join(root, "pro", "p.json");
  const promptDir = path.join(root, "pro", "prompts");

  const [rawConfig, files] = await Promise.all([
    fs.readFile(configPath, "utf8"),
    fs.readdir(promptDir)
  ]);

  const prompts = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const id = file.replace(/\.md$/, "");
        const content = await fs.readFile(path.join(promptDir, file), "utf8");
        const title = content.match(/^#\s+(.+)$/m)?.[1] ?? id;
        return {
          id,
          title,
          content
        };
      })
  );

  return NextResponse.json({
    config: JSON.parse(rawConfig),
    prompts
  });
}
