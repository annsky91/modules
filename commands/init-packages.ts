#!/usr/bin/env -S npx tsx
import fs from 'fs'
import path from 'path'

import { b, e, purple } from './__coloredConsole'
import __run from './__run'
import __sdkPath from './__sdkPath'

const command = `npm i -D \
eslint eslint-config-prettier \
eslint-plugin-prettier \
eslint-plugin-react \
eslint-plugin-react-hooks \
eslint-plugin-import \
@typescript-eslint/eslint-plugin \
@typescript-eslint/parser \
prettier \
vike \
react@18.2.0 \
react-dom@18.2.0 \
tsx\
`

export namespace init {
    packages()

    export function packages(): void {
        process.stdout.write(`${b}${purple}Install packages${e}\n`)
        __run(command)
        process.stdout.write(`\n${b}${purple}Install packages${e} 👌\n`)
        process.stdout.write(`${b}${purple}Copy files${e}`)
        fs.copyFileSync(path.join(__sdkPath, 'commands/configs/jest.config.cjs'), 'jest.config.cjs')
        fs.copyFileSync(
            path.join(__sdkPath, 'commands/configs/tailwind.config.js'),
            'tailwind.config.js'
        )
        fs.copyFileSync(path.join(__sdkPath, 'commands/configs/.editorconfig'), '.editorconfig')
        fs.copyFileSync(path.join(__sdkPath, 'commands/configs/.eslintrc.cjs'), '.eslintrc.cjs')
        fs.copyFileSync(path.join(__sdkPath, 'commands/configs/.prettierrc.cjs'), '.prettierrc.cjs')
        fs.copyFileSync(path.join(__sdkPath, 'commands/configs/deploy.ts'), 'deploy.ts')
        process.stdout.write(` 👌\n`)
    }
}
