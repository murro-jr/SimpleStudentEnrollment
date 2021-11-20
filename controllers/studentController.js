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

// @desc  Delete a specific student info
// @route DELETE /students
async function deleteStudent(req, res, id) {
  try {
    const students = await Student.deleteInfo(id)

    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    res.end(JSON.stringify(students))
  } catch (error) {
    console.log(error)
  }
}

// @desc  Delete a specific student info
// @route DELETE /students
async function updateStudent(req, res, id) {
  try {
    const student = await Student.findById(id)

    if (student) {
      const body = await getPostData(req)
      const {
        name,
        level
      } = JSON.parse(body)

      const studentInfo = {
        name: name || student.name,
        level: level || student.level
      }

      const updatedInfo = Student.update(id, studentInfo)

      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(updatedInfo))
    } else {
      res.writeHead(404, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify({
        message: 'Student not found'
      }))
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createStudent,
  getStudents,
  deleteStudent,
  updateStudent
}
