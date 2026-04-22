const fs = require('fs');
const path = require('path');

const categories = [
  "Extracting Forceps",
  "Extracting Forceps English Pattern",
  "Elevators",
  "Endodontic Condensers, Obturation Instruments, Excavators, Probes"
];

const baseDir = 'c:/Users/User/Desktop/demo/demo/public/images/instruments/dental';

categories.forEach(name => {
    const elementId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const filePath = path.join(baseDir, `${elementId}.png`);
    console.log(`Checking ${name}: ${elementId}.png -> ${fs.existsSync(filePath) ? 'EXISTS' : 'MISSING'}`);
});
