import {Component, OnInit} from '@angular/core';
import {AppStateService} from "./store/appstate.service";
import {Languages} from "./translate/languages";
import {select} from "ng2-redux";
import {TranslateService} from "./translate/translate.service";
import {Observable} from "rxjs";

@Component({
    selector: 'msky-application',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    @select() uiLang: Observable<Languages>;
    @select() isAuthenticated: boolean;

    constructor(public stateService: AppStateService, public translateService: TranslateService) {
        this.onChangeUiLang(Languages.en);
    }

    onChangeUiLang(newLang: Languages) {
        this.stateService.store.dispatch({type: 'CHANGE_UI_LANGUAGE', newLang});
    }

    ngOnInit() {
        this.uiLang.subscribe((newLang) => {
            this.translateService.changeLanguage(newLang);
        });
    }
}
