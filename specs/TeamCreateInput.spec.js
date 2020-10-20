import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";

import TeamCreateInput from "../src/components/TeamCreateInput.vue"

const localVue = createLocalVue();
localVue.use(Vuex);

describe("TeamCreateInput Component:", () => {
    let store;
    let props;

    beforeEach(() => {
      store = new Vuex.Store({
        state: {
          teams: [],
          colorList: [
            { id: 'red', label: 'Červený', used: false },
            { id: 'blue', label: 'Modrý', used: false },
            { id: 'green', label: 'Zelený', used: false },
            { id: 'yellow', label: 'Žlutý', used: false },
            { id: 'purple', label: 'Fialový', used: false },
            { id: 'brown', label: 'Hnědý', used: false },
          ]
        },
        mutations: {
          pushTeam(state, team) {
            state.teams.push(team);
          }
        },
        getters: {
          color: (state) => {
            const colors = state.colorList;
            const freeIndex = store.getters.nextColorIndex;

            if (freeIndex === false) {
              // no colors left
              return false;
            }

            if (freeIndex < colors.length) {
              return colors[freeIndex];
            }
          }
        }
      });
        
        props = {
            index: 0,
            team: {
                id: 0,
                color: store.state.colorList[0]
            }
        };
    });

    it('matches snapshot', () => {
        const wrapper = mount(TeamCreateInput, {
            localVue,
            store,
            propsData:  props
        });

        expect(wrapper.element).toMatchSnapshot();
    });

    it('creates with correct properties', () => {
        const wrapper = mount(TeamCreateInput, {
            localVue,
            store,
            propsData:  props
        });

        expect(wrapper.props('index')).toBe(0);
        expect(wrapper.props('team')).toStrictEqual({id: 0, color: store.state.colorList[0]});
    });

    describe('Input:', () => {
        it('has correct label', () => {
            const wrapper = mount(TeamCreateInput, {
                localVue,
                store,
                propsData: props
            });

            const label = wrapper.find('label[for="team-input"]');
            const color = wrapper.props('team').color.label;

            expect(label.element.innerHTML).toBe(color + ' tým');
        });
    });

    describe("Confirm Button:", () => {
        it('on click commits new team', () => {
            const wrapper = mount(TeamCreateInput, {
                localVue,
                store,
                propsData: props
            });
            const confirmTeamSpy = jest.spyOn(wrapper.vm, "confirmTeam");
            const input = wrapper.find('input');
            const button = wrapper.find('button[name="confirm-button"]');

            expect(store.state.teams.length).toBe(0);
        
            const testLabel = "test";

            input.setValue(testLabel);
            //button.trigger('click');
            button.element.dispatchEvent(new Event('click'))
            expect(confirmTeamSpy).toHaveBeenCalled();
            expect(store.state.teams.length).toBe(1);
            expect(store.state.teams[0]).toStrictEqual({ label: testLabel, color: wrapper.vm.color.id })
        });
    });

    describe('Delete Button', () => {
        it('emits remove() on click', () => {
            const wrapper = mount(TeamCreateInput, {
                localVue,
                store,
                propsData: props
            });
            const button = wrapper.find('button[name="delete-button"]');

            button.trigger('click');

            expect(wrapper.emitted('remove')).toBeTruthy();
        });
    });
});