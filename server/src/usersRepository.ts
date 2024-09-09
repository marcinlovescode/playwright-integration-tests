import {type Pool, type RowDataPacket, type FieldPacket} from "mysql2/promise"

interface User extends RowDataPacket {
    slackId: number
    boxId: number
  }


export const getBoxIdBySlackId = async (pool: Pool ,id: number) : Promise<number | undefined> => {
    const sqlQuery = "SELECT slackId, boxId FROM users WHERE slackId = ?"
    const [rows]: [User[], FieldPacket[]] = await pool.query(sqlQuery, id)
    if(rows.length > 1){
        throw new Error('Found more than one user with given ID')
    }
    return rows[0]?.boxId;
}