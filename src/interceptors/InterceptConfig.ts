
export interface InterceptResponse {

    status: number;

    body: any;

    headers: any;

}


export default interface InterceptConfig {

    url: string;

    method: 'GET' | 'POST';

    response: InterceptResponse;

}


