const fs = require('fs');
const process = require('process');
const axios = require('axios');
const argv = process.argv;

function cat(path){
	fs.readFile(path, 'utf8', (err, data) => {
		if (err){
			console.log(`Error reading ${path}: ${err}`);
			process.exit(21)
		}
		output(data);
	});
}

async function webCat(url){
	try {
		let res = await axios.get(url);
		output(res.data);
	} catch (err) {
		console.log(`Error fetching ${url}: ${err}`);
    process.exit(22);
	}
}

function output(data){
	if (outputFile){
		fs.writeFile(outputFile, data, 'utf8', (err) => {
			if (err){
				console.error(`Couldn't write ${outputFile}: ${err}`);
				process.exit(21)
			}
		});
	} else console.log(data);
}

let readFrom = null;
let outputFile = null;

if (argv[2] === '--out'){
	outputFile = argv[3];
	readFrom = argv[4];
} else readFrom = argv[2];

if (readFrom.includes('http')) webCat(readFrom);
else cat(readFrom);