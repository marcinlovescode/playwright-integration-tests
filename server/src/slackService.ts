import axios from "axios"

const serviceUrl = "localhost:8080/api/messages"

export const sendMessage = async (userId: number, message: string) : Promise<void> => {
    try{
    await axios.post(`http://${serviceUrl}`, {userId, message});
} catch (e) {
    throw e;
}
} 