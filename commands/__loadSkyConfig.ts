import fs from 'fs'
import path from 'path'

import vite from 'vite'

export interface SkyApp {
    target: string
    path: string
    scripts?: boolean
    public?: string
    html?: string
    proxy?: vite.InlineConfig['server']['proxy']
}

export interface SkyModule {
    path: string
}

export interface SkyConfig {
    apps: SkyApp[]
    modules: SkyModule[]
    scripts: Record<string, string> | boolean
}

export default async function __loadSkyConfig(): Promise<null | SkyConfig> {
    const exists = fs.existsSync('sky.config.ts')
    if (!exists) {
        // eslint-disable-next-line no-console
        console.error('missing "sky.config.ts"')
        return null
    }

    const config = (await import(path.join(process.cwd(), 'sky.config.ts'))).default as SkyConfig

    let hasError = false
    Object.keys(config.apps).forEach(k => {
        if (!__getAppConfig(k, config)) {
            hasError = true
        }
    })

    return hasError ? null : config
}

export function __getAppConfig(name: string, config: SkyConfig): null | SkyApp {
    const skyAppConfig = config.apps[name]

    if (!skyAppConfig) {
        // eslint-disable-next-line no-console
        console.error(`${name}: missing app description in "sky.config.json"`)
        return null
    }

    if (!skyAppConfig.path) {
        // eslint-disable-next-line no-console
        console.error(`${name}: missing app path in "sky.config.json"`)
        return null
    }

    if (!skyAppConfig.target) {
        // eslint-disable-next-line no-console
        console.error(`${name}: missing app target in "sky.config.json"`)
        return null
    }

    return skyAppConfig
}
