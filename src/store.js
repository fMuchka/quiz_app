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
        ],
        isMenuHidden: true,
        currentIndexes: {
            theme: 0,
            question: 0
        }
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
        },
        hideMenu(state) {
            state.isMenuHidden = true;
        },
        showMenu(state) {
            state.isMenuHidden = false;
        },

        setCurrentQuestionIndex(state, index) {
            state.currentIndexes.question = index;
        },

        setCurrentThemeIndex(state, index) {
            state.currentIndexes.theme = index;
        },

        previousQuestion(state) {
            state.currentIndexes.question--;
        },
        nextQuestion(state) {
            state.currentIndexes.question++;
        },
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
        },
        isMenuHidden(state) {
            return state.isMenuHidden;
        },

        currentThemeIndex(state) {
            return state.currentIndexes.theme;
        },
        currentQuestionIndex(state) {
            return state.currentIndexes.question;
        },
        currentTheme(state) {
            return state.quiz.theme[state.currentIndexes.theme]
        },

        currentQuestion(state) {
            return state.quiz.theme[state.currentIndexes.theme].question[state.currentIndexes.question];
        }
    }
};