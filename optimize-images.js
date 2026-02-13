// optimize-images.js
// วิธีใช้: node optimize-images.js

import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const INPUT_DIR = path.join(__dirname, 'public/images/original');
const OUTPUT_DIR = path.join(__dirname, 'public/images/thumbnails');

// ตั้งค่าการ optimize
const CONFIG = {
  // สำหรับรูปในแกลเลอรี่
  gallery: {
    maxWidth: 1200,      // ความกว้างสูงสุด
    maxHeight: 1600,     // ความสูงสูงสุด
    quality: 85,         // คุณภาพ JPEG (0-100)
    format: 'jpeg'
  },
  // สำหรับรูปใน lightbox (ขนาดใหญ่)
  lightbox: {
    maxWidth: 2400,
    maxHeight: 3200,
    quality: 90,
    format: 'jpeg'
  },
  // สำหรับ thumbnail (โหลดเร็ว)
  thumbnail: {
    maxWidth: 400,
    maxHeight: 400,
    quality: 70,
    format: 'jpeg'
  }
};

async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
    console.log(`✅ สร้างโฟลเดอร์: ${dir}`);
  }
}

async function getImageInfo(filePath) {
  const metadata = await sharp(filePath).metadata();
  return {
    width: metadata.width,
    height: metadata.height,
    format: metadata.format,
    size: (await fs.stat(filePath)).size,
    orientation: metadata.width > metadata.height ? 'landscape' :
      metadata.width < metadata.height ? 'portrait' : 'square'
  };
}

async function optimizeImage(inputPath, outputPath, config) {
  const info = await getImageInfo(inputPath);

  let pipeline = sharp(inputPath);

  // ปรับขนาดแบบรักษา aspect ratio
  if (info.width > config.maxWidth || info.height > config.maxHeight) {
    pipeline = pipeline.resize(config.maxWidth, config.maxHeight, {
      fit: 'inside',
      withoutEnlargement: true
    });
  }

  // แปลงเป็น JPEG และ compress
  if (config.format === 'jpeg') {
    pipeline = pipeline.jpeg({
      quality: config.quality,
      mozjpeg: true // ใช้ mozjpeg สำหรับ compression ที่ดีกว่า
    });
  }

  await pipeline.toFile(outputPath);

  const outputInfo = await getImageInfo(outputPath);
  return { input: info, output: outputInfo };
}

async function processImages() {
  console.log('🚀 เริ่มต้น optimize รูปภาพ...\n');

  // สร้างโฟลเดอร์
  await ensureDir(OUTPUT_DIR);

  // อ่านไฟล์รูปทั้งหมด
  let files;
  try {
    files = await fs.readdir(INPUT_DIR);
  } catch (error) {
    console.error(`❌ ไม่พบโฟลเดอร์: ${INPUT_DIR}`);
    console.log(`💡 กรุณาสร้างโฟลเดอร์และใส่รูป Pre-Wedding ต้นฉบับที่นี่`);
    return;
  }

  const imageFiles = files.filter(file =>
    /\.(jpg|jpeg|png|webp)$/i.test(file)
  );

  if (imageFiles.length === 0) {
    console.log('❌ ไม่พบไฟล์รูปภาพในโฟลเดอร์');
    return;
  }

  console.log(`📸 พบรูปภาพ ${imageFiles.length} รูป\n`);

  let totalInputSize = 0;
  let totalOutputSize = 0;

  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    const inputPath = path.join(INPUT_DIR, file);

    const baseName = path.parse(file).name;
    const outputName = `${baseName}.jpg`;
    const outputPath = path.join(OUTPUT_DIR, outputName);

    console.log(`⚙️  กำลังประมวลผล: ${file}`);

    try {
      const result = await optimizeImage(inputPath, outputPath, CONFIG);

      console.log(`   ✅ output: ${outputName}`);
      console.log(
        `   📐 ขนาด: ${result.output.width}x${result.output.height}\n`
      );
    } catch (error) {
      console.error(`   ❌ เกิดข้อผิดพลาด: ${error.message}\n`);
    }
  }


  const totalSavedPercent = Math.round(
    ((totalInputSize - totalOutputSize) / totalInputSize) * 100
  );

  console.log('═══════════════════════════════════════');
  console.log('✨ เสร็จสิ้น!');
  console.log(`📊 ขนาดรวมเดิม: ${(totalInputSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📊 ขนาดรวมใหม่: ${(totalOutputSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`💾 ประหยัดรวม: ${totalSavedPercent}% (${((totalInputSize - totalOutputSize) / 1024 / 1024).toFixed(2)} MB)`);
  console.log('═══════════════════════════════════════\n');



}

// เรียกใช้งาน
processImages().catch(console.error);