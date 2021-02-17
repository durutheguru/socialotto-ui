
import BaseVue from '@/components/BaseVue';
import WithRender from './modal.html';
import { Component, Prop, Emit } from 'vue-property-decorator';
import { Log } from '../util';



@WithRender
@Component
export default class Modal extends BaseVue {


    @Prop({default: false})
    private readonly show!: boolean;


    private dialogVisible: boolean = false;


    @Prop({default: 'modal-small'})
    private modalClass!: string;


    public mounted() {
        this.dialogVisible = this.show;

        // respond to escape key press
        document.addEventListener('keydown', (e) => {
            if (this.dialogVisible && e.keyCode === 27) {
                this.close();
            }
        });
    }


    public get showing() {
        return this.dialogVisible;
    }


    public close() {
        this.dialogVisible = false;
        this.$emit('close-dialog');
    }


}

