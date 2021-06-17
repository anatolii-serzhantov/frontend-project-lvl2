import createDiffTree from './diffTree.js'
import parse from './parser.js';

const genDiff = (filepath1, filepath2) => {
  const obj1 = parse(filepath1)
  const obj2 = parse(filepath2)
  const diffTree = createDiffTree(obj1, obj2)
  return diffTree
}

export default genDiff
