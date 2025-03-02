let fs:any;
if (typeof window === "undefined") {
  fs = require("fs"); // Charger `fs` uniquement côté serveur
}
import path from "path"; // Module pour gérer les chemins de fichiers
import matter from "gray-matter"; // Librairie pour lire du Markdown avec des métadonnées

export function getMarkdownContent(fileName : string) {
  // 1. Récupérer le chemin complet du fichier
  const filePath = path.join(process.cwd(), "public", "markdown", fileName);

  // 2. Lire le contenu brut du fichier Markdown
  const fileContents = fs.readFileSync(filePath, "utf-8");

  // 3. Utiliser gray-matter pour séparer les métadonnées et le contenu principal
  const { data, content } = matter(fileContents);

  return { data, content }; // Retourner les métadonnées et le contenu
}

// Récupère les noms des fichiers Markdown dans un répertoire donné
export function getMarkdownFiles(directory = "public/markdown") {
  const dirPath = path.resolve(process.cwd(), directory); // Utiliser un chemin absolu
  console.log("Checking path:", dirPath);
  if (!fs.existsSync(dirPath)) {
    console.error("Directory does not exist:", dirPath);
    return [];
  }
    try {
    const filenames = fs.readdirSync(dirPath); // Liste des fichiers
    return filenames
      .filter((file:any) => file.endsWith(".md") && file != 'footer.md') // Ne garder que les fichiers .md
      .map((file:any) => file.replace(".md", "")); // Supprimer l'extension .md
  } catch (error) {
    console.error("Error reading directory:", error);
    return [];
  }
}

export function getFooterMarkdownContent(directory = "public/markdown") {
  const filePath = path.join(process.cwd(), directory, "footer.md");
  const content = fs.readFileSync(filePath, "utf-8");
  return content;
}




