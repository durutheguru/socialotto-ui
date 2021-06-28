import WithRender from './file.html';

import { Component, Prop } from "vue-property-decorator";
import BaseVue from "../BaseVue";
import { Web } from '../util';



@WithRender
@Component
export default class File extends BaseVue {


    @Prop()
    private fileRef!: string;


    @Prop()
    private fileName!: string;


    @Prop()
    private fileType!: string;


    @Prop()
    private meta!: string;


    public get fileUrl(): string {
        return Web.BASE_URL + '/upload/' + this.fileRef;
    }


}


