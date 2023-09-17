import { Connection, Pool, RowDataPacket } from 'includes/mysql'

export default async function mysql__isTableExists(
    connection: Connection | Pool,
    database: string,
    name: string
): Promise<boolean> {
    const result = (await connection.query(`
        SELECT * 
        FROM \`INFORMATION_SCHEMA\`.\`TABLES\`
        WHERE
            \`TABLE_SCHEMA\`='${database}' AND
            \`TABLE_NAME\`='${name}'
        LIMIT 1
    `)) as RowDataPacket[][]

    return result[0].length > 0
}