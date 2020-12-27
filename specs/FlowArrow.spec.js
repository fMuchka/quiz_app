import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";

import FlowArrow from "../src/components/FlowArrow.vue"
import mainStore from "../src/store.js";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("FlowArrow Component:", () => {
    let store;
    let attrs;

    beforeEach(() => {
        mainStore.state.currentThemeID = "1";
        mainStore.state.currentQuestionID = "q2";
        mainStore.state.quiz = {
            themes: {
                "0": { text: "1", questions: ["q1", "q2", "q3"] }, 
                "1": { text: "2", questions: ["q1", "q2", "q3"] },
                "2": { text: "3", questions: ["q1", "q2", "q3"] }
            },
            flow: ["0", "1", "2"],
            questions: {
                "q1": {},
                "q2": {},
                "q3": {}
            }
        };
        store = new Vuex.Store(mainStore);
    });

    it("Moves to Specific Page if needed", () => {
        const nextPageName = "testPage";
        let check = false;
        let router = {
            push: ({ name }) => {
                if (name === nextPageName) {
                    check = true;
                }
            }
        };
        
        attrs = { nextPage: nextPageName };

        const wrapper = mount(FlowArrow, {
            localVue,
            store,
            attrs,
            mocks: {
                $router: router
            }
        });

        expect(wrapper.vm.$attrs.nextPage).toBe(nextPageName);

        const moveSpy = jest.spyOn(wrapper.vm, "move");
        const arrowEl = wrapper.find("#background");

        arrowEl.trigger("click");
        expect(moveSpy).toHaveBeenCalled();

        expect(check).toBe(true);
    });

    describe("Forward direction", () => {
        it("moves to next question as expected", () => {
            attrs = { isForward: true };

            const wrapper = mount(FlowArrow, {
                localVue,
                store,
                attrs,
            });

            expect(wrapper.vm.isForward).toBe(true);
            expect(wrapper.vm.$attrs.nextPage).toBe(undefined);

            const moveSpy = jest.spyOn(wrapper.vm, "move");
            const arrowEl = wrapper.find("#background");
            const currentQuestionIndex = store.getters.currentQuestionIndex;

            arrowEl.trigger("click");
            
            expect(moveSpy).toHaveBeenCalled();
            expect(store.getters.currentQuestionIndex).toBe(currentQuestionIndex + 1);
        });

        it("moves to themes answers as expected", () => {
            let check = false;
            let router = {
                push: ({ name }) => {
                    if (name === "themeanswers") {
                        check = true;
                    }
                }
            };
            attrs = { isForward: true };

            const wrapper = mount(FlowArrow, {
                localVue,
                store,
                attrs,
                mocks: {
                    $router: router
                }
            });

            expect(wrapper.vm.isForward).toBe(true);
            expect(wrapper.vm.$attrs.nextPage).toBe(undefined);

            const moveSpy = jest.spyOn(wrapper.vm, "move");
            const arrowEl = wrapper.find("#background");

            const nOfQuestions = store.getters.currentThemeQuestions.length;

            for (let i = 0; i < nOfQuestions; i++) {
                arrowEl.trigger("click");
                expect(moveSpy).toHaveBeenCalled();
            }

            expect(check).toBe(true);
        });  
    });

    describe("Backward direction", () => {
        it("moves to previous question as expected", () => {
            attrs = { isForward: false };

            const wrapper = mount(FlowArrow, {
                localVue,
                store,
                attrs,
            });

            expect(wrapper.vm.isForward).toBe(false);
            expect(wrapper.vm.$attrs.nextPage).toBe(undefined);

            const moveSpy = jest.spyOn(wrapper.vm, "move");
            const arrowEl = wrapper.find("#background");
            const currentQuestionIndex = store.getters.currentQuestionIndex;

            arrowEl.trigger("click");
            
            expect(moveSpy).toHaveBeenCalled();
            expect(store.getters.currentQuestionIndex).toBe(currentQuestionIndex-1);
        });

        it("moves to themes overview as expected", () => {
            let check = false;
            let router = {
                push: ({ name }) => {
                    if (name === "themesoverview") {
                        check = true;
                    }
                }
            };
            attrs = { isForward: false };

            const wrapper = mount(FlowArrow, {
                localVue,
                store,
                attrs,
                mocks: {
                    $router: router
                }
            });

            expect(wrapper.vm.isForward).toBe(false);
            expect(wrapper.vm.$attrs.nextPage).toBe(undefined);

            const moveSpy = jest.spyOn(wrapper.vm, "move");
            const arrowEl = wrapper.find("#background");

            const nOfQuestions = store.getters.currentThemeQuestions.length;

            for (let i = 0; i < nOfQuestions; i++) {
                arrowEl.trigger("click");
                expect(moveSpy).toHaveBeenCalled();
            }

            expect(check).toBe(true);
        });  
    });
});