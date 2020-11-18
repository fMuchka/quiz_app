import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";

import ThemesOverview from "../src/pages/ThemesOverview.vue"
import mainStore from "../src/store.js";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ThemesOverview Page:", () => {
    let store;

    beforeEach(() => {
        mainStore.state.quiz = { theme: [{ title: "1" }, { title: "2" }, { title: "3" }] };
        store = new Vuex.Store(mainStore);
    });

    it("matches snapshot", () => {
        const wrapper = mount(ThemesOverview, {
            localVue,
            store
        });

        expect(wrapper.element).toMatchSnapshot();
    });

    it("creates Themes based on Store.state.quiz", () => {
        const wrapper = mount(ThemesOverview, {
            localVue,
            store
        });

        const testThemes = store.state.quiz.theme;
        const pageElements = wrapper.vnode.children;

        expect(pageElements.length).toBe(testThemes.length);

        for (let i = 0; i < pageElements.length; i++){
            expect(pageElements[i].children[0].text.includes(testThemes[i].title)).toBeTruthy()
        }
    });
    
    it('opens first question on click', () => {
        let check = false;
        let router = {
            push: ({ name }) => {
                if (name === "questionslide") {
                    check = true;
                }
            }
        };

        const wrapper = mount(ThemesOverview, {
            localVue,
            store,
             mocks: {
                $router: router
            }
        });
        
        const button = wrapper.find("#overviewWrapper > button:first-of-type");
        button.trigger('click');

        expect(store.state.currentIndexes.question).toBe(0);
        expect(store.state.currentIndexes.theme).toBe(0);
        expect(check).toBe(true);
    });
})