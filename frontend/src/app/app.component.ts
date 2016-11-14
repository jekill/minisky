import {Component, OnInit} from '@angular/core';
import {AppStateService} from "./store/appstate.service";
import {Languages} from "./translate/languages";
import {select} from "ng2-redux";
import {TranslateService} from "./translate/translate.service";
import {Observable} from "rxjs";
import {AuthService} from "./services/auth.service";

@Component({
    selector: 'msky-application',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    @select() uiLang: Observable<Languages>;
    @select() isAuthenticated: boolean;
    @select() user;

    constructor(private stateService: AppStateService,
                private translateService: TranslateService,
                private authService: AuthService) {
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
