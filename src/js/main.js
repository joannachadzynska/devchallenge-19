import names from "../data/names.json" assert { type: "json" };
import events from "../data/events.json" assert { type: "json" };
import { TRANSLATIONS, AFFECTED_TYPES } from "./constants.js";

const stats = [...document.querySelectorAll("[data-type]")];
const langSwitcher = document.getElementById("lang");
const map = document.getElementById("map");
const button = document.getElementById("control__btn");
const timeline = document.getElementById("timeline");
let selectedTimeline = 0;

let isPlayed = false;
let locale = "en-US";
let timelineDates = [];
let interval;

const changeLang = (lang) => {
    locale = lang;
    document.documentElement.setAttribute("lang", lang);
    stats.forEach((element) => translateElement(element));
    timelineDates = dates2.slice(-100);
    createTimeline(lang);
    setAffectedTypesValues(timelineDates[selectedTimeline]);
};

langSwitcher.addEventListener("change", (e) => {
    changeLang(e.target.value);
});

addEventListener("DOMContentLoaded", (event) => {
    changeLang(locale);
});

function translateElement(element) {
    const key = element.getAttribute("data-type");
    const translation =
        names[locale.split("-")[0]][TRANSLATIONS.AFFECTED_TYPE][key];
    const name = element.querySelector("p");
    name.innerText = translation;
}

function setAffectedTypesValues(value) {
    const {
        affectedTypes,
        total: { locations },
    } = value;

    affectedTypes.forEach((type) => {
        stats
            .filter(
                (stat) =>
                    type.affected_type.id === +stat.getAttribute("data-type")
            )
            .forEach((stat) => {
                const value = stat.querySelector(".stat__card__number");
                value.innerText = type.affected_number;
            });
    });
    const svg = document.getElementById("mapbox");
    svg.querySelector("circle").remove();
    console.log(svg.querySelector("circle"));

    locations.forEach((location) => {
        const { lon, lat } = location;
        // targeting the svg itself

        // variable for the namespace
        const svgns = "http://www.w3.org/2000/svg";
        const circle = document.createElementNS(svgns, "circle");
        circle.setAttribute("r", "1.4222");
        circle.setAttribute("fill", "#c00000");
        circle.setAttribute("cx", `${lon * 14.7}`);
        circle.setAttribute("cy", `${lat * 3}`);

        svg.appendChild(circle);
    });
}

const groupByKey = (data, key) =>
    Object.values(
        data.reduce((res, item) => {
            const value = item[key];
            const existing = res[value] || { [key]: value, data: [] };
            return {
                ...res,
                [value]: {
                    ...existing,
                    data: [...existing.data, item],
                },
            };
        }, {})
    );

const dates2 = groupByKey(
    events.filter((event) => event.affected_type),
    "from"
)
    .sort((a, b) => new Date(a.from) - new Date(b.from))
    .map((item) => {
        const affectedTypes = groupByKey(item.data, "affected_type").map(
            (el) => {
                const obj = {
                    affected_type: {
                        id: +el.affected_type[0],
                        type: AFFECTED_TYPES[+el.affected_type[0]],
                    },
                    affected_number: el.data
                        .map((num) => +num.affected_number)
                        .flat()
                        .reduce((a, b) => a + b, 0),
                    locations: el.data
                        .filter((item) => item.lat && item.lon)
                        .map(({ lat, lon }) => ({
                            lat,
                            lon,
                        })),
                };
                return obj;
            }
        );

        const total = affectedTypes.reduce(
            (acc, curr) => ({
                affected_number: acc.affected_number + curr.affected_number,
                locations: [...acc.locations, ...curr.locations],
            }),
            {
                affected_number: 0,
                locations: [],
            }
        );

        const allTypes = {
            from: item.from,
            affectedTypes,
            total,
        };

        return allTypes;
    });

function setSelectedTimeline(number) {
    selectedTimeline = number;
    setAffectedTypesValues(timelineDates[selectedTimeline]);
}

function createTimeline(lang) {
    timeline.innerHTML = "";
    timelineDates.forEach((date, idx) => {
        let options = {
            day: "numeric",
            month: "short",
            year: "numeric",
        };
        const formattedDate = new Intl.DateTimeFormat(
            `${lang}`,
            options
        ).format(new Date(date.from));

        const div = document.createElement("div");
        div.id = `${idx}`;
        div.classList.add("timeline__bar");
        div.setAttribute("data-text", formattedDate);
        div.addEventListener("click", () => {
            setSelectedTimeline(idx);
            pause();
        });
        div.style.height = `${date.total.affected_number}px`;
        timeline.appendChild(div);
    });
}

const togglePlay = (e) => {
    e.preventDefault();
    isPlayed = !isPlayed;
    button.classList.toggle("pause");
    isPlayed ? play() : pause();
};

button.addEventListener("click", togglePlay);

function play() {
    isPlayed = true;
    interval = setInterval(() => {
        selectedTimeline++;
        setSelectedTimeline(selectedTimeline);
        if (selectedTimeline == timelineDates.length || !isPlayed) {
            clearInterval(interval);
        }
    }, 1000);
}

function pause() {
    isPlayed = false;
    window.clearInterval(interval);
}
