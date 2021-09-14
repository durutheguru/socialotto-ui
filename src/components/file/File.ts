import WithRender from './file.html';

import { Component, Prop } from "vue-property-decorator";
import BaseVue from "../BaseVue";
import { Log, Web } from '../util';

import { videoPlayer } from 'vue-video-player';



@WithRender
@Component({
    components: {
        videoPlayer,
    },
})
export default class File extends BaseVue {


    @Prop()
    private fileRef!: string;


    @Prop()
    private fileName!: string;


    @Prop()
    private fileType!: string;


    @Prop()
    private meta!: string;


    private playerOptions: any = {};


    public get fileUrl(): string {
        return Web.BASE_URL + '/upload/' + this.fileRef;
    }


    public mounted() {
        if (this.fileType.startsWith('video')) {
            Log.info('Setting Player Options');
            this.playerOptions = this.getVideoPlayerOptions();
            Log.info(`Player Options: ${JSON.stringify(this.playerOptions)}`);
        } else {
            Log.info(`File Type: ${this.fileType}`);
        }
    }


    private getVideoPlayerOptions(): any {
        return {
            autoplay: false,
            muted: false,
            language: 'en',
            playbackRates: [0.7, 1.0, 1.5, 2.0],
            sources: [{
                type: this.fileType,
                src: this.fileUrl,
            }]
        };
    }


    private onPlayerPlay(player: any) {
        // console.log('player play!', player)
        // this.player.
        if (window.innerWidth < 900) {
            $('.vjs-fullscreen-control').click();
        }
    }


    private onPlayerPause(player: any) {
        // console.log('player pause!', player)
    }


    private onPlayerEnded(player: any) {
        // console.log('player ended!', player)
    }


    private onPlayerLoadeddata(player: any) {
        // console.log('player Loadeddata!', player)
    }


    private onPlayerWaiting(player: any) {
        // console.log('player Waiting!', player)
    }


    private onPlayerPlaying(player: any) {
        // console.log('player Playing!', player)
    }


    private onPlayerTimeupdate(player: any) {
        // console.log('player Timeupdate!', player.currentTime())
    }


    private onPlayerCanplay(player: any) {
        // console.log('player Canplay!', player)
    }


    private onPlayerCanplaythrough(player: any) {
        // console.log('player Canplaythrough!', player)
    }


    // or listen state event
    private playerStateChanged(playerCurrentState: any) {
        // console.log('player current update state', playerCurrentState)
    }


    // player is ready
    private playerReadied(player: any) {
        Log.info('Player Ready');
    }


}


