

export default class UserValidatorService {


    public static validate(user: any, vueInstance: any): boolean {
        if (user.password !== user.confirmPassword) {
            vueInstance.error = 'Please confirm Password';
            return false;
        }

        return true;
    }


}

