import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

export default (file) => {
  const data = fs.readFileSync(path.resolve(file), 'utf-8');
  const format = path.extname(file).substring(1);
  
  if (format === 'json') {
    return JSON.parse(data);
  }
  if (format === ('yml' || 'yaml')) {
    return yaml.load(data);
  }
}