const TRANSLATIONS = {
    AFFECTED_TYPE: "affected_type",
    OBJECT_STATUS: "object_status",
    EVENT: "event",
    QUALIFICATION: "qualification",
};

const AFFECTED_TYPES = {
    2: "Death of an individual",
    3: "Those wounded or whose health was otherwise damaged",
    4: "Rape",
    5: "Violation of other rights",
    6: "Disappearance of an individual",
};
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

export { TRANSLATIONS, AFFECTED_TYPES, OBJECT_STATUS, EVENT, QUALIFICATION };
