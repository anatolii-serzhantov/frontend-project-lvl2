import _ from 'lodash';

const createDiffTree = (object1, object2) => {
  const keys = _.union(_.keys(object1), _.keys(object2));
  const sortedKeys = _.sortBy(keys);

  return sortedKeys.map((key) => {
    const valueFromObject1 = object1[key];
    const valueFromObject2 = object2[key];

    if (!_.has(object1, key)) {
        return {
            key,
            type: 'added',
            value: valueFromObject2
        }
    }
    if (!_.has(object2, key)) {
        return {
            key,
            type: 'removed',
            value: valueFromObject1
        }
    }
    if (valueFromObject1 === valueFromObject2) {
        return {
            key,
            type: 'unchanged',
            value: valueFromObject1
        }
    }
    if (_.isObject(valueFromObject1) && _.isObject(valueFromObject2)) {
        return {
            key,
            type: 'nested',
            value: createDiffTree(valueFromObject1, valueFromObject2)
        }
    }

    return {
        key,
        type: 'changed',
        oldValue: valueFromObject1,
        newValue: valueFromObject2
    }
  })
};

export default createDiffTree;