export {}

declare global {
    namespace Postgres {
        const createIndexes: (
            sql: Postgres.Sql,
            name: string,
            indexes?: Postgres.Index[]
        ) => Promise<void>
    }
}

Object.assign(Postgres, {
    async createIndexes(sql: Postgres.Sql, name: string, indexes: Postgres.Index[]): Promise<void> {
        for (let i = 0; i < indexes?.length; ++i) {
            if (indexes[i].type === 'UNIQUE') {
                await sql`CREATE UNIQUE INDEX IF NOT EXISTS ${sql(
                    name + '/' + indexes[i].name!.toLowerCase()
                )} ON ${sql(name)}(${sql(indexes[i].columns.map(c => c.toLowerCase()))})`
            } else if (indexes[i].type === 'INDEX') {
                await sql`CREATE INDEX IF NOT EXISTS ${sql(
                    name + '/' + indexes[i].name!.toLowerCase()
                )} ON ${sql(name)}(${sql(indexes[i].columns.map(c => c.toLowerCase()))})`
            }
        }
    },
})
