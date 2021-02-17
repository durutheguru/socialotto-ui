
import WithRender from './search-field.html';
import BaseVue from '../BaseVue';
import { Component } from 'vue-property-decorator';
import { Util } from '@/components/util';


@WithRender
@Component
export default class SearchField extends BaseVue {

    
    private query: string = '';


    public throttleSearch() {
        Util.throttle(
            {
                key: 'search-field-update',

                run: () => this.searchHandler(),

                time: 300
            }
        );
    }


    private searchHandler() {
        if (Util.isValidString(this.query)) {
            this.$emit('search-query-update', this.query);
        } else {
            this.$emit('search-query-cleared');
        }
    }


    public get hasQuery() {
        return this.isValidString(this.query);
    }


    public reset() {
        this.query = '';
        this.$emit('search-query-cleared');
    }


}

