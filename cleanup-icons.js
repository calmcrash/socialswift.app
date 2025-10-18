const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, 'public', 'icons');

// Get all files in the icons directory
const files = fs.readdirSync(iconsDir);

files.forEach(file => {
  const fullPath = path.join(iconsDir, file);
  const stat = fs.statSync(fullPath);

  // Only process files, not directories
  if (!stat.isDirectory()) {
    // Get filename without extension
    const name = path.parse(file).name;
    // Get the extension
    const ext = path.extname(file);

    // If file has an extension and it's not already just a name
    if (ext && file !== name) {
      const newPath = path.join(iconsDir, name);
      
      // Check if target already exists
      if (!fs.existsSync(newPath)) {
        fs.renameSync(fullPath, newPath);
        console.log(`✓ Renamed: ${file} → ${name}`);
      } else {
        console.log(`⚠ Skipped: ${file} (${name} already exists)`);
        fs.unlinkSync(fullPath); // Delete the duplicate
        console.log(`  Deleted duplicate: ${file}`);
      }
    }
  }
});

console.log('\n✅ Icon cleanup complete!');
