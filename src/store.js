export default {
    state: {
        quiz: null,
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
        setQuiz(state, quiz) {
            state.quiz = quiz;
        },
        pushTeam(state, team) {
            state.teams.push(team);
        },
        changeColorStatus(state, input) {
            const { id, status } = input;
            const colorList = state.colorList;

            for (let i = 0; i < colorList.length; i++) {
                if (colorList[i].id === id) {
                    colorList[i].used = status;
                    break;
                }
            }
        }
    },

    getters: {
        quiz: (state) => {
            return state.quiz;
        },
        color: (state, getters) => {
            const colors = state.colorList;
            const freeIndex = getters.nextColorIndex;

            if (freeIndex === false) {
                // no colors left
                return false;
            }

            if (freeIndex < colors.length) {
                return colors[freeIndex];
            }

        },
        nextColorIndex: (state) => {
            const colorList = state.colorList;

            for (let i = 0; i < colorList.length; i++) {
                if (colorList[i].used === false) {
                    return i;
                }
            }
            return false;
        },
        colorListLength(state) {
            return state.colorList.length;
        }
    }
};