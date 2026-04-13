const fs = require("fs");
const path = require("path");

const PROJECT_ROOT = process.cwd();
const PUBLIC_DIR = path.join(PROJECT_ROOT, "public");
const TRASH_DIR = path.join(PROJECT_ROOT, "public_trash");

const SEARCH_DIRS = ["src", "app", "pages"];
const EXTRA_FILES = [
  "next.config.js",
  "tailwind.config.js",
  "app/layout.tsx",
  "public/manifest.json",
  "public/robots.txt",
];

// --------------------

function getAllFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).flatMap((file) => {
    const fullPath = path.join(dir, file);
    return fs.statSync(fullPath).isDirectory()
      ? getAllFiles(fullPath)
      : fullPath;
  });
}

// Make sure trash dir exists
if (!fs.existsSync(TRASH_DIR)) {
  fs.mkdirSync(TRASH_DIR, { recursive: true });
}

// Read all source content
let sourceText = "";

// Scan code directories
SEARCH_DIRS.forEach((dir) => {
  const fullDir = path.join(PROJECT_ROOT, dir);
  getAllFiles(fullDir).forEach((f) => {
    sourceText += fs.readFileSync(f, "utf8") + "\n";
  });
});

// Scan extra files
EXTRA_FILES.forEach((file) => {
  const fullPath = path.join(PROJECT_ROOT, file);
  if (fs.existsSync(fullPath)) {
    sourceText += fs.readFileSync(fullPath, "utf8") + "\n";
  }
});

// Find public assets
const publicFiles = getAllFiles(PUBLIC_DIR).filter(
  (f) => !f.includes(".DS_Store")
);

console.log("\n🔍 Scanning public assets...\n");

let movedCount = 0;

publicFiles.forEach((file) => {
  const relative = path.relative(PUBLIC_DIR, file).replace(/\\/g, "/");
  const publicPath = `/${relative}`;

  if (!sourceText.includes(publicPath)) {
    const trashPath = path.join(TRASH_DIR, relative);

    fs.mkdirSync(path.dirname(trashPath), { recursive: true });
    fs.renameSync(file, trashPath);

    console.log(`🗑️  Moved: ${publicPath}`);
    movedCount++;
  }
});

console.log(`\n✅ Done! ${movedCount} unused assets moved to /public_trash`);
console.log("👉 Review them before permanently deleting.\n");
