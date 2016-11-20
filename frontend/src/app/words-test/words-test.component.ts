import {Component, Input} from "@angular/core";
import {WordsTest} from "../model/WordsTest";
@Component({
    selector: 'msky-words-test',
    templateUrl: './words-test.component.html'
})
export class WordsTestComponent {

    @Input()
    wordsTest: WordsTest;


}