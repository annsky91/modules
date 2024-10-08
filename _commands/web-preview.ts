#!/usr/bin/env -S npx tsx
import args from 'args'

import __loadSkyConfig, { __getAppConfig } from './__loadSkyConfig'
import __run from './__run'
import __sdkPath from './__sdkPath'

args.option('port', 'The port on which the app will be running', 3000)
args.option('open', 'Open in browser', false)

const flags = args.parse(process.argv, {
    name: 'sky web start',
    mainColor: 'magenta',
    subColor: 'grey',
    mri: {},
})

export namespace web {
    preview()

    export async function preview(): Promise<void> {
        const name = process.argv[4]

        if (name == null || name === '') {
            // eslint-disable-next-line no-console
            console.error('missing app name')
            // eslint-disable-next-line
            return
        }

        const skyConfig = await __loadSkyConfig()

        if (!skyConfig) {
            return
        }

        const skyAppConfig = __getAppConfig(name, skyConfig)

        if (!skyAppConfig) {
            return
        }

        const env = {
            ...process.env,
            NAME: name,
            NODE_ENV: 'production',
            COMMAND: 'preview',
            PORT: JSON.stringify(flags.port),
            OPEN: JSON.stringify(flags.open),
        }

        __run(`npx tsx --no-warnings ${__sdkPath}/_commands/_web.ts`, {
            env,
        })
    }
}