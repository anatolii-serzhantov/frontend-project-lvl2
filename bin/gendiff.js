#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import _ from 'lodash';
const program = new Command();

program
.version('0.0.1', '-V, --version', 'output the version number')
.description('Compares two configuration files and shows a difference.')
.arguments('<filepath1> <filepath2>')
.option('-f, --format [type]', 'output format')
program.parse(process.argv);

const obj1 = {
    "host": "hexlet.io",
    "timeout": 50,
    "proxy": "123.234.53.22",
    "follow": false
}

const obj2 = {
    "timeout": 20,
    "verbose": true,
    "host": "hexlet.io"
}

const genDiff = (data1, data2) => {
    const keys1 = _.keys(data1);
    const keys2 = _.keys(data2);
    const keys = _.union(keys1, keys2);
   
    let result = [];
    for (const key of keys) {
      if (!_.has(data1, key)) {
        result.push(`  + ${key}: ${data2[key]}`);
      } else if (!_.has(data2, key)) {
        result.push(`  - ${key}: ${data1[key]}`);
      } else if (data1[key] !== data2[key]) {
        result.push(`  - ${key}: ${data1[key]}`);
        result.push(`  + ${key}: ${data2[key]}`);
      } else {
        result.push(`    ${key}: ${data1[key]}`);
      }
    }

    result.sort(function(a, b){
        if (a[4] < b[4]) {
          return -1;
        }
        if (a[4] > b[4]) {
          return 1;
        }
        return 0;
    })

    const test = result.join("\r\n");
    console.log(`{\r\n${test}\r\n}`)
    return result;
}

genDiff(obj1, obj2);

export default genDiff;