import AuthContextDescriptor from './AuthContextDescriptor';

export default class BackOfficeUserAuthDescriptor implements AuthContextDescriptor {

    public name: string = 'BACK_OFFICE_USER';

    public homeUrl: string = '/back-office/users/back-office';

    public accessList: string[] = [];

}
