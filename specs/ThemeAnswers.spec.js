import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";

import ThemeAnswers from "../src/pages/ThemeAnswers.vue"
import mainStore from "../src/store.js";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ThemeAnswers Page:", () => {
  let store;

    beforeEach(() => {
        let testQuiz = {
            "theme": [
                {
                    "question": [
                        {
                            "text": "Poznej seriál",
                            "media": "..//media//Firefly Opening Theme.mp3",
                            "answer": "Firefly",
                            "points": 1,
                            "step": 1,
                            "extra_info": ""
                        },
                        {
                            "text": "Poznej seriál",
                            "media": "..//media//Vikings Intro HD.mp3",
                            "answer": "Vikings",
                            "points": 1,
                            "step": 1,
                            "extra_info": ""
                        },
                        {
                            "text": "Poznej seriál",
                            "media": "..//media//Comeback znělka 1.mp3",
                            "answer": "Comeback",
                            "points": 1,
                            "step": 1,
                            "extra_info": ""
                        },
                        {
                            "text": "Poznej seriál",
                            "media": "..//media//Pojišťovna Štěstí.mp3",
                            "answer": "Pojišťovna štěstí",
                            "points": 1,
                            "step": 1,
                            "extra_info": ""
                        },
                        {
                            "text": "Poznej seriál",
                            "media": "..//media//Narcos - Opening Credits - Netflix [HD].mp3",
                            "answer": "Narcos",
                            "points": 1,
                            "step": 1,
                            "extra_info": ""
                        }
                    ],
                    "title": "Seriálové znělky"
                },
                {
                    "question": [
                        {
                            "text": "Tento seriál je o chlápkovi, který skoro deset let mučí své děti vyprávěním šílených detailů ze svého mládí, aby jim popsal ženu svého života.",
                            "media": "..//media//06.jpg",
                            "answer": "How I Met Your Mother",
                            "points": 1,
                            "step": 1,
                            "extra_info": ""
                        },
                        {
                            "text": "Poznej seriál: 'Můj bože, zabili Kennyho!' 'Vy parchanti!'",
                            "media": "",
                            "answer": "South Park",
                            "points": 1,
                            "step": 1,
                            "extra_info": ""
                        },
                        {
                            "text": "Poznej seriál podle ukázky",
                            "media": "..//media//3B3.mp4",
                            "answer": "Gilmorova děvčata",
                            "points": 1,
                            "step": 1,
                            "extra_info": ""
                        },
                        {
                            "text": "Poznej seriál podle obrázku",
                            "media": "..//media//09.png",
                            "answer": "Star Gate: SG-1",
                            "points": 1,
                            "step": 1,
                            "extra_info": ""
                        },
                        {
                            "text": "Poznej seriál podle ukázky",
                            "media": "..//media//3B5.mp4",
                            "answer": "Breaking Bad",
                            "points": 1,
                            "step": 1,
                            "extra_info": ""
                        }
                    ],
                    "title": "Poznej seriál"
                }
            ]
        };
        mainStore.state.quiz = testQuiz;
        store = new Vuex.Store(mainStore);
    });
    
    describe("Displays proper information:", () => {
        it("theme label", () => {
            const wrapper = mount(ThemeAnswers, {
                localVue,
                store
            });

            const currentTheme = store.getters.currentTheme;
            
            expect(wrapper.vm.themeLabel).toBe(currentTheme.title);
        });

        it("theme questions", () => {
            const wrapper = mount(ThemeAnswers, {
                localVue,
                store
            });

            const currentThemeQuestions = store.getters.currentTheme.question;
            
            expect(wrapper.vm.questions).toBe(currentThemeQuestions);
        });
    });
});