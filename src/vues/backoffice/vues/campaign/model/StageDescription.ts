import Constants from '@/components/util/Constants';
import { Util, Log } from '@/components/util';

export default class StageDescription {


    private key!: string;


    private stage!: string;


    private winnersCount!: number;


    public evaluationTime!: string;


    public static defaultStage(key?: string): StageDescription {
        const description = new StageDescription();
        description.stage = Constants.campaignStages[0];
        description.evaluationTime = '';
        description.winnersCount = 1;

        if (key) {
            Log.info(`Setting Stage Description Key: ${key}`);
            description.key = key;
        }

        return description;
    }


}
