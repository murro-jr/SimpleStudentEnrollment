const File = require('../models/fileModel')

async function renderResource(req, res, filename, type) {
  try {
    const file = await File.read(filename)

    res.writeHead(200, {
      'Content-Type': type
    })
    res.end(file)
  } catch (error) {
    console.log(error)
  }
}

async function renderHtml(req, res, filename) {
  return await renderResource(req, res, filename, 'text/html')
}

async function renderCSS(req, res, filename) {
  return await renderResource(req, res, filename, 'text/css')
}

async function renderJS(req, res, filename) {
  return await renderResource(req, res, filename, 'text/javascript')
}

module.exports = {
  renderHtml,
  renderCSS,
  renderJS
}
