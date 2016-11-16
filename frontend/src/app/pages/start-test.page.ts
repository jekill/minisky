import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {AuthHttp} from "angular2-jwt";
import {Word} from "../model/word";

@Component({
    template: `
<button class="btn btn-success" (click)="loadWords()">load</button>
<ul>
    <li *ngFor="let w of words">
          {{w.valueEn}}:{{w.valueRu}}
    </li>        
</ul>
`
})
export class StartTestPageComponent {

    words: Word[];

    constructor(private http: AuthHttp) {

    }

    loadWords() {
        this.http.get('/api/words')
            .map((res) => {
                return <Word[]>res.json();
            })
            .subscribe((res) => {
                console.log("RES2:", res);
                this.words = res;
            }, err => {
                console.log('err:', err);
            });
    }

    ngOnInit() {
    }
}