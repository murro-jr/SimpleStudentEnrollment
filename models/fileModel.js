const { readFile } = require('../src/util')

function read(filename) {
	return new Promise(async (resolve, reject) => {
		const file = await readFile(filename)
		resolve(file)
	})
}

module.exports = {
	read
}