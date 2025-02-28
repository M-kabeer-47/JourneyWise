const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Configure paths
const inputFile = path.join(__dirname, 'cities500.txt');
const outputDir = path.join(__dirname, 'public', 'data');
const outputFile = path.join(outputDir, 'cities.json');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const cities = {};

const fileStream = fs.createReadStream(inputFile);

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

// Modify the line processing section
rl.on('line', (line) => {
    const columns = line.split('\t');
    if (columns.length >= 9) {
      const countryCode = columns[8];
      const cityName = columns[1];
      
      if (!cities[countryCode]) {
        cities[countryCode] = new Set(); // Use Set instead of Array
      }
      cities[countryCode].add(cityName); // Add will automatically handle duplicates
    }
  });
  
  // Modify the file writing section
  rl.on('close', () => {
    try {
      // Convert Sets to Arrays and sort
      const sortedCities = {};
      for (const [countryCode, citySet] of Object.entries(cities)) {
        sortedCities[countryCode] = Array.from(citySet).sort();
      }
  
      fs.writeFileSync(outputFile, JSON.stringify(sortedCities));
      console.log(`Processed ${Object.keys(sortedCities).length} countries with unique cities`);
    } catch (err) {
      console.error('Error writing file:', err);
    }
  });

rl.on('error', (err) => {
  console.error('Error reading file:', err);
});