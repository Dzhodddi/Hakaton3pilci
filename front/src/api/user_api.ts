import {user_api} from "./clients.ts";
import {useAuth} from "../context/auth_context.tsx";


export interface UserDTO {
    email: string
    firstName: string
    lastName: string
    occupation: string | undefined
    education: string | undefined
    experience: string | undefined
    skills: string | undefined
}

export const createUser = async (payload: UserDTO): Promise<UserDTO | null> => {
    try {
        const { data } = await user_api.post<UserDTO>('/api/users', payload)
        return data
    } catch (err) {
        return null;
    }
}

export const deleteUser = async (): Promise<boolean> => {
    const {user} = useAuth()
    try {
        await user_api.delete<UserDTO>('/api/users',{
            params: {
                'email': user?.email
            }
        })
        return true
    } catch {
        return false;
    }
}

export const getUser = async (): Promise<UserDTO | null> => {
    const {user} = useAuth()
    try {
        const { data } = await user_api.get<UserDTO>('/api/users' ,{
            params: {
                'email': user?.email
            }
        })
        return data
    } catch {
        return null;
    }
}

export const updateUser = async (payload: UserDTO): Promise<UserDTO | null> => {
    const {user} = useAuth()
    try {
        const { data } = await user_api.put<UserDTO>('/api/users', payload, {
            params: {
                'email': user?.email
            },
        })
        return data
    } catch {
        return null;
    }
}