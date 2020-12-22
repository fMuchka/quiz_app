import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";

import QuestionSlide from "../src/pages/QuestionSlide.vue";
import mainStore from "../src/store.js";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("QuestionSlide Page:", () => {
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

        mainStore.state.currentThemeID = "t1";
        mainStore.state.currentQuestionID = "q1";

        store = new Vuex.Store(mainStore);
    });
    
    describe("has proper store values", () => {
        it("question text", async () => {
            const wrapper = mount(QuestionSlide, {
                localVue,
                store,
            });
            
            expect(wrapper.vm.questionText).toBe(store.getters.currentQuestion.text);
        });

        it("theme label", async () => {
            const wrapper = mount(QuestionSlide, {
                localVue,
                store,
            });
   
            expect(wrapper.vm.themeLabel).toBe(store.getters.currentTheme.text);
        });

        it("question identity", async () => {
            const wrapper = mount(QuestionSlide, {
                localVue,
                store,
            });
   
            expect(wrapper.vm.questionIdentity.includes(1)).toBe(true);
        });

        it("points info", async () => {
            const wrapper = mount(QuestionSlide, {
                localVue,
                store,
            });
   
            expect(wrapper.vm.pointsInfo.points).toBe(store.getters.currentQuestion.points.max);
            expect(wrapper.vm.pointsInfo.step).toBe(store.getters.currentQuestion.points.increment);
        });
    })
})