import {Languages} from "../translate/languages";
import {Component, Input, EventEmitter, Output} from "@angular/core";

@Component({
    selector: 'msky-lang-switcher',
    templateUrl: './lang-switcher.component.html',
    styleUrls: ['./lang-switcher.component.scss']
})
export class LangSwitcherComponent {

    @Input() currentLang: Languages;
    langs = Languages;

    @Output()
    changeCurrentHandler = new EventEmitter<Languages>();

    constructor() {
    }

    changeCurrent(newLang: Languages) {
        this.changeCurrentHandler.emit(newLang);
    }
}