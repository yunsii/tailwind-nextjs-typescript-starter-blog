import fse from 'fs-extra'

export async function writeXml(text: string, outputPath: string) {
  fse.writeFileSync(outputPath, text.replace(/ +/g, ''), {
    encoding: 'utf-8',
  })
}
