import axios from "axios"

const serviceUrl = "localhost:8080/api/users"
export type UserDetails = {
    firstName: string
    lastName: string
}

export type Resoonse = {
    id: number
    firstName: string
    lastName: string
}

export const getUserDetails = async (userId: number) : Promise<UserDetails> => {
    try{

    const response  = await axios.get<Resoonse>(`http://${serviceUrl}/${userId}`);
    return {
        firstName: response.data.firstName,
        lastName: response.data.lastName
    }
} catch (e) {
    throw e;
}
} 