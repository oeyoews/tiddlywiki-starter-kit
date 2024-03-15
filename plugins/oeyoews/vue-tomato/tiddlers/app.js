/*\
title: $:/plugins/oeyoews/vue-tomato/app.js
type: application/javascript
module-type: library

\*/

const { watchEffect, computed, ref, watch, onBeforeUnmount } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const app = (startup = false) => {
  const component = {
    setup() {
      const defaultMinutes = 25;
      const minutes = ref(defaultMinutes);
      const seconds = ref(0);
      const isRunning = ref(false);
      let timerInterval = null;

      const startTimer = () => {
        if (!isRunning.value) {
          isRunning.value = true;
          timerInterval = setInterval(() => {
            if (seconds.value > 0) {
              seconds.value--;
            } else if (minutes.value > 0) {
              seconds.value = 59;
              minutes.value--;
            } else {
              clearInterval(timerInterval);
              isRunning.value = false;
              minutes.value = defaultMinutes;
              seconds.value = 0;

              $tw.modal.display('$:/plugins/oeyoews/vue-tomato/modal/done');
            }
          }, 1000);
        }
      };

      const pauseTimer = () => {
        clearInterval(timerInterval);
        isRunning.value = false;
        console.log(isRunning.value, timerInterval);
      };

      const resetTimer = () => {
        clearInterval(timerInterval);
        minutes.value = defaultMinutes;
        seconds.value = 0;
        isRunning.value = false;
      };

      const adjustTime = (minutesToAdd) => {
        if (!isRunning.value) {
          minutes.value += minutesToAdd;
          if (minutes.value < 0) {
            minutes.value = 0;
          }
        }
      };

      watch(isRunning, (newValue) => {
        if (!newValue && timerInterval) {
          clearInterval(timerInterval);
        }
      });

      const SECONDS = ref(seconds.value);
      const MINUTES = ref(minutes.value);

      watchEffect(() => {
        if (seconds.value < 10) {
          SECONDS.value = String(seconds.value).padStart(2, '0');
        } else {
          SECONDS.value = seconds.value;
        }
        if (minutes.value < 10) {
          MINUTES.value = String(minutes.value).padStart(2, '0');
        } else {
          MINUTES.value = minutes.value;
        }
      });

      onBeforeUnmount(() => {
        clearInterval(timerInterval);
      });

      return {
        SECONDS,
        MINUTES,
        minutes,
        seconds,
        isRunning,
        startTimer,
        pauseTimer,
        resetTimer,
        adjustTime
      };
    },

    mounted() {
      if (startup) {
        this.startTimer();
      }
    },

    template: getTemplate('$:/plugins/oeyoews/vue-tomato/templates/app.vue'),

    components: {
      Button: require('./components/Button.js')
    }
  };

  return component;
};

module.exports = app;
