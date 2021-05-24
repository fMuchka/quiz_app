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

        scoreTemplate: {},

        completedThemes: {}
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
        },

        markThemeCompleted(state, key) {
            state.completedThemes[key] = true;
        }
    },

    actions: {
        setupScoreTemplate({state}) {
            const quiz = state.quiz;
            let scoreTemplate = state.scoreTemplate;
            let questions = {};
            let themes = {};

            for (const index in quiz.questions) {
                questions[index] = 0;
            }

            for (const index in quiz.themes) {
                themes[index] = 0;
            }

            scoreTemplate["questions"] = questions;
            scoreTemplate["themes"] = themes;
            scoreTemplate["total"] = 0;
        },

        createTeam({ state, commit }, team) {
            const scoreTemplate = state.scoreTemplate;

            team["score"] = JSON.parse(JSON.stringify(scoreTemplate));

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

        nextTheme({ state, commit, getters }) {
            const index = getters.currentThemeIndex;
            const id = state.quiz.flow[index + 1];

            commit("setCurrentTheme", id);
        },

        previousTheme({ state, commit, getters }) {
            const index = getters.currentThemeIndex;
            const id = state.quiz.flow[index - 1];

            commit("setCurrentTheme", id);
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
        },
        isMenuHidden(state) {
            return state.isMenuHidden;
        },

        currentThemeIndex(state) {
            const currentTheme = state.currentThemeID;
            const currentIndex = state.quiz.flow.indexOf(currentTheme);

            return currentIndex;
        },

        isLastTheme(state) {
            const currentTheme = state.currentThemeID;
            const flow = state.quiz.flow;
            const currentIndex = flow.indexOf(currentTheme);

            return (currentIndex === flow.length - 1);
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
        },

        teamLabels(state) {
            const teams = state.teams;
            let labels = [];

            for (let i = 0; i < teams.length; i++) {
                labels.push(teams[i].label);
            }

            return labels;
        },

        teamColors(state) {
            const teams = state.teams;
            let colors = [];

            for (let i = 0; i < teams.length; i++) {
                colors.push(teams[i].color);
            }

            return colors;
        },

        teamTotalScores(state) {
            const teams = state.teams;
            let totals = [];

            for (let i = 0; i < teams.length; i++) {
                totals.push(teams[i].score.total);
            }

            return totals;
        },

        teamsSortedByScore(state) {
            const teams = state.teams;
            let sorted = [];

            for (const key in teams) {
                sorted.push(teams[key]);
            }

            sorted.sort((a, b) => {
                return  b.score.total - a.score.total;
            });

            return sorted;
        },

        quizPointsMaximum(state) {
            const questions = state.quiz.questions;
            let max = 0;
            
           for (const key in questions) {
               max += questions[key].points.max;
           }

            return max;
        },

        themesQWithDummy(state) {
            const themes = state.quiz.themes;
            let withDummy = JSON.parse(JSON.stringify(themes));

            for (const theme in withDummy) {
                withDummy[theme].questions.unshift("dummy");
            }

            return withDummy;
        }
    }
};