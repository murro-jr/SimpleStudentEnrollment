const {
  writeDataToFile
} = require('../src/util')
let students = []

try {
  students = require('../data/students')
} catch (e) {
  console.error(`Error loading students data: ${e.code}`)
}

function create(student) {
  return new Promise((resolve, reject) => {
    const newStudent = {
      ...student
    }
    students.push(newStudent)
    writeDataToFile('./data/students.json', students)
    resolve(newStudent)
  })
}

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(students)
  })
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const product = students.find((student) => student.id === id)
    resolve(product)
  })
}

function deleteInfo(id) {
  return new Promise((resolve, reject) => {
    const index = students.findIndex((student) => student.id === id)
    if (index >= 0) {
      students.splice(index, 1)
    }

    writeDataToFile('./data/students.json', students)
    resolve(students)
  })
}

function update(id, studentInfo) {
  return new Promise((resolve, reject) => {
    const index = students.findIndex((student) => student.id === id)
    students[index] = {
      id,
      ...studentInfo
    }
    writeDataToFile('./data/students.json', students)
    resolve(students[index])
  })
}

module.exports = {
  create,
  findAll,
  findById,
  deleteInfo,
  update
}
