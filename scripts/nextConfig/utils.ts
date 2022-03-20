import chalk from 'chalk'
import * as chokidar from 'chokidar'
import * as esbuild from 'esbuild'

export const nextConfigTsPath = `${process.cwd()}/next.config.ts`
export const outputPath = `${process.cwd()}/next.config.mjs`

export function buildNextConfig() {
  try {
    esbuild.buildSync({
      entryPoints: [nextConfigTsPath],
      outfile: outputPath,
      format: 'esm',
      platform: 'node',
      target: 'es2020',
    })
    console.log('[next.config.mjs] build successfully.')
  } catch (err) {
    console.log('[next.config.mjs] build failed.', err)
  }
}

export function watchNextConfig() {
  chokidar.watch(nextConfigTsPath).on('change', (event, path) => {
    buildNextConfig()
    console.log(chalk.green('[watchNextConfig] re-build next.config.ts done.'))
  })
}
