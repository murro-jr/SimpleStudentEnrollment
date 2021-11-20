const fs = require('fs')

function readFile(html) {
	return new Promise((resolve, reject) => {	
		fs.readFile(html, (err, data) => {
			if (err) {
				reject(err)
			} else {
				resolve(data)
			}
		})
	})
}

function writeDataToFile(file, data) {
	fs.writeFileSync(
		file,
		JSON.stringify(data),
		{
			encoding: 'utf8',
			flag: 'w+'
		}, (err) => {
			if(err) {
				console.log(err)
			}

			console.log('File was saved successfully.')
		}
	)
}

function getPostData(req) {
	return new Promise((resolve, reject) => {
		try {
			let body = ''
			req.on('data', (chunk) => {
				body += chunk.toString()
			})

			req.on('end', () => {
				resolve(body)
			})
		} catch (error) {
			reject(error)
		}
	})
}

module.exports = {
	readFile,
	getPostData,
	writeDataToFile
}