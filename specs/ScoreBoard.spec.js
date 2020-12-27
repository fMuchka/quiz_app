import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";

import ScoreBoard from "../src/pages/ScoreBoard.vue";
import mainStore from "../src/store.js";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ScoreBoard page:", () => {
    let store;

     beforeEach(() => {
         mainStore.state.quiz = {
            "flow": [
                "t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9", "t10"
            ],

            "themes": {
                "t1": {
                    "text": "Odhadování",
                    "questions": ["q1", "q2", "q3", "q4", "q5"]
                },
                "t2": {
                    "text": "Savci",
                    "questions": ["q6", "q7", "q8", "q9", "q10"]
                },
                "t3": {
                    "text": "Sport",
                    "questions": ["q11", "q12", "q13", "q14", "q15"]
                },
                "t4": {
                    "text": "Trilogie",
                    "questions": ["q16", "q17", "q18", "q19", "q20"]
                },
                "t5": {
                    "text": "Zeměpis",
                    "questions": ["q21", "q22", "q23", "q24", "q25"]
                },
                "t6": {
                    "text": "Historie",
                    "questions": ["q26", "q27", "q28", "q29", "q30"]
                },
                "t7": {
                    "text": "Zvířata",
                    "questions": ["q31", "q32", "q33", "q34", "q35"]
                },
                "t8": {
                    "text": "Disney",
                    "questions": ["q36", "q37", "q38", "q39", "q40"]
                },
                "t9": {
                    "text": "Sex v přírodě",
                    "questions": ["q41", "q42", "q43", "q44", "q45"]
                },
                "t10": {
                    "text": "Praha",
                    "questions": ["q46", "q47", "q48", "q49", "q50"]
                }
            },
            "questions": {
                "q1": {
                    "text": "V jakém roce proběhla první moderní zimní olympiáda?",
                    "answer": { "text": "1924", "type": "Number Input", "file": null },
                    "media": null,
                    "points": { "max": 1, "increment": 1 }
                },
                "q2": {
                    "text": "Kolik obyvatel má Plzeňský kraj?",
                    "answer": { "text": "584 672", "type": "Number Input", "file": null },
                    "media": null,
                    "points": { "max": 1, "increment": 1 }
                },
                "q3": {
                    "text": "Kolik obyvatel má Evropská Unie?",
                    "answer": { "text": "134,4 km", "type": "Number Input", "file": null },
                    "media": null,
                    "points": { "max": 1, "increment": 1 }
                },
                "q4": {
                    "text": "Jak daleko od Prahy (vzdušnou čarou) se nachází Špičák?",
                    "answer": { "text": "584 672", "type": "Number Input", "file": null },
                    "media": null,
                    "points": { "max": 1, "increment": 1 }
                },
                "q5": {
                    "text": "Kolik krajů má více jak 1 milion obyvatel?",
                    "answer": { "text": "4", "type": "Number Input", "file": null },
                    "media": null,
                    "points": { "max": 1, "increment": 1 }
                },
                "q6": {
                    "text": "Který živočich je v současnosti považován za největšího savce?",
                    "answer": { "text": "plejtvák obrovský", "type": "Text Input", "file": null },
                    "media": null,
                    "points": { "max": 1, "increment": 0.5 }
                },
                "q7": {
                    "text": "Který savec je považován za nejpomalejšího?",
                    "answer": { "text": "lenochod tříprstý", "type": "Text Input", "file": null },
                    "media": null,
                    "points": { "max": 1, "increment": 0.5 }
                },
                "q8": {
                    "text": "Kde na světě bychom mohli najít ‘upíra obecného’?",
                    "answer": { "text": "Střední a Jižní Amerika", "type": "Text Input", "file": null },
                    "media": null,
                    "points": { "max": 1, "increment": 1 }
                },
                "q9": {
                    "text": "Jakého savce má na své vlajce Anguilla?",
                    "answer": { "text": "delfín", "type": "Text Input", "file": null },
                    "media": null,
                    "points": { "max": 1, "increment": 1 }
                },
                "q10": {
                    "text": "Lidský mozek je v přepočtu na celkovou hmotnost našeho těla považován za největší mezi savci. Náš mozek tvoří cca 2% naší hmotnosti. Kolik procent váhy tvoří mozek delfína skákavého, považovaného za druhého nejchytřejšího savce na světě?",
                    "answer": { "text": "20%", "type": "Number Input", "file": null },
                    "media": null,
                    "points": { "max": 1, "increment": 1 }
                }
            },
            "mediaFiles": {
                "m1": "./media/picture01.png",
                "m2": "./media/sound01.mp3",
                "m3": "./media/video01.mp4"
            }
         };

         mainStore.state.teams = [{ "label": "Team Secret", "color": "red", "score": { "questions": { "q1": 1, "q2": 1, "q3": 1, "q4": 1, "q5": 0, "q6": 0, "q7": 0.5, "q8": 1, "q9": 0, "q10": 1 }, "themes": { "t1": 0, "t2": 0, "t3": 0, "t4": 0, "t5": 0, "t6": 0, "t7": 0, "t8": 0, "t9": 0, "t10": 0 }, "total": 6.5 } }, { "label": "Team Liquid", "color": "blue", "score": { "questions": { "q1": 1, "q2": 0, "q3": 1, "q4": 0, "q5": 1, "q6": 0, "q7": 0.5, "q8": 0, "q9": 1, "q10": 0 }, "themes": { "t1": 0, "t2": 0, "t3": 0, "t4": 0, "t5": 0, "t6": 0, "t7": 0, "t8": 0, "t9": 0, "t10": 0 }, "total": 4.5 } }, { "label": "OG", "color": "green", "score": { "questions": { "q1": 0, "q2": 1, "q3": 0, "q4": 1, "q5": 1, "q6": 0, "q7": 0.5, "q8": 0, "q9": 1, "q10": 0 }, "themes": { "t1": 0, "t2": 0, "t3": 0, "t4": 0, "t5": 0, "t6": 0, "t7": 0, "t8": 0, "t9": 0, "t10": 0 }, "total": 4.5 } }, { "label": "Natus Vincere", "color": "yellow", "score": { "questions": { "q1": 0, "q2": 1, "q3": 1, "q4": 0, "q5": 0, "q6": 0.5, "q7": 0.5, "q8": 1, "q9": 1, "q10": 1 }, "themes": { "t1": 0, "t2": 0, "t3": 0, "t4": 0, "t5": 0, "t6": 0, "t7": 0, "t8": 0, "t9": 0, "t10": 0 }, "total": 6 } }, { "label": "Team Nigma", "color": "purple", "score": { "questions": { "q1": 1, "q2": 0, "q3": 1, "q4": 1, "q5": 0, "q6": 0, "q7": 0.5, "q8": 0, "q9": 1, "q10": 1 }, "themes": { "t1": 0, "t2": 0, "t3": 0, "t4": 0, "t5": 0, "t6": 0, "t7": 0, "t8": 0, "t9": 0, "t10": 0 }, "total": 5.5 } }, { "label": "Gambit", "color": "brown", "score": { "questions": { "q1": 0, "q2": 1, "q3": 0, "q4": 1, "q5": 1, "q6": 0, "q7": 0.5, "q8": 0, "q9": 1, "q10": 1 }, "themes": { "t1": 0, "t2": 0, "t3": 0, "t4": 0, "t5": 0, "t6": 0, "t7": 0, "t8": 0, "t9": 0, "t10": 0 }, "total": 5.5 } }];
         
         mainStore.state.currentThemeID = "t1";

         store = new Vuex.Store(mainStore);
     });
    
    
    it("Computed properties match store", () => {
        const wrapper = mount(ScoreBoard, {
            localVue,
            store,
            stubs: ["MiniChart"]
        });        

        const wrapper_teams = wrapper.vm.teams;
        const store_teams = wrapper.vm.$store.state.teams;

        expect(wrapper_teams).toBe(store_teams);

        const wrapper_themes = wrapper.vm.themes;
        const store_themes = wrapper.vm.$store.state.quiz.themes;

        expect(wrapper_themes).toBe(store_themes);

        const wrapper_questions = wrapper.vm.questions;
        const store_questions = wrapper.vm.$store.state.quiz.questions;

        expect(wrapper_questions).toBe(store_questions);

        const wrapper_currentTheme = wrapper.vm.currentTheme;
        const store_currentTheme = wrapper.vm.$store.getters.currentTheme;

        expect(wrapper_currentTheme).toBe(store_currentTheme);

        const wrapper_currentThemeID = wrapper.vm.currentThemeID;
        const store_currentThemeID = wrapper.vm.$store.state.currentThemeID;

        expect(wrapper_currentThemeID).toBe(store_currentThemeID);

        wrapper.vm.currentThemeID = "t2";

        expect(wrapper_currentThemeID).toBe(store_currentThemeID);

        const wrapper_chartData = wrapper.vm.chartData;
        const store_teamData = wrapper.vm.$store.getters.teamTotalScores;
        const store_teamColors = wrapper.vm.$store.getters.teamColors;
        const store_teamLabels = wrapper.vm.$store.getters.teamLabels;

        const expectedData = {
            datasets: [
                {
                    data: store_teamData,
                    label: "",
                    backgroundColor: store_teamColors
                },
            ],

            labels: store_teamLabels
        };

        expect(expectedData).toStrictEqual(wrapper_chartData);
    });
});
