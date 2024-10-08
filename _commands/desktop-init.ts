#!/usr/bin/env -S npx tsx
import fs from 'fs'
import path from 'path'

import { b, e, purple } from './__coloredConsole'
import __loadSkyConfig, { __getAppConfig } from './__loadSkyConfig'
import __sdkPath from './__sdkPath'

export namespace desktop {
    init()

    export async function init(): Promise<void> {
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

        if (!fs.existsSync(path.resolve(skyAppConfig.path, 'src-tauri'))) {
            fs.cpSync(
                path.resolve(__sdkPath, '_commands/assets/desktop-initial'),
                path.resolve(skyAppConfig.path, 'src-tauri'),
                {
                    recursive: true,
                }
            )
        }

        process.stdout.write(`${b}${purple}Init${e} 👌\n`)
    }
}
