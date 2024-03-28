import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    bcrypt_salt: process.env.BCRYPT_SALT,
    jwt_secret: process.env.JWT_SECRET,
    jwt_expires_in: process.env.JWT_ACCESS_EXPIRES_IN
}