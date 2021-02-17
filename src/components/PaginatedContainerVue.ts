
import PageDataModel from './core/PageDataModel';
import BaseVue from './BaseVue';


export default abstract class PaginatedContainerVue extends BaseVue {


    public get hasElements(): boolean {
        return this.getPageDataModel() && this.getPageDataModel().hasElements();
    }


    public get canPrevious(): boolean {
        return this.getPageDataModel().canPrevious();
    }


    public get canNext(): boolean {
        return this.getPageDataModel().canNext();
    }


    public next() {
        this.getPageDataModel().next();
    }


    public previous() {
        this.getPageDataModel().previous();
    }


    public handleSuccessResponse(response: any, searchResults: boolean = false) {
        const elements = this.getPageDataModel();

        elements.setLoading(false);
        elements.assignResponse(response, searchResults);
    }


    public handleErrorResponse(error: any) {
        this.getPageDataModel().setLoading(false);
    }


    protected abstract getPageDataModel(): PageDataModel;


}


