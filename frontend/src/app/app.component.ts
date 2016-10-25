import {Component} from '@angular/core';
import {AppStateService} from "./store/appstate.service";
import {Languages} from "./translate/languages";
import {select} from "ng2-redux";

@Component({
    selector: 'msky-application',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app works!';

    @select() uiLang: Languages;


    constructor(public stateService: AppStateService) {

    }

    onChangeUiLang(newLang: Languages) {
        this.stateService.store.dispatch({type: 'CHANGE_UI_LANGUAGE', newLang});
    }
}
