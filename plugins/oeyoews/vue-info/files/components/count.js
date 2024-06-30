const { onMounted, ref } = window.Vue;

module.exports = {
  name: 'CountTo',
  props: {
    startVal: {
      type: Number,
      default: 0,
    },
    endVal: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      default: 2000,
    },
  },
  setup(props) {
    let currentVal = ref();
    if (typeof props.endVal !== 'number') {
      return {
        currentVal: props.endVal,
      };
    } else {
      currentVal.value = props.startVal;
    }
    onMounted(() => {
      const startTime = performance.now();
      const animate = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < props.duration) {
          const progress = elapsedTime / props.duration;
          currentVal.value = Math.round(
            props.startVal + (props.endVal - props.startVal) * progress,
          );
          requestAnimationFrame(animate);
        } else {
          currentVal.value = props.endVal.toLocaleString();
        }
      };
      requestAnimationFrame(animate);
    });
    return {
      currentVal,
    };
  },
  template: `<span>{{ currentVal }}</span>`,
};
