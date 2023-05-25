<template>
  <section class="assist">
    <form class="as-form">
      <h2 class="as-heading">How can I help you?</h2>
      <section class="checkbox-wrapper">
        <p class="p-checkbox">
          <input
            type="checkbox"
            :value="value.assist"
            @input="update('assist', $event.target.checked, 'UI Design')"
          />
          <span>UI Design</span>
        </p>
        <p class="p-checkbox">
          <input
            type="checkbox"
            :value="value.assist"
            @input="update('assist', $event.target.checked, 'Marketing Site')"
          />
          <span>Marketing Site</span>
        </p>
        <p class="p-checkbox">
          <input
            type="checkbox"
            :value="value.assist"
            @input="update('assist', $event.target.checked, 'UI Development')"
          />
          <span>UI Development</span>
        </p>
        <p class="p-checkbox">
          <input
            type="checkbox"
            :value="value.assist"
            @input="update('assist', $event.target.checked, 'Grab a beer')"
          />
          <span>Grab a beer</span>
        </p>
      </section>
    </form>
  </section>
</template>

<script>
export default {
  name: "Assist",
  props: ["value"],
  emits: ["update:value"],
  methods: {
    update(key, check, value) {
      if (check) {
        this.$emit("update:value", {
          ...this.value,
          [key]: [...this.value[key], value],
        });
      } else {
        const removeAssist = this.value.assist.filter((item) => item !== value);
        this.$emit("update:value", {
          ...this.value,
          [key]: [...removeAssist],
        });
      }
    },
  },
};
</script>

<style scoped>
.assist {
  width: 80%;
}
.as-heading {
  text-align: center;
  margin-bottom: 1rem;
}
.p-checkbox {
  padding: 0.6rem;
  font-size: 1.05rem;
}
.p-checkbox span {
  margin-left: 0.6rem;
}
</style>
