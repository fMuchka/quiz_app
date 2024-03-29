import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";

import TeamCreate from "../src/pages/TeamCreate.vue";
import mainStore from "../src/store.js";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("TeamCreate Page:", () => {
  let store;
  // had to simulate store, otherwise would return error of undefined
  // guess it makes sense...
  beforeEach(() => {
    store = new Vuex.Store(mainStore);

  });

  it("matches snapshot", () => {
    const wrapper = mount(TeamCreate, {
      localVue,
      store,
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("handles removing team inputs", () => {
    const wrapper = mount(TeamCreate, {
      localVue,
      store,
    });

    const testColor = store.getters.color;

    wrapper.vm.teamList.push({ id: 'test', color: testColor });
    expect(wrapper.vm.teamList.length).toBe(1);

    wrapper.vm.removeTeamInput(0, testColor.id);
    expect(wrapper.vm.teamList.length).toBe(0);
  });

  describe("Add button:", () => {
    it("creates team input on click", () => {
      const wrapper = mount(TeamCreate, {
        localVue,
        store
      });

      const button = wrapper.find("button");
      const addSpy = jest.spyOn(wrapper.vm, "addTeamInput");

      const testColor = store.getters.color;

      expect(wrapper.vm.teamList.length).toBe(0);
      button.trigger('click');
      expect(addSpy).toHaveBeenCalled();

      expect(wrapper.vm.teamList.length).toBe(1);
      expect(wrapper.vm.teamList[0].color).toBe(testColor);

      expect(store.state.colorList[0].used).toBe(true);
    });

    it("disables when all inputs created", () => {
      const wrapper = mount(TeamCreate, {
        localVue,
        store
      });

      const button = wrapper.find("button");
      expect(wrapper.vm.isAddDisabled).toBe(false);

      const colorListLength = store.getters.colorListLength;

      for (let i = 0; i < colorListLength; i++) {
        button.trigger('click');
        expect(store.state.colorList[i].used).toBe(true);
      }

      expect(wrapper.vm.isAddDisabled).toBe(true);
    });
  });
});
