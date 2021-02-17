import LotteryUserAuthDescriptor from './LotteryUserAuthDescriptor';
import BackOfficeUserAuthDescriptor from './BackOfficeUserAuthDescriptor';


export default [
    new BackOfficeUserAuthDescriptor(),
    new LotteryUserAuthDescriptor(),
];


