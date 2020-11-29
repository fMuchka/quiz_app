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
        mainStore.state.currentIndexes = { question: 0, theme: 0 };
        mainStore.state.quiz = { theme: [{ question: [0, 1, 2] }] };
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
            const currentQuestionIndex = store.state.currentIndexes.question;

            arrowEl.trigger("click");
            
            expect(moveSpy).toHaveBeenCalled();
            expect(store.state.currentIndexes.question).toBe(currentQuestionIndex + 1);
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

            const nOfQuestions = store.getters.currentTheme.question.length;

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

            store.state.currentIndexes.question = 2;

            const wrapper = mount(FlowArrow, {
                localVue,
                store,
                attrs,
            });

            expect(wrapper.vm.isForward).toBe(false);
            expect(wrapper.vm.$attrs.nextPage).toBe(undefined);

            const moveSpy = jest.spyOn(wrapper.vm, "move");
            const arrowEl = wrapper.find("#background");
            const currentQuestionIndex = store.state.currentIndexes.question;

            arrowEl.trigger("click");
            
            expect(moveSpy).toHaveBeenCalled();
            expect(store.state.currentIndexes.question).toBe(currentQuestionIndex-1);
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
            store.state.currentIndexes.question = 2;

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

            const nOfQuestions = store.getters.currentTheme.question.length;

            for (let i = 0; i < nOfQuestions; i++) {
                arrowEl.trigger("click");
                expect(moveSpy).toHaveBeenCalled();
            }

            expect(check).toBe(true);
        });  
    });
});