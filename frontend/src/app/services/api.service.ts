import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class ApiService {
    constructor(private plainHttp: Http, private authHttp: AuthHttp) {

    }


    public authenticateRequest(username) {
        return this.plainHttp
            .post("/api/token", {username});
    }

}