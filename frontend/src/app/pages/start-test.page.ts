import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {AuthHttp} from "angular2-jwt";
import {Word} from "../model/word";
import {WordsTest} from "../model/WordsTest";
import {AppStateService} from "../store/appstate.service";
import {TestActions} from "../store/actions/test.actions";
import {select} from "ng2-redux";

@Component({
    template: `
<button class="btn btn-success" (click)="loadWords()">load</button>

<div *ngIf="(wordsTest|async)">
<msky-words-test [wordsTest]="(wordsTest|async)"></msky-words-test>
</div>
`
})
export class StartTestPageComponent {

    @select(['currentTest', 'wordsTest']) wordsTest;

    constructor(private http: AuthHttp, private state: AppStateService) {

    }

    loadWords() {
        this.http.post('/api/tests', {})
            .map((res) => {
                return <WordsTest>res.json();
            })
            .subscribe((res) => {
                this.state.store.dispatch(TestActions.createSetCurrentAction(res));
            }, err => {
                console.log('err:', err);
            });
    }

    ngOnInit() {
    }
}