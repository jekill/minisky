import {Component, Input} from "@angular/core";

@Component({
    selector: 'msky-app-menu',
    templateUrl: './app-menu.component.html',
    styleUrls: ['./app-menu.component.scss']
})
export class AppMenuComponent {

    @Input()
    private isAuthenticated: boolean = false;

}