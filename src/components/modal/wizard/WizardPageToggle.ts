

export default class WizardPageToggle {

    public pages: any[] = [];

    private selectedPage!: any;

    public constructor(
        ...keys: string[]
    ) {

        keys.forEach((pageKey, pageIndex) => {
            this.pages.push({
                key: pageKey,
                index: pageIndex,
            });
        });

        this.setPage(0);
    }


    public setPage(index: number) {
        this.selectedPage = this.pages[index];
    }


    public canNext() {
        return this.selectedPage.index < this.pages.length - 1;
    }


    public canPrevious() {
        return this.selectedPage.index > 0;
    }


    public next() {
        this.setPage(this.selectedPage.index + 1);
    }


    public previous() {
        this.setPage(this.selectedPage.index - 1);
    }


    public isFirstPage() {
        return this.selectedPage.index === 0;
    }


    public isLastPage() {
        return this.selectedPage.index === this.pages.length - 1;
    }


    public isSelectedPage(pageKey: string): boolean {
        return this.selectedPage.key === pageKey;
    }


}

