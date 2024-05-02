import './-Systems'
import globalify from 'helpers/globalify'

import { __SYSTEMS_RECORD } from './__'

declare global {
    class Entity extends Effect {
        removeComponent(name: string): void
    }
}

@effect
class Entity extends Effect {
    private __onAddComponent(name: string): void {
        if (!this.context(Systems)) {
            throw new Error('Systems missing')
        }

        const systemsRecord = this.context(Systems)[__SYSTEMS_RECORD]

        if (!systemsRecord[name]) {
            return
        }

        systemsRecord[name].forEach(system => {
            Object.keys(system.constructor.Components).forEach(k => {
                const Components = system.constructor.Components[k]
                if (Components.every(Component => this[Component.name])) {
                    system[k] ??= []
                    if (!system[k].includes(this)) {
                        system[k].push(this)
                        const onAdd = `onAdd${k[0].toUpperCase() + k.slice(1)}`
                        system[onAdd] && system[onAdd](this)
                    }
                }
            })
        })
    }

    removeComponent(name: string): void {
        delete this[name]

        const systemsRecord = this.context(Systems)[__SYSTEMS_RECORD]

        if (!systemsRecord[name]) {
            return
        }

        // systemsRecord[name].forEach(system => {
        //     Object.keys(system.constructor.Components).forEach(k => {
        //         const Components = system.constructor.Components[k]
        //     })
        // })
    }
}

globalify({ Entity })
