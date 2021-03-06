import {Routes, RouterModule} from "@angular/router";
import {LoginPageComponent} from "./pages/login.page";
import {StartTestPageComponent} from "./pages/start-test.page";
import {AuthGuardService} from "./services/auth-guard.service";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'start-test',
        pathMatch: 'full'
    },
    {
        path: 'start-test',
        component: StartTestPageComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'login',
        component: LoginPageComponent
    },
    {
        path: 'logout',
        component: LoginPageComponent
    }
];

export const routing = RouterModule.forRoot(routes, {
    useHash: true
});

export const routedComponents = [
    StartTestPageComponent,
    LoginPageComponent
];