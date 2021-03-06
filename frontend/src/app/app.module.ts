import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ApplicationRef} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';

import {createNewHosts, createInputTransfer, removeNgStyles} from "@angularclass/hmr";

import {AppComponent} from './app.component';
import {TranslateComponent} from './translate/translate.component';
import {LoginFormComponent} from "./login-form/login-form.component";
import {NgReduxModule} from "ng2-redux";
import {AppStateService} from "./store/appstate.service";
import {LangSwitcherComponent} from "./lang-switcher/lang-switcher.component";
import {TranslateService} from "./translate/translate.service";
import {routedComponents, routing} from "./app.routing";
import {ScoreBlockComponent} from "./score-block/score-block.componet";
import {AppMenuComponent} from "./app-menu/app-menu.component";
import {AuthService} from "./services/auth.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {UserInfoComponent} from "./user-info/user-info.component";
import {AuthHttp, AuthConfig} from "angular2-jwt";
import {ApiService} from "./services/api.service";
import {TokenService} from "./services/token.serive";
import {WordsTestComponent} from "./words-test/words-test.component";


function authHttpFactory(http: Http, tokenService:TokenService) {
    return new AuthHttp(new AuthConfig({
        noJwtError: true,
        globalHeaders: [{'Accept': 'application/json'}],
        tokenGetter: (() => {
            return tokenService.getToken();
        }),
    }), http);
}

@NgModule({
    declarations: [
        AppComponent,
        TranslateComponent,
        LoginFormComponent,
        LangSwitcherComponent,
        ScoreBlockComponent,
        AppMenuComponent,
        UserInfoComponent,
        WordsTestComponent,
        ...routedComponents
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,

        NgReduxModule.forRoot(),
        routing,
    ],
    providers: [
        AppStateService,
        TranslateService,
        AuthService,
        AuthGuardService,
        TokenService,
        {
            provide: AuthHttp,
            useFactory: authHttpFactory,
            deps: [Http, TokenService]
        },
        ApiService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(public appRef: ApplicationRef, public appState: AppStateService) {
        appState.configure();
    }

    hmrOnInit(store) {
        if (!store || !store.state) {
            return;
        }
        console.log('HMR store', store);
        console.log('store.state.data:', store.state.data);
        // inject AppStore here and update it
        // this.AppStore.update(store.state)
        if ('restoreInputValues' in store) {
            store.restoreInputValues();
        }
        // change detection
        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    }

    hmrOnDestroy(store) {
        const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // inject your AppStore and grab state then set it on store
        // var appState = this.AppStore.get()
        // store.state = Object.assign({}, appState)
        // save input values
        store.restoreInputValues = createInputTransfer();
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
        // anything you need done the component is removed
    }
}
