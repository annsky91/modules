export {}

declare global {
    namespace ClickHouse {
        const select: <T>(
            connection: ClickHouse,
            name: string,
            columns: string[],
            query?: string
        ) => Promise<T[]>
    }
}

Object.assign(ClickHouse, {
    async select(
        connection: ClickHouse,
        name: string,
        columns: string[],
        query?: string
    ): Promise<Object[]> {
        return (
            await connection.query(`
                SELECT ${columns.map(column => `\`${column}\``).join(',')}
                FROM \`${name}\`
                ${query ? await query : ''}
            `)
        ).toPromise()
    },
})