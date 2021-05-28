import path from 'path';
import genDiff from '../src/index.js';
import { test, expect } from '@jest/globals';

const fileOneJson = path.resolve(process.cwd(), `./__tests__/__fixtures__/firstFile.json`);
const fileTwoJson = path.resolve(process.cwd(), `./__tests__/__fixtures__/secondFile.json`);

test('test difference between two json files', () => {
  const expectedDifference = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
expect(genDiff(fileOneJson, fileTwoJson)).toEqual(expectedDifference);
});