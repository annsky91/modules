#!/usr/bin/env -S npx tsx
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import args from 'args'

import __loadSkyConfig, { __getAppConfig } from './__loadSkyConfig'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

args.parse(process.argv, {
    name: 'sky web start',
    mainColor: 'magenta',
    subColor: 'grey',
    mri: {},
})

export namespace web {
    init()

    export function init(): void {
        const name = process.argv[4]

        if (name == null || name === '') {
            // eslint-disable-next-line no-console
            console.error('missing app name')
            // eslint-disable-next-line
            return
        }

        const skyConfig = __loadSkyConfig()

        if (!skyConfig) {
            return
        }

        const skyAppConfig = __getAppConfig(name, skyConfig)

        if (!skyAppConfig) {
            return
        }

        fs.cpSync(path.resolve(__dirname, 'web-initial'), skyAppConfig.path, { recursive: true })
    }
}