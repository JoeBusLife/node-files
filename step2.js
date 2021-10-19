const fs = require('fs');
const process = require('process');
const axios = require('axios');
const argv = process.argv;

function cat(path){
	fs.readFile(path, 'utf8', (err, data) => {
		if (err){
			console.log(`Error reading ${path}: ${err}`);
			console.log(err);
			process.exit(21)
		}
		console.log(data);
	});
}

async function webCat(url){
	try {
		let res = await axios.get(url);
		console.log(res.data);
	} catch (err) {
		console.log(`Error fetching ${url}: ${err}`);
    process.exit(22);
	}
}

if (argv[2].includes('http')) webCat(argv[2]);
else cat(argv[2]);