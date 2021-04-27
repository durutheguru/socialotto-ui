import AuthContextDescriptor from './AuthContextDescriptor';


export default class PlatformUserAuthDescriptor implements AuthContextDescriptor {


    public name: string = 'PLATFORM_USER';


    public homeUrl: string = '/lottery';


    public accessList: string[] = [];

}


