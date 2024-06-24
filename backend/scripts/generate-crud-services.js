const path = require('path');
const fs = require('fs');
const colors = require('colors');

const templates = {
  controller: require('./crud-templates/controller'),
  service: require('./crud-templates/service'),
  module: require('./crud-templates/module'),
}

const toProcess = [];
const { crudModules } = require(path.join(process.cwd(), 'dist/sections-config/index.js'));

for (const config of crudModules) {
  toProcess.push({
    config,
    controller: templates.controller(config),
    service: templates.service(config),
  })
}

console.log('----------------')
console.log(colors.blue.underline('[Crud gen]: start'))

const targetPath = path.join(process.cwd(), 'src/api/v1/crud');

console.log(colors.blue.underline('[Crud gen]: cleanup directories'))

fs.rmdirSync(path.join(targetPath, 'controllers'), { recursive: true, force: true });
fs.rmdirSync(path.join(targetPath, 'services'), { recursive: true, force: true });
fs.mkdirSync(path.join(targetPath, 'controllers'));
fs.mkdirSync(path.join(targetPath, 'services'));

for (const item of toProcess) {
  fs.writeFileSync(path.join(targetPath, 'controllers', `${item.config.path}.controller.ts`), item.controller, { encoding: 'utf8' });
  fs.writeFileSync(path.join(targetPath, 'services', `${item.config.path}.service.ts`), item.service, { encoding: 'utf8' });
}

fs.unlinkSync(path.join(targetPath, `crud.module.ts`));
fs.writeFileSync(path.join(targetPath, `crud.module.ts`), templates.module(toProcess.map(item => item.config)), { encoding: 'utf8' });

console.log(colors.green.underline('[Crud gen]: successfully'));

console.log('----------------')
console.log('')
