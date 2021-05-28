import _ from 'lodash'
import fs from 'fs'
import path from 'path'

const readFile = (pathName) => {
  const fullPath = path.resolve(process.cwd(), pathName)
  const data = fs.readFileSync(fullPath, 'utf-8').toString()
  return data
}

const genDiff = (data1, data2) => {
  const path1 = readFile(data1)
  const obj1 = JSON.parse(path1)
  const path2 = readFile(data2)
  const obj2 = JSON.parse(path2)
  const keys1 = _.keys(obj1)
  const keys2 = _.keys(obj2)
  const keys = _.union(keys1, keys2)

  const listOfDifferences = []
  for (const key of keys) {
    if (!_.has(obj1, key)) {
      listOfDifferences.push(`  + ${key}: ${obj2[key]}`)
    } else if (!_.has(obj2, key)) {
      listOfDifferences.push(`  - ${key}: ${obj1[key]}`)
    } else if (obj1[key] !== obj2[key]) {
      listOfDifferences.push(`  - ${key}: ${obj1[key]}`)
      listOfDifferences.push(`  + ${key}: ${obj2[key]}`)
    } else {
      listOfDifferences.push(`    ${key}: ${obj1[key]}`)
    }
  }

  listOfDifferences.sort(function (a, b) {
    if (a[4] < b[4]) {
      return -1
    }
    if (a[4] > b[4]) {
      return 1
    }
    return 0
  })

  const str = listOfDifferences.join('\r\n')
  return `{\r\n${str}\r\n}`
}

export default genDiff
