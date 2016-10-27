import {Languages} from "./languages";
import {Injectable, EventEmitter} from "@angular/core";
// import {Observable} from "rxjs";

@Injectable()
export class TranslateService {
    defaultLang: Languages;
    currentLang: Languages;
    onChangeLanguage = new EventEmitter<Languages>();

    constructor() {
        this.defaultLang = Languages.en;
        this.currentLang = Languages.en;

        this.onChangeLanguage.subscribe((newLang: Languages) => {
            this.currentLang = newLang;
        });
        // this.currentLang = new Observable<Languages>();
        // console.log(this.currentLang);
    }

    setDefaultLanguage(lang: Languages) {
        this.defaultLang = lang;
    }

    changeLanguage(newLang: Languages) {
        this.onChangeLanguage.emit(newLang);
    }


    getDefaultLangAsString(): string {
        return Languages[this.defaultLang];
    }
}