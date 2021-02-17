import { Component } from 'vue-property-decorator';

import BaseVue from '@/components/BaseVue';

import WithRender from './users.html';


@WithRender
@Component
export default class UsersHome extends BaseVue {



}
