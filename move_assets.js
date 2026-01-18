const fs = require('fs');
const path = require('path');

const sourceFiles = [
    { src: 'C:/Users/ebine/.gemini/antigravity/brain/753da055-c1f4-49eb-92a7-9979f4b00133/uploaded_image_0_1768734771148.png', dest: 'hero-1.png' },
    { src: 'C:/Users/ebine/.gemini/antigravity/brain/753da055-c1f4-49eb-92a7-9979f4b00133/uploaded_image_1_1768734771148.png', dest: 'hero-2.png' },
    { src: 'C:/Users/ebine/.gemini/antigravity/brain/753da055-c1f4-49eb-92a7-9979f4b00133/uploaded_image_2_1768734771148.jpg', dest: 'hero-3.jpg' }
];

const destDir = path.join(__dirname, 'frontend', 'public', 'assets');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

sourceFiles.forEach(file => {
    try {
        fs.copyFileSync(file.src, path.join(destDir, file.dest));
        console.log(`Copied ${file.dest}`);
    } catch (err) {
        console.error(`Error copying ${file.dest}:`, err.message);
    }
});
