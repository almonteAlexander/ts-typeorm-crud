import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

class BCRYPT{
    /**
     *
     * @static
     * @param {(string | undefined)} password The password string to encrypt.
     * @return {*}  {(Promise<string | undefined>)} The encrypted password or undefined.
     * @memberof BCRYPT
     */
    static async encryptPassword(password: string | undefined): Promise<string | undefined>{
        if(password){
            const salt: string = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS as any));
            const hashedPassword: string = await bcrypt.hash(password, salt);
            return hashedPassword;
        }
        return undefined;
    }

    /**
     *
     *
     * @static
     * @param {string} userPassword     A string of the user password.
     * @param {string} insertedPassword A string of the original user password.
     * @return {*}  {Promise<boolean>}  True | False.
     * @memberof BCRYPT
     */
    static async isValidPassword(userPassword: string, insertedPassword: string): Promise<boolean>{
        return await bcrypt.compare(userPassword, insertedPassword);
    }
}

export default BCRYPT;