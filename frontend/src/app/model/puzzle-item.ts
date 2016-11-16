import {Languages} from "../translate/languages";

export class PuzzleItem {
    word: string;
    choices: string[];
    lang: Languages;
    answers: string[];
}