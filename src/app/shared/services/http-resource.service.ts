import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export class Resource {
    id: number | undefined
}
export interface Serializer {
    fromJson(json: any): Resource;
    toJson(resource: Resource): any;
}
export class ResourceService<T extends Resource> {
    constructor(
        public httpClient: HttpClient,
        private url: string,
        private endpoint: string,
        private serializer: Serializer) { }

    public create(item: any): Observable<any> {
        return this.httpClient
            .post(`${this.url}${this.endpoint}`, item)
            .pipe(map(data => data));
    }

    // public update(item: T): Observable<T> {
    //     return this.httpClient
    //         .put<T>(`${this.url}/${this.endpoint}/${item.id}`,
    //             this.serializer.toJson(item))
    //         .pipe(map(data => this.serializer.fromJson(data) as T));
    // }

    // read(id: number): Observable<T> {
    //     return this.httpClient
    //         .get(`${this.url}/${this.endpoint}/${id}`)
    //         .pipe(map((data: any) => this.serializer.fromJson(data) as T));
    // }

    public customRead(url: string): Observable<any> {
        return this.httpClient
            .get(`${this.url}${url}`)
            .pipe(map((data: any) => data));
    }

    //   list(queryOptions: QueryOptions): Observable<T[]> {
    //     return this.httpClient
    //       .get(`${this.url}/${this.endpoint}?${queryOptions.toQueryString()}`)
    //       .pipe(map((data: any) => this.convertData(data.items)));
    //   }

    // delete(id: number) {
    //     return this.httpClient
    //         .delete(`${this.url}/${this.endpoint}/${id}`);
    // }

    // private convertData(data: any): T[] {
    //     return data.map((item: any) => this.serializer.fromJson(item));
    // }
}