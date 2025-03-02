import { getMarkdownFiles } from "../../lib/markdown";


export default function handler(req :any, res : any) {
  try {
    const markdownFiles = getMarkdownFiles(); // Récupère les fichiers Markdown
    
    res.status(200).json({ markdownFiles });
  } catch (error) {
    console.error("Erreur lors de la récupération des fichiers Markdown :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des fichiers Markdown" });
  }
}
