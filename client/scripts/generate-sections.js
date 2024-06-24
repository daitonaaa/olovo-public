const fs = require('fs')
const path = require('path')
const colors = require('colors')

colors.enable()

console.log('[Client] sections generate started'.underline.blue)
console.log('')

const TEMPLATES_DIR = 'templates'
const SECTIONS_DIR = 'sections'

const templates = fs.readdirSync(path.join(process.cwd(), TEMPLATES_DIR))

for (const templateName of templates) {
  const templateSectionsPath = path.join(process.cwd(), TEMPLATES_DIR, templateName, SECTIONS_DIR)
  templateSectionsGen(templateSectionsPath, templateName)
}

function templateSectionsGen(pathToSections, templateName) {
  try {
    const targetFile = path.join(pathToSections, 'index.ts')
    const templateSections = fs.readdirSync(pathToSections).filter((item) => item !== 'index.ts')

    if (!templateSections.length) {
      return
    }

    console.log(`Read template "${templateName}"`.blue)
    console.log(`Found ` + `${templateSections.length}`.underline + ` sections`)
    console.log('')
    console.log(templateSections)

    const file = `
      /* eslint-disable */
      /* codegen: see scripts/generate-sections */
      import dynamic from 'next/dynamic';
      
      ${templateSections
        .map((name) => `const ${name} = dynamic(() => import('./${name}'), { ssr: true });`)
        .join('\n')}
      
      export default {
        ${templateSections.map((name) => `${name},`).join('\n')}
      }
    `

    fs.writeFileSync(targetFile, file, { encoding: 'utf8' })
  } catch (err) {
    console.log(`Error sections generate for template: ${templateName}`.red)
  }
}

console.log('')
console.log('[Client] sections generate successfully'.green)
