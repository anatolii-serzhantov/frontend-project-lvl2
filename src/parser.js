import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

export default (file) => {
  const data = fs.readFileSync(path.resolve(file), 'utf-8');
  const extension = path.extname(file).substring(1);
  
  if (extension === 'json') {
    return JSON.parse(data);
  }
  if (extension === ('yml' || 'yaml')) {
    return yaml.load(data);
  }
}