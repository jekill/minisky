import {Component, OnInit, Input} from '@angular/core';
import {TranslateService} from "./translate.service";
import {Languages} from "./languages";

@Component({
    selector: 'msky-translate',
    templateUrl: './translate.component.html',
    styleUrls: ['./translate.component.scss']
})
export class TranslateComponent implements OnInit {

    @Input() lang: string;
    isVisible: boolean;

    constructor(public translateService: TranslateService) {

    }

    ngOnInit() {
        this.isVisible = (this.lang === Languages[this.translateService.defaultLang]);

        console.log("++++",
            this.lang ,
            Languages[this.translateService.defaultLang],
            (this.lang === Languages[this.translateService.defaultLang]));

        this.translateService.onChangeLanguage.subscribe((newLang) => {
                this.isVisible = (this.lang === Languages[newLang]);
            }
        );
    }

}
