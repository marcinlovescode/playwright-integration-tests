import express, { type Express } from "express"

import {getUserDetails} from "./usersService"
import {getBoxIdBySlackId} from "./usersRepository"
import {sendMessage} from "./slackService"


import {createDbPool} from './mysqldb'

const app: Express = express()
app.use(express.json())
const port: number = 3000
const dbPool = createDbPool();

app.post('/greet', async(req, res) => {
    const body: {slackUserID : number} = req.body;
    const boxId = await getBoxIdBySlackId(dbPool, body.slackUserID)
    if(boxId === undefined){
        res.sendStatus(404);
        return;
    }
    const userDetails = await getUserDetails(boxId);
    await sendMessage(body.slackUserID,`Hello ${userDetails.firstName} ${userDetails.lastName}`)
    res.sendStatus(201);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})