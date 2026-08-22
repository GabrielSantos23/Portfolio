import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import dotenv from "dotenv";

dotenv.config();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "qo5g6ehx";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const backupDir = path.join(process.cwd(), "sanity-backup");
const documentsDir = path.join(backupDir, "documents");
const assetsDir = path.join(backupDir, "assets");
const tempExtractDir = path.join(backupDir, "temp_extract");

async function exportSanity() {
  console.log("=========================================");
  console.log("   Starting Sanity CMS Data Export");
  console.log("=========================================");
  console.log(`Project ID: ${projectId}`);
  console.log(`Dataset:    ${dataset}`);
  console.log(`Backup Dir: ${backupDir}`);
  console.log("-----------------------------------------");

  // Create output directories
  fs.mkdirSync(backupDir, { recursive: true });
  fs.mkdirSync(documentsDir, { recursive: true });
  fs.mkdirSync(assetsDir, { recursive: true });
  fs.mkdirSync(tempExtractDir, { recursive: true });

  // 1. Run official CLI export tarball
  const tarballPath = path.join(backupDir, `${dataset}-backup.tar.gz`);
  console.log(`\n1. Exporting full Sanity dataset tarball (${tarballPath})...`);
  const cmd = `npx sanity dataset export ${dataset} "${tarballPath}" --overwrite --project-id ${projectId}`;
  console.log(`> Executing: ${cmd}`);
  execSync(cmd, { stdio: "inherit", cwd: process.cwd() });
  console.log("✔ Official dataset tarball generated successfully.");

  // 2. Extract tarball to temp_extract directory
  console.log("\n2. Extracting tarball contents...");
  execSync(`tar -xzf "${tarballPath}" -C "${tempExtractDir}"`, { stdio: "inherit" });

  const extractedFolders = fs.readdirSync(tempExtractDir).filter((name) => {
    return fs.statSync(path.join(tempExtractDir, name)).isDirectory();
  });

  if (extractedFolders.length === 0) {
    throw new Error("No extracted folder found from tarball.");
  }

  const exportFolder = path.join(tempExtractDir, extractedFolders[0]);
  console.log(`✔ Extracted data folder: ${extractedFolders[0]}`);

  // 3. Copy data.ndjson to sanity-backup/data.ndjson
  const sourceNdjson = path.join(exportFolder, "data.ndjson");
  const targetNdjson = path.join(backupDir, "data.ndjson");
  if (fs.existsSync(sourceNdjson)) {
    fs.copyFileSync(sourceNdjson, targetNdjson);
    console.log("✔ Saved data.ndjson to root of sanity-backup.");
  }

  // 4. Parse documents and group by _type into JSON files
  console.log("\n3. Parsing documents into typed JSON files...");
  const rawLines = fs.readFileSync(targetNdjson, "utf-8").split("\n").filter((line) => line.trim().length > 0);
  const allDocuments: Array<Record<string, any>> = rawLines.map((line) => JSON.parse(line));
  console.log(`✔ Total documents in dataset: ${allDocuments.length}`);

  const documentsByType: Record<string, Array<Record<string, any>>> = {};
  for (const doc of allDocuments) {
    const docType = doc._type || "unknown";
    if (!documentsByType[docType]) {
      documentsByType[docType] = [];
    }
    documentsByType[docType].push(doc);
  }

  const typeCounts: Record<string, number> = {};
  for (const [docType, docs] of Object.entries(documentsByType)) {
    typeCounts[docType] = docs.length;
    const safeTypeName = docType.replace(/[^a-zA-Z0-9_-]/g, "_");
    const jsonPath = path.join(documentsDir, `${safeTypeName}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(docs, null, 2), "utf-8");
    console.log(`  - documents/${safeTypeName}.json (${docs.length} docs)`);
  }

  // 5. Copy images and files to assets directory
  console.log("\n4. Copying downloaded images and media files...");
  let mediaFileCount = 0;

  const imagesSource = path.join(exportFolder, "images");
  if (fs.existsSync(imagesSource)) {
    const imageFiles = fs.readdirSync(imagesSource);
    for (const img of imageFiles) {
      fs.copyFileSync(path.join(imagesSource, img), path.join(assetsDir, img));
      mediaFileCount++;
    }
  }

  const filesSource = path.join(exportFolder, "files");
  if (fs.existsSync(filesSource)) {
    const files = fs.readdirSync(filesSource);
    for (const f of files) {
      fs.copyFileSync(path.join(filesSource, f), path.join(assetsDir, f));
      mediaFileCount++;
    }
  }

  console.log(`✔ ${mediaFileCount} media asset files copied to assets/ directory.`);

  // Clean up temp extraction folder
  fs.rmSync(tempExtractDir, { recursive: true, force: true });

  // 6. Generate Manifest
  console.log("\n5. Generating export MANIFEST.json...");
  const manifest = {
    exportTimestamp: new Date().toISOString(),
    projectId,
    dataset,
    totalDocuments: allDocuments.length,
    totalAssets: mediaFileCount,
    documentCountsByType: typeCounts,
    backupFiles: {
      tarball: `${dataset}-backup.tar.gz`,
      ndjson: "data.ndjson",
      documents: Object.keys(typeCounts).map((type) => `documents/${type.replace(/[^a-zA-Z0-9_-]/g, "_")}.json`),
      assetsDirectory: "assets/",
    },
  };

  const manifestPath = path.join(backupDir, "MANIFEST.json");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf-8");
  console.log(`✔ Manifest saved to ${manifestPath}`);

  console.log("\n=========================================");
  console.log("   SANITY DATA EXPORT COMPLETED!");
  console.log("=========================================");
}

exportSanity().catch((err) => {
  console.error("Export process failed:", err);
  process.exit(1);
});
