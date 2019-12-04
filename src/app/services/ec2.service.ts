import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class Ec2Service {
    baseUrl;
  
    constructor(
      private http: HttpClient,
    ) {
        this.baseUrl = 'https://1r58kv4gl9.execute-api.us-west-2.amazonaws.com/default/ec2-dash-service';
    }

    getInstances(pageSize: number, pageIndex: number) {
        return this.http.get(`${this.baseUrl}?pageSize=${pageSize}&pageIndex=${pageIndex}`);
    }
}