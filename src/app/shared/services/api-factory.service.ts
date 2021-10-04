import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

/****  FUTURE USE, to create http factory.  */
interface IRestResources {

}

interface IRestApi {

}
@Injectable({
    providedIn: 'root'
})
export class ApiFactoryService {
    resource: IRestApi;
    baseUrlRestPath: string;
    REST_RESOURCES = {
        "account": [
            {
                method: "GET",
            },
            {
                method: "POST"
            }
        ]
    }

    constructor(private http: HttpClient){
        this.resource = this.generateRestFunctions(this.REST_RESOURCES);
        this.baseUrlRestPath = environment.host;
    }

    private generateRestFunctions(restResourceMap: IRestResources): IRestApi {
        const obj = {};
        // Object.keys(restResourceMap).forEach((resourceArea) => {
        //     obj[resourceArea] = {}
        //     Object.keys(restResourceMap[resourceArea]).forEach((resourceItem) => {
        //         const restResourceDef = restResourceMap[resourceArea][resourceItem];
        //         restResourceDef.methods.forEach(method => {
        //             obj[resourceArea][`${method.toLowerCase()} ${resourceItem}`] =
        //                 this.httpFunctionFactory(method, restResourceDef.urlTemplate);
        //         });
        //     });
        // });
        return obj as IRestApi;
    }
    httpFunctionFactory(method: any, urlTemplate: any): any {
        throw new Error('Method not implemented.');
    }
    //     private httpFunctionFactory(
    //         httpMethod: HttpMethods,
    //         urlTemplate: string
    //     ) (options: IRestOptions) => Observable < any > {
    //         return(options: IRestOptions = {}): Observable<any> => {
    //     const url = buildRestUrl(this.environment.host, urlTemplate, options.paramMap ?? {});
    // }
    //   }
    // }
}