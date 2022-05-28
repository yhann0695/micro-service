import UserRepository from '../repository/UserRepository';
import * as utility from '../../../utility';
import UserException from '../exception/UserException';

class UserService {

    async findByEmail(req) {
        try {
            const { email } = req.params;
            this.validateRequestEmail(email); 
            let user = await UsuarioRepository.findByEmail(email);
            this.validateUserNotFound(user);
            return { 
                status: utility.SUCCESS,
                user: {
                    id: user.id, 
                    name: user.name,
                    email: user.email
                }
            }
        } catch (err) {
            return {
                status: err.status ? err.status : utility.INTERVAL_SERVER_ERROR,
                message: err.status
            }
        }
    }

    validateRequestEmail(email) {
        if(!email) {
            throw new UserException(utility.BAD_REQUEST, "User email was not informed.");
        }
    }

    validateUserNotFound(user) {
        if(!user) {
            throw new UserException(utility.BAD_REQUEST, "User was not found.");
        }
    }
}

export default new UserService();