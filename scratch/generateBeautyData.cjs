const fs = require('fs');
const path = require('path');

const baseDir = 'c:/Users/User/Desktop/demo/demo/public/images/instruments/beauty/beauty';
const categories = fs.readdirSync(baseDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const seriesMap = {
    'cuticle nipper': { prefix: 'BC', series: '2' },
    'Nail nippers': { prefix: 'BN', series: '3' },
    'Pedicure Implements': { prefix: 'BP', series: '31' },
    'manicure-scissors': { prefix: 'BS', series: '1' },
    'eyelash-tweezers': { prefix: 'BT', series: '4' },
    'eyebrow-tweezers': { prefix: 'BT', series: '4' },
    'esthetic-tools-and-pushers': { prefix: 'BE', series: '5' },
    'manicure-kits': { prefix: 'BK', series: '7' }
};

const productData = categories.map(cat => {
    const catDir = path.join(baseDir, cat);
    const files = fs.readdirSync(catDir)
        .filter(file => file.endsWith('.jpg') || file.endsWith('.png'));
    
    const titleMap = {
        'cuticle nipper': 'Cuticle Nippers',
        'Nail nippers': 'Nail Nippers',
        'Pedicure Implements': 'Pedicure Implements',
        'manicure-scissors': 'Manicure Scissors',
        'eyelash-tweezers': 'Eyelash Tweezers',
        'eyebrow-tweezers': 'Eyebrow Tweezers',
        'esthetic-tools-and-pushers': 'Esthetic Tools And Pushers',
        'manicure-kits': 'Manicure Kits'
    };
    
    let title = titleMap[cat] || cat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    const mapping = seriesMap[cat] || { prefix: 'BE', series: '' };
    
    return {
        title: title,
        folder: cat,
        items: files.map(file => {
            const match = file.match(/-(\d+)-/);
            const originalNum = match ? match[1] : file.split('.')[0];
            
            // Format code to match the series (e.g., BC-2366 if original was 1366)
            // Or just keep the original number but use the correct prefix
            const code = `${mapping.prefix}-${mapping.series}${originalNum.slice(-3)}`;
            
            return {
                name: `${title} #${code}`,
                code: code,
                image: `/images/instruments/beauty/beauty/${cat}/${file}`
            };
        })
    };
});

const output = `export const beautyProductsData = ${JSON.stringify(productData, null, 2)};`;
fs.writeFileSync('c:/Users/User/Desktop/demo/demo/src/data/beautyProducts.js', output);
console.log('Data updated with series numbers successfully!');
