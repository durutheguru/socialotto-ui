import { Log, Constants } from '../util';
import AuthContextDescriptor from './descriptors/AuthContextDescriptor';
import descriptors from '@/components/auth/descriptors';


/**
 * UserAuthContext class encapsulates all the information known about 
 * a user on successful authorisation.. 
 */
export default class UserAuthContext {

    public static instance: UserAuthContext | null = null;


    public static getInstance(): UserAuthContext {
        if (UserAuthContext.instance === null) {
            Log.info('Creating New UserAuthContext instance');
            UserAuthContext.instance = new UserAuthContext();
        }

        return UserAuthContext.instance;
    }


    public static destroy() {
        delete UserAuthContext.instance;
    }


    private username: string = '';


    private authorizations: string[] = [];


    public initialize(token: string) {
        const tokenMatch = token.match(Constants.regexps.AUTH_TOKEN);
        if (tokenMatch === null) {
            Log.error('Unable to Extract Token Payload');
            return;
        }

        this.processTokenPayload(tokenMatch[1]);
    }


    public homeUrl(): string {
        const authContext = this.authContext();
        if (authContext === null) {
            return '';
        }

        return authContext.homeUrl;
    }


    public authContext(): AuthContextDescriptor | null {
        let contextDescriptor: AuthContextDescriptor | null = null;

        for (const descriptor of descriptors) {
            if (this.hasAuthorization(descriptor.name)) {
                contextDescriptor = descriptor;
            }
        }

        return contextDescriptor;
    }


    public hasAuthorization(authorization: string): boolean {
        return (this.authorizations.length > 0) && (this.authorizations.indexOf(authorization) > -1);
    }


    private processTokenPayload(payload: string) {
        payload = atob(payload);
        const data = JSON.parse(payload);

        this.username = data.sub;
        this.authorizations = data.authorizations;
    }

}


