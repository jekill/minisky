import {Component, Input} from "@angular/core";
import {User} from "../model/user";

@Component({
    selector: 'msky-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
    @Input()
    private user: User;
}