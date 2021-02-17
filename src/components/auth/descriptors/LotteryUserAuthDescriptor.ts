import AuthContextDescriptor from './AuthContextDescriptor';


export default class LotteryUserAuthDescriptor implements AuthContextDescriptor {


    public name: string = 'LOTTERY_USER';


    public homeUrl: string = '/lottery';


    public accessList: string[] = [];

}

