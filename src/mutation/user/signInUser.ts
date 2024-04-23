import { comparePasswords, createJWT } from "../../modules/auth.js"
import { MutationResolvers } from "../../types"

export const signInUser: MutationResolvers['signInUser'] = async (_, {username, password}, {dataSources}, __) => {
    try {
        const user = await dataSources.db.user.findUnique({
            where: { username }
        })
        
        if (!user) {
            return {
                code: 404,
                message: 'The user does not exist',
                success: false,
                token: null,
            }
        }
        
        const passwordMatch = await comparePasswords(password, user.password)
    
        const token = createJWT({id: user.id, username: user.username})
        
        if (!passwordMatch) {
            return {
                code: 401,
                message: 'The password does not match',
                success: false,
                token: null,
            }
        }
        
        return {
            code: 200,
            message: 'The user has been authenticated',
            success: true,
            token
        }
    } catch (error) {
        return {
            code: 400,
            message: (error as Error).message,
            success: false,
            token: null,
        }
    }
}