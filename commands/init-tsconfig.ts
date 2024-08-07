#!/usr/bin/env -S npx tsx
import fs from 'fs'
import path from 'path'

import { b, e, purple } from './__coloredConsole'
import __loadSkyConfig from './__loadSkyConfig'
import __sdkPath from './__sdkPath'

export namespace init {
    tsconfig()

    export async function tsconfig(): Promise<void> {
        const skyConfig = await __loadSkyConfig()

        if (!skyConfig) {
            return
        }

        const publicPaths = [
            ...new Map(
                Object.keys(skyConfig.apps)
                    .filter(name => skyConfig.apps[name].public)
                    .map(name => [skyConfig.apps[name].public, skyConfig.apps[name].public])
            ).values(),
        ]

        const allModulePaths = [
            {
                name: 'libs',
                path: path.join(__sdkPath, 'libs'),
            },
            {
                name: 'sky',
                path: __sdkPath,
            },
            ...Object.keys(skyConfig.apps).map(name => ({
                name,
                path: skyConfig.apps[name].path,
            })),
            ...Object.keys(skyConfig.modules).map(name => ({
                name,
                path: skyConfig.modules[name].path,
            })),
            ...publicPaths.map(publicPath => ({
                name: 'public',
                path: publicPath,
            })),
        ]
        const modulePaths = [
            ...Object.keys(skyConfig.modules)
                .filter(name => skyConfig.modules[name].path !== '.')
                .map(name => skyConfig.modules[name].path),
        ]

        const paths = []
        paths.push(path.join(__sdkPath, 'node_modules/*'))

        const include = [
            'sky.config.ts',
            'deploy.ts',
            __sdkPath === '' ? './' : __sdkPath,
            ...Object.keys(skyConfig.apps).map(name => skyConfig.apps[name].path),
            ...Object.keys(skyConfig.modules).map(name => skyConfig.modules[name].path),
            ...publicPaths,
        ]

        const exclude = [
            'node_modules',
            ...modulePaths.map(modulePath => `${modulePath}/node_modules`),
        ]

        const sdkNodeModulesPath = path.join(__sdkPath, 'node_modules')
        if (sdkNodeModulesPath !== 'node_modules') {
            exclude.push(sdkNodeModulesPath)
        }

        const tsConfig = {
            compilerOptions: {
                lib: ['ES2021', 'DOM'],
                jsx: 'react-jsx',
                module: 'ES2022',
                target: 'ES2017',
                moduleResolution: 'node',
                esModuleInterop: true,
                resolveJsonModule: true,
                experimentalDecorators: true,
                typeRoots: [path.join(__sdkPath, 'node_modules/@types')],
                baseUrl: '.',
                paths: {
                    '*': paths,
                    '@/*': Object.keys(skyConfig.apps).map(
                        name => skyConfig.apps[name].path + '/*'
                    ),
                    ...allModulePaths.reduce((prevValue, { name, path }) => {
                        prevValue[`${name}/*`] = path === '.' ? ['*'] : [`${path}/*`]
                        return prevValue
                    }, {}),
                },
            },
        }

        tsConfig['include'] = include
        tsConfig['exclude'] = exclude

        process.stdout.write(`${b}${purple}Rewrite configs${e}`)
        fs.writeFileSync(path.resolve('tsconfig.json'), JSON.stringify(tsConfig, null, '    '))
        process.stdout.write(` 👌\n`)
    }
}
