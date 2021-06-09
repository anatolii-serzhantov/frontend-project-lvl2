import path from 'path';
import genDiff from '../src/index.js';
import { test, expect } from '@jest/globals';

const fileOneJson = path.resolve(process.cwd(), `./__tests__/__fixtures__/firstFile.json`);
const fileTwoJson = path.resolve(process.cwd(), `./__tests__/__fixtures__/secondFile.json`);

test('test difference between two json files', () => {
  const expectedDifference = `{\r\n  - follow: false\r\n    host: hexlet.io\r\n  - proxy: 123.234.53.22\r\n  - timeout: 50\r\n  + timeout: 20\r\n  + verbose: true\r\n}`;
expect(genDiff(fileOneJson, fileTwoJson)).toEqual(expectedDifference);
});