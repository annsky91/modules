import FetchRequestInit, { __fetchArgs } from './__fetchArgs'

export {}

declare global {
    namespace fetch {
        function json<T extends unknown>(
            url: RequestInfo | URL,
            init?: FetchRequestInit
        ): Promise<T>
    }
}

Object.assign(fetch, {
    json<T extends unknown>(url: RequestInfo | URL, init?: FetchRequestInit): Promise<T> {
        return fetch(...__fetchArgs(url, init)).then(result => result.json())
    },
})
