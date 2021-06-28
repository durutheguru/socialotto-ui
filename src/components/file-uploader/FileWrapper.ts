
import ApiResource from '@/components/core/ApiResource';


export default class FileWrapper {


    private uploadReference!: string;


    public constructor(
        private file: File,
        private uploadResource: ApiResource,
    ) {}


    public getFile(): File {
        return this.file;
    }


    public getResource(): ApiResource {
        return this.uploadResource;
    }


    public setReference(reference: string) {
        this.uploadReference = reference;
    }


    public getReference() {
        return this.uploadReference;
    }


}

