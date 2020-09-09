const fs = require('fs');
const path = require('path');
const e404 = path.resolve(__dirname, 'src/404.html');
const targetFilePath = path.resolve(__dirname, 'dist/404.html');
fs.createReadStream(e404).pipe(fs.createWriteStream(targetFilePath));

const cname = "kamelets.nicolaferraro.me";
const targetCNAME = path.resolve(__dirname, 'dist/CNAME');
const streamCNAME = fs.createWriteStream(targetCNAME);
streamCNAME.write(cname);
streamCNAME.end();
