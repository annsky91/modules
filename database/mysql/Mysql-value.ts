import { escape } from 'includes/mysql'

import Ns = Mysql

declare global {
    namespace Mysql {
        function value(value: unknown): unknown
    }
}

Object.assign(Ns, {
    value(value: unknown): unknown {
        if (value == null) {
            return 'NULL'
        }

        if (value === true) {
            return 'TRUE'
        }

        if (value === false) {
            return 'FALSE'
        }

        if (typeof value === 'number') {
            return value
        }

        if (typeof value === 'object') {
            return escape(JSON.stringify(value))
        }

        return escape(value)
    },
})
