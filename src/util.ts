import { Promise } from 'es6-promise';


/**
 * Structure of the error objects with which promises
 * are rejected when an API call fails.
 */
interface ApiError {
    status: number;  // HTTP error code or 0 when there was a network error
    message: string; // a descriptive error message
}


export type HttpMethod =
    'POST'   |
    'PUT'    |
    'GET'    |
    'DELETE' ;

export interface ApiCallArgs {
    url: string;
    method: HttpMethod;
    payload?: any;
    headers?: any;
};

export interface ApiCallResponse {
    message: string,
    body: any,
    status: number
};

export function apiCall(args: ApiCallArgs): Promise<ApiCallResponse> {

    let url = args.url;
    let method = args.method;
    let payload = args.payload;
    let headers = args.headers;

    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();

        xhr.open(method, url, true);

        if (headers) {
            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });
        }

        xhr.onreadystatechange = function() {
            if (this.readyState === 4) {  // loaded
                if (this.status  === 200) {  // successfuly
                    let body = JSON.parse(this.responseText);
                    resolve({
                        message: 'Request successful',
                        body: body,
                        status: this.status
                    });
                } else {  // loaded but non-successful response
                    reject({
                        message: this.statusText,
                        body: this.responseText,
                        status: this.status
                    });
                }
            }
        };

        xhr.onerror = function() {
            reject({
                message: 'Network error',
                body: '',
                status: 0
            });
        }

        // NOTE: Note that the payload should probably be stringified
        // before being passed into this function in order to allow
        // non-json encodings of the payload (such as url-encoded or plain text).
        if (payload !== undefined) {
            xhr.send(JSON.stringify(payload));
        } else {
            xhr.send();
        }
    });
};
