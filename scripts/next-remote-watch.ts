#!/usr/bin/env node

// Adapted from https://github.com/hashicorp/next-remote-watch
// A copy of next-remote-watch with an additional ws reload emitter.
// The app listens to the event and triggers a client-side router refresh
// see components/ClientReload.js

import { spawn } from 'child_process'
import http from 'http'
import path from 'path'
import { parse } from 'url'

import chalk from 'chalk'
import * as chokidar from 'chokidar'
import { program } from 'commander'
import express, { json, Router } from 'express'
import next from 'next'
import { Server } from 'socket.io'

import pkg from '../package.json'

const defaultWatchEvent = 'change'

program.storeOptionsAsProperties().version(pkg.version)
program
  .option('-r, --root [dir]', 'root directory of your nextjs app')
  .option(
    '-s, --script [path]',
    'path to the script you want to trigger on a watcher event',
    false,
  )
  .option('-c, --command [cmd]', 'command to execute on a watcher event', false)
  .option(
    '-e, --event [name]',
    `name of event to watch, defaults to ${defaultWatchEvent}`,
    defaultWatchEvent,
  )
  .option(
    '-p, --polling [name]',
    `use polling for the watcher, defaults to false`,
    false,
  )
  .parse(process.argv)

const options = program.opts<{
  root?: string
  script?: string
  command?: string
  event?: string
  polling?: string
}>()

const shell = process.env.SHELL
const app = next({ dev: true, dir: options.root || process.cwd() })
const port = parseInt(process.env.PORT, 10) || 3000
const handle = app.getRequestHandler()

app.prepare().then(() => {
  // if directories are provided, watch them for changes and trigger reload
  if (program.args.length > 0) {
    chokidar
      .watch(program.args, { usePolling: Boolean(options.polling) })
      .on(
        options.event,
        async (filePathContext, eventContext = defaultWatchEvent) => {
          // Emit changes via socketio
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          io.sockets.emit('reload', filePathContext)
          // @ts-ignore
          app.server.hotReloader.send('building')

          if (options.command) {
            // Use spawn here so that we can pipe stdio from the command without buffering
            spawn(
              shell,
              [
                '-c',
                options.command
                  .replace(/\{event\}/gi, filePathContext)
                  .replace(/\{path\}/gi, eventContext),
              ],
              {
                stdio: 'inherit',
              },
            )
          }

          if (options.script) {
            try {
              // find the path of your --script script
              const scriptPath = path.join(
                process.cwd(),
                options.script.toString(),
              )

              // require your --script script
              const executeFile = require(scriptPath)

              // run the exported function from your --script script
              executeFile(filePathContext, eventContext)
            } catch (e) {
              console.error('Remote script failed')
              console.error(e)
              return e
            }
          }

          // @ts-ignore
          app.server.hotReloader.send('reloadPage')
        },
      )
  }

  // create an express server
  const expressApp = express()
  const server = http.createServer(expressApp)

  // watch files with socketIO
  const io = new Server(server)

  // special handling for mdx reload route
  const reloadRoute = Router()
  reloadRoute.use(json())
  reloadRoute.all('/', (req, res) => {
    // log message if present
    const msg = req.body.message
    const color = req.body.color
    if (msg) {
      console.log(color ? chalk[color](msg) : msg)
    }

    // reload the nextjs app
    // @ts-ignore
    app.server.hotReloader.send('building')
    // @ts-ignore
    app.server.hotReloader.send('reloadPage')
    res.end('Reload initiated')
  })

  expressApp.use('/__next_reload', reloadRoute)

  // handle all other routes with next.js
  expressApp.all('*', (req, res) => handle(req, res, parse(req.url, true)))

  server.addListener('error', (err) => {
    if (err) throw err
  })
  // fire it up
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
