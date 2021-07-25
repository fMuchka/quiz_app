<template>
  <div id="background" :class="arrowStyle + ' ' + modeStyle" @click="move()">
    <span> {{ nextPageLabel }} </span>
    <div id="arrow"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isForward: this.$attrs.isForward,
      nextPageLabel: this.$attrs.nextPageLabel,
      qMode: this.$attrs.qMode,
    };
  },

  computed: {
    arrowStyle() {
      if (this.isForward === true) {
        return "right";
      } else {
        return "left";
      }
    },
    modeStyle() {
      if (this.qMode === true) {
        return "qMode";
      } else {
        return "setupMode";
      }
    },
  },

  methods: {
    move() {
      const disabled = this.$attrs.disabled;

      if (disabled !== true) {
        const nextPage = this.$attrs.nextPage;

        if (nextPage !== undefined) {
          this.$router.push({
            name: nextPage,
          });
        } else {
          const questionIndex = this.$store.getters.currentQuestionIndex;
          const nOfQuestions = this.$store.getters.currentTheme.questions
            .length;

          if (this.isForward) {
            if (questionIndex === nOfQuestions - 1) {
              const currentThemeID = this.$store.state.currentThemeID;
              this.$store.commit("markThemeCompleted", currentThemeID);

              this.$router.push({
                name: "themeanswers",
              });
            } else {
              this.$store.dispatch("nextQuestion");
            }
          } else {
            if (questionIndex === 0) {
              this.$router.push({
                name: "themesoverview",
              });
            } else {
              this.$store.dispatch("previousQuestion");
            }
          }
        }
      }
    },
  },
};
</script>

<style>
#arrow {
  width: 0;
  height: 0;
  display: flex;
  position: absolute;
  top: 12%;
}

.left > #arrow {
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-right: 40px solid var(--main-color);
  right: 5px;
}

.right > #arrow {
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 40px solid var(--main-color);
  left: 5px;
}

#background {
  top: 50%;
  height: 50px;
  background-color: var(--secondary-color);
  cursor: pointer;
  transition: 0.5s ease all;
  filter: drop-shadow(2px 2px 2px black);
  border: 1px inset black;
}

#background:hover {
  filter: brightness(0.8);
}

#background.right:hover > #arrow {
  border-left-color: 003049;
}

#background.left:hover > #arrow {
  border-right-color: 003049;
}

#background.right {
  right: 0;
  border-radius: 5px 0 0 5px;
}

#background.left {
  left: 0;
  border-radius: 0 5px 5px 0;
}

.setupMode {
  position: relative;
  margin: auto;
  margin-top: 1%;
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
}

.setupMode #arrow {
  display: none;
}

.qMode {
  position: fixed;
  width: 50px;
}

#background span {
  color: white;
  font-size: 26px;
}

#background[disabled] {
  filter: grayscale(1);
  opacity: 0.6;
}
</style>