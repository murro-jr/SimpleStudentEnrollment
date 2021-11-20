const Student = require('../models/studentModel')
const {
  getPostData
} = require('../src/util')

// @desc	Register a new student
// @route	POST /students
async function createStudent(req, res) {
  try {
    const body = await getPostData(req)
    const {
      name,
      id,
      level
    } = JSON.parse(body)

    const student = {
      name,
      id,
      level
    }

    const newStudent = await Student.create(student)

    res.writeHead(201, {
      'Content-Type': 'application/json'
    })
    return res.end(JSON.stringify(newStudent))
  } catch (error) {
    console.log(error)
  }
}

// @desc	Get all students info
// @route	GET /students
async function getStudents(req, res) {
  try {
    const students = await Student.findAll(req)

    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    res.end(JSON.stringify(students))
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createStudent,
  getStudents
}
