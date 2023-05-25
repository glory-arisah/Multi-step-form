<template>
  <section class="budget">
    <form class="bu-form">
      <h2 class="bu-heading">Specify your budget</h2>
      <div class="slider">
        <input
          type="range"
          min="1"
          max="100"
          :value="value.budget"
          @input="update('budget', $event.target.value)"
        />
        <p>${{ value.budget }}</p>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: "Budget",
  data() {
    return {
      rangeValue: 10,
    };
  },
  props: ["value"],
  emits: ["update:value"],
  methods: {
    update(key, value) {
      this.$emit("update:value", { ...this.value, [key]: value });
    },
  },
};
</script>

<style scoped>
.budget {
  width: 80%;
}

.bu-heading {
  margin-bottom: 2rem;
  text-align: center;
}
/* slider styling */
.slider {
  height: 70px;
  background: #fcfcfc;
  border-radius: 20px;
  display: flex;
  align-items: center;
}
.slider p {
  font-weight: 600;
  padding-left: 2rem;
}
.slider input[type="range"] {
  /* -webkit-appearance:none !important; */
  width: 420px;
  height: 2px;
  background: black;
  border: none;
  outline: none;
}
.slider input[type="range"]::-webkit-slider-thumb {
  /* -webkit-appearance: none !important; */
  width: 30px;
  height: 30px;
  background: black;
  border: 2px solid black;
  border-radius: 50%;
  cursor: pointer;
}
.slider input[type="range"]::-webkit-slider-thumb:hover {
  background: black;
}
</style>
