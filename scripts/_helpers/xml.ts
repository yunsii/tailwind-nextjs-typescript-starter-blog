import prettier from 'prettier'
import fse from 'fs-extra'

export async function writeXml(text: string, outputPath: string) {
  const options = await prettier.resolveConfig(outputPath)
  const formatted = await prettier.format(text.trim(), {
    ...options,
    parser: 'xml',
  })
  fse.writeFileSync(outputPath, formatted, {
    encoding: 'utf-8',
  })
}
