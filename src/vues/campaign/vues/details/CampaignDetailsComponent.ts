
import WithRender from './campaign-details.html';


import BaseVue from '@/components/BaseVue';
import ApiResource from '@/components/core/ApiResource';
import { Log } from '@/components/util';
import CampaignService from '@/services/campaign/CampaignService';
import { Component } from 'vue-property-decorator';
import File from '@/components/file/File';



@WithRender
@Component({
    components: {
        File,
    },
})
export default class CampaignDetailsComponent extends BaseVue {


    private campaign: ApiResource = ApiResource.create();


    public mounted() {
        Log.info(`Campaign Details ID: ${this.$route.params.id}`);

        this.getDetails();
    }


    private getDetails() {
        let self = this;

        self.campaign.error = '';
        self.campaign.loading = true;

        CampaignService.getCampaignDetails(
            self.$route.params.id,

            (response: any) => {
                self.campaign.loading = false;
                self.campaign.data = response.data;
            },

            (error: any) => {
                self.campaign.loading = false;
                self.campaign.error = this.extractError(error);
                Log.error(self.campaign.error);
                self.$router.push('/campaign');
            }
        );
    }


}

