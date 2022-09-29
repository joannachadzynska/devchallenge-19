const currentLang = navigator.language.split("-")[0].toString();
window.onload = function () {
    document.documentElement.lang = navigator.language;
};
import lang from "../data/names.json" assert { type: "json" };

const map = document.getElementById("map");

const TRANSLATIONS = {
    AFFECTED_TYPE: "affected_type",
    OBJECT_STATUS: "object_status",
    EVENT: "event",
    QUALIFICATION: "qualification",
};

const AFFECTED_TYPES = [2, 3, 4, 5, 6];
const OBJECT_STATUS = [
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
];
const EVENT = [
    5, 6, 7, 8, 9, 10, 11, 12, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
    47,
];
const QUALIFICATION = [
    1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26,
    27, 29, 30, 32, 33, 34, 35,
];

const stats = [...document.querySelectorAll("[data-type")];

class Language {
    constructor(lang) {
        var __construct = function () {
            if (eval("typeof " + lang) == "undefined") {
                lang = "en";
            }
            return;
        };
        this.getStr = function (str) {
            var retStr = eval("eval(lang)." + str);
            if (typeof retStr != "undefined") {
                return retStr;
            } else {
                return str;
            }
        };
    }
}

var translator = new Language(lang[`${currentLang}`]);

stats.forEach((stat) => {
    const affectedType = stat.getAttribute("data-type");
    const translation = translator.getStr(TRANSLATIONS.AFFECTED_TYPE)[
        affectedType
    ];
    stat.querySelector("p").textContent = translation;
});
