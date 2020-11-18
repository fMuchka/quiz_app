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
        store = new Vuex.Store(mainStore);
    });
    
    describe("has proper store values", () => {
        it("question text", async () => {
            const wrapper = mount(QuestionSlide, {
                localVue,
                store,
            });
   
            expect(wrapper.vm.d_questionText).toBe(store.state.quiz.theme[0].question[0].text);
        });

        it("theme label", async () => {
            const wrapper = mount(QuestionSlide, {
                localVue,
                store,
            });
   
            expect(wrapper.vm.d_themeLabel).toBe(store.state.quiz.theme[0].title);
        });

        it("question identity", async () => {
            const wrapper = mount(QuestionSlide, {
                localVue,
                store,
            });
   
            expect(wrapper.vm.d_questionIdentity).toBe(1);
        });

        it("points info", async () => {
            const wrapper = mount(QuestionSlide, {
                localVue,
                store,
            });
   
            expect(wrapper.vm.d_pointsInfo.points).toBe(store.state.quiz.theme[0].question[0].points);
            expect(wrapper.vm.d_pointsInfo.step).toBe(store.state.quiz.theme[0].question[0].step);
        });
    })
})