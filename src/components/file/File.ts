import WithRender from './file.html';

import { Component, Prop } from "vue-property-decorator";
import BaseVue from "../BaseVue";
import { Web } from '../util';

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


    private playerOptions: any = {
        height: '360',
        autoplay: true,
        muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
            type: "video/mp4",
            // mp4
            src: "http://vjs.zencdn.net/v/oceans.mp4",
            // webm
            // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
        }],
        poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
    };


    public get fileUrl(): string {
        return Web.BASE_URL + '/upload/' + this.fileRef;
    }


    private onPlayerPlay(player: any) {
        // console.log('player play!', player)
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
        // seek to 10s
        console.log('example player 1 readied', player)
        player.currentTime(10)
        // console.log('example 01: the player is readied', player)
    }


}


