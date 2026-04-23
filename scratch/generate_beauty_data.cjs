const fs = require('fs');
const path = require('path');

const baseDir = 'c:/Users/User/Desktop/demo/demo/public/images/instruments/beauty/new-beauty';
const targetFile = 'c:/Users/User/Desktop/demo/demo/src/data/beautyProducts.js';
const categories = [
  "Choice of Packings",
  "Choice of Finishes",
  "Nail & Cuticle scissors",
  "Cuticle nippers",
  "Nail nippers",
  "Corner cutters",
  "Pedicure nail cutters",
  "German forging",
  "Tweezers",
  "Instruments for professional application",
  "Choice of finishes in Barber & Thinning Scissors",
  "Professional Barber & Thinning scissors",
  "Barber & Thinning scissors kits",
  "Professional Barber scissors",
  "Professional Thinning scissors",
  "Thinning scissors (CNC)",
  "Pet Grooming scissors",
  "Manicure Kits",
  "Manicure Display"
];

const folderMap = {
  "Choice of Packings": "choice of packaging",
  "Choice of Finishes": "choice of finishes",
  "Nail & Cuticle scissors": "Nail and cuticle scissors",
  "Cuticle nippers": "Cuticle Nippers",
  "Nail nippers": "Nail Nippers",
  "Corner cutters": "Nail clippers",
  "Pedicure nail cutters": "Pedicure Nail cutters",
  "German forging": "German Forging(limited series)",
  "Tweezers": "Tweezers",
  "Instruments for professional application": "InstrumentS for professional applications",
  "Professional Barber scissors": "Scissors" 
};

// Mapping extracted by browser agent
const extractedData = {
  "Screenshot 2026-04-23 130221.png": { "id": "2001 - 100", "name": "Cuticle nipper box joint double spring plain handle size 10cm" },
  "Screenshot 2026-04-23 130230.png": { "id": "2005 - 100", "name": "Cuticle nipper box joint double spring fluted handle size 10cm" },
  "Screenshot 2026-04-23 130238.png": { "id": "2006 - 100", "name": "Cuticle nipper box joint double spring checkered handle size 10cm" },
  "Screenshot 2026-04-23 130248.png": { "id": "2011 - 100", "name": "Cuticle nipper box joint wire spring plain handle size 10cm" },
  "Screenshot 2026-04-23 130541.png": { "id": "3001 - 100", "name": "Nail nipper lap joint wire spring checkered handle size 10cm" },
  "Screenshot 2026-04-23 130548.png": { "id": "3002 - 100", "name": "Nail nipper lap joint wire spring plain handle size 10cm" },
  "Screenshot 2026-04-23 130557.png": { "id": "3003 - 100", "name": "Nail nipper lap joint wire spring fluted handle size 10cm" },
  "Screenshot 2026-04-23 130606.png": { "id": "3010 - 120", "name": "Nail nipper lap joint wire spring checkered handle size 12cm" },
  "Screenshot 2026-04-23 130834.png": { "id": "3120 - 140", "name": "Head cutter box joint double spring checkered handle with lock size 14cm" },
  "Screenshot 2026-04-23 130843.png": { "id": "3122 - 140", "name": "Head cutter box joint box joint convex jaws double spring plain handle with lock size 14cm" },
  "Screenshot 2026-04-23 130852.png": { "id": "3126 - 140", "name": "Head cutter box joint half jaws double spring plain handle with lock size 14cm" },
  "Screenshot 2026-04-23 130932.png": { "id": "3320 - 120", "name": "Corner cutter box joint fine jaws single spring size 12cm" },
  "Screenshot 2026-04-23 130941.png": { "id": "3321 - 130", "name": "Corner cutter box joint fine jaws single spring size 13cm" },
  "Screenshot 2026-04-23 130954.png": { "id": "3325 - 140", "name": "Head cutter box joint double spring with lock size 14cm" },
  "Screenshot 2026-04-23 131003.png": { "id": "3329 - 120", "name": "Buffer spring nail cutter lap joint fluted handle with lock size 12cm" },
  "Screenshot 2026-04-23 131101.png": { "id": "4219 - 080", "name": "Tweezers straight point grooved handle size 8cm" },
  "Screenshot 2026-04-23 131111.png": { "id": "4225 - 090", "name": "Tweezers slanted point fluted handle size 9cm" },
  "Screenshot 2026-04-23 131119.png": { "id": "4230 - 095", "name": "Tweezers slanted point size 9.5cm" },
  "Screenshot 2026-04-23 131127.png": { "id": "4251 - 095", "name": "Tweezers slanted point size 9.5cm" },
  "Screenshot 2026-04-23 131301.png": { "id": "5001 - 130", "name": "Cuticle knife stainless steel handle size 13cm" },
  "Screenshot 2026-04-23 131311.png": { "id": "5002 - 130", "name": "Cuticle cleaner stainless steel handle size 13cm" },
  "Screenshot 2026-04-23 131319.png": { "id": "5003 - 120", "name": "Cuticle knife stainless steel handle size 12cm" }
};

const result = categories.map(cat => {
  const folderName = folderMap[cat];
  const items = [];
  
  if (folderName) {
    const folderPath = path.join(baseDir, folderName);
    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.png') || f.endsWith('.jpg'));
      files.forEach((file, index) => {
        const extracted = extractedData[file];
        if (extracted) {
          items.push({
            name: extracted.name,
            code: extracted.id,
            image: `/images/instruments/beauty/new-beauty/${folderName}/${file}`
          });
        } else {
          items.push({
            name: `${cat} #${index + 1}`,
            code: `BN-${index + 1001}`, // Generic fallback as per "keep it as it is"
            image: `/images/instruments/beauty/new-beauty/${folderName}/${file}`
          });
        }
      });
    }
  }
  
  return {
    title: cat,
    items: items
  };
});

const content = 'export const beautyProductsData = ' + JSON.stringify(result, null, 2) + ';\n';
fs.writeFileSync(targetFile, content, 'utf8');
console.log('File written successfully with extracted IDs');
