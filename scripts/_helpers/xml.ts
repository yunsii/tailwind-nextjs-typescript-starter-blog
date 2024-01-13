import fse from 'fs-extra'

export async function writeXml(text: string, outputPath: string) {
  fse.writeFileSync(outputPath, text.replace(/ {1,}/g, ''), {
    encoding: 'utf-8',
  })
}
