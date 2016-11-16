import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {AuthHttp} from "angular2-jwt";

@Component({
    template: `
<ul>
    <li *ngFor="let w of words">
          {{w}}
    </li>        
</ul>
`
})
export class StartTestPageComponent {

    words: string[];

    constructor(private http: AuthHttp) {

    }

    ngOnInit() {
        console.log("HELLO");
        this.http.get('/api/words')
            .subscribe((res) => {
                console.log("RES2:", res);
            }, err => {
                console.log('err:', err);
            });
    }
}