import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";

import FileLoad from "../src/pages/FileLoad.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("FileLoad Page:", () => {
  let store;

  // had to simulate store, otherwise would return error of undefined
  // guess it makes sense...
  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        quiz: null,
      },
    });
  });

  it("html structure is correct", () => {
    const wrapper = mount(FileLoad, {
      localVue,
      store,
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("has loadFile()", () => {
    expect(typeof FileLoad.methods.loadFile).toBe("function");
  });

  it("should upload file", () => {
    const wrapper = mount(FileLoad, {
      localVue,
      store,
    });

    const event = {
      target: {
        files: [
          {
            name: "testQuiz.json",
            size: 50000,
          },
        ],
      },
    };

    // Mock FileReader.readAsDataURL() to be a function that returns null
    const fileReaderSpy = jest
      .spyOn(FileReader.prototype, "readAsDataURL")
      .mockImplementation(() => null);

    // Spy on the component’s loadFile() method
    const loadSpy = jest.spyOn(wrapper.vm, "loadFile");

    // Manually trigger the component’s onChange() method
    //  wrapper.find("[name='quiz-load']").$emit("change");
    wrapper.vm.$emit("change");

    // Assert that the FileReader object was called with the uploaded image
    expect(fileReaderSpy).toHaveBeenCalledWith(event.target.files[0]);

    // Assert that the component’s loadFile() method was called with the uploaded image
    expect(loadSpy).toHaveBeenCalledWith(event.target.files[0]);
  });
});
