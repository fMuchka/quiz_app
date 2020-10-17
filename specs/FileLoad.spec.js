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

  it("should handle file upload", () => {
    const wrapper = mount(FileLoad, {
      localVue,
      store,
    });

    const event = {
      target: {
        files: [
          new File(["foo"], "testQuiz.json", {
            type: "application/json",
          }),
        ],
      },
    };

    // Mock FileReader.readAsText() to be a function that returns null
    const fileReaderSpy = jest
      .spyOn(FileReader.prototype, "readAsText")
      .mockImplementation(() => null);

    // Spy on the component’s loadFile() method
    const loadSpy = jest.spyOn(wrapper.vm, "loadFile");

    // Manually trigger the component’s onChange() method
    wrapper.vm.loadFile(event);

    // Assert that the FileReader object was called with the uploaded file
    expect(fileReaderSpy).toHaveBeenCalledWith(event.target.files[0]);

    // Assert that the component’s loadFile() method was called with the uploaded file
    expect(loadSpy).toHaveBeenCalledWith(event);
  });
});