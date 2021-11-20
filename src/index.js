const http = require('http')
const {
  renderHtml,
  renderCSS,
  renderJS
} = require('../controllers/fileController')
const {
  createStudent,
  getStudents,
  deleteStudent,
  updateStudent
} = require('../controllers/studentController')

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    renderHtml(req, res, './index.html')
  } else if (req.url.indexOf('.css') != -1) {
    renderCSS(req, res, '.' + req.url)
  } else if (req.url.indexOf('.js') != -1) {
    renderJS(req, res, '.' + req.url)
  } else if (req.url == "/students" && req.method === "POST") {
    createStudent(req, res)
  } else if (req.url == "/students" && req.method === "GET") {
    getStudents(req, res)
  } else if (req.url.match(/\/students\/([0-9]+)/) && req.method === "DELETE") {
    const id = req.url.split('/')[2]
    deleteStudent(req, res, id)
  } else if (req.url.match(/\/students\/([0-9]+)/) && req.method === "PUT") {
    const id = req.url.split('/')[2]
    updateStudent(req, res, id)
  } else {
    res.writeHead(404, {
      'Content-Type': 'application/json'
    })
    res.end(JSON.stringify({
      message: 'route not found'
    }))
  }
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
