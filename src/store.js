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
        currentQuestionID: null,
        currentThemeID: null,

        scoreTemplate: {}
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

        setCurrentQuestion(state, q) {
            state.currentQuestionID = q;
        },

        firstQuestion(state) {
            state.currentQuestionID = state.quiz.themes[state.currentThemeID].questions[0];  
        },

        setCurrentTheme(state, t) {
            state.currentThemeID = t;
        }
    },

    actions: {
        setupScoreTemplate({state}) {
            const quiz = state.quiz;
            let scoreTemplate = state.scoreTemplate;
            let questions = {};

            for (const index in quiz.questions) {
                questions[index] = 0;
            }

            scoreTemplate["questions"] = questions;
            scoreTemplate["total"] = 0;
        },

        createTeam({ state, commit }, team) {
            const scoreTemplate = state.scoreTemplate;

            team["score"] = Object.assign({}, scoreTemplate);

            commit("pushTeam", team);
        },

        nextQuestion({ state, commit, getters }) {
            const theme = state.quiz.themes[state.currentThemeID];
            const currentQIndex = getters.currentQuestionIndex;
            const nextQ = theme.questions[currentQIndex + 1];

            commit("setCurrentQuestion", nextQ);
        },

        previousQuestion({ state, commit, getters }) {
            const theme = state.quiz.themes[state.currentThemeID];
            const currentQIndex = getters.currentQuestionIndex;
            const prevQ = theme.questions[currentQIndex - 1];

            commit("setCurrentQuestion", prevQ);
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
            const currentTheme = state.currentThemeID;
            const currentIndex = state.quiz.flow.indexOf(currentTheme);

            return currentIndex;
        },
        currentQuestionIndex(state) {
            const currentTheme = state.currentThemeID;
            const currentQuestion = state.currentQuestionID;
            const currentIndex = state.quiz.themes[currentTheme].questions.indexOf(currentQuestion);

            return currentIndex;
        },
        currentTheme(state) {
            return state.quiz.themes[state.currentThemeID];
        },

        currentQuestion(state) {
            return state.quiz.questions[state.currentQuestionID];
        },

        currentThemeQuestions(state) {
            const currentTheme = state.quiz.themes[state.currentThemeID];
            let currentQuestions = [];

            for (let i = 0; i < currentTheme.questions.length; i++) {
                const q = currentTheme.questions[i];
                currentQuestions.push(state.quiz.questions[q]);
            }

            return currentQuestions;
        }
    }
};