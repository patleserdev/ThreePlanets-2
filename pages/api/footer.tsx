import fs from "fs";
import path from "path";


export default function handler(req:any, res:any) {
  const filePath = path.join(process.cwd(), "public", "markdown", "footer.md");
  const content = fs.readFileSync(filePath, "utf-8");
  res.status(200).json({ content });
}
