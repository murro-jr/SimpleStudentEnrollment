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

module.exports = {
  create,
  findAll
}
