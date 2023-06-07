<template>
  <section class="assist">
    <form class="as-form">
      <h2 class="as-heading">How can I help you?</h2>
      <section class="checkbox-wrapper">
        <p class="p-checkbox">
          <input
            type="checkbox"
            :value="$store.state.profile.assist"
            @input="setProfileVal($event.target.checked, 'UI Design')"
          />
          <span>UI Design</span>
        </p>
        <p class="p-checkbox">
          <input
            type="checkbox"
            :value="$store.state.profile.assist"
            @input="setProfileVal($event.target.checked, 'Marketing Site')"
          />
          <span>Marketing Site</span>
        </p>
        <p class="p-checkbox">
          <input
            type="checkbox"
            :value="$store.state.profile.assist"
            @input="setProfileVal($event.target.checked, 'UI Development')"
          />
          <span>UI Development</span>
        </p>
        <p class="p-checkbox">
          <input
            type="checkbox"
            :value="$store.state.profile.assist"
            @input="setProfileVal($event.target.checked, 'Grab a beer')"
          />
          <span>Grab a beer</span>
        </p>
      </section>
    </form>
  </section>
</template>

<script>
import { useStore } from "vuex";

// import { computed } from "vue"
export default {
  name: "Assist",
  props: ["value", "assist"],
  emits: ["update:value", "update:assist"],
  methods: {
    // update(key, check, value) {
    //   if (check) {
    //     this.$emit("update:value", {
    //       ...this.value,
    //       [key]: [...this.value[key], value],
    //     })
    //   } else {
    //     const removeAssist = this.value.assist.filter((item) => item !== value)
    //     this.$emit("update:value", {
    //       ...this.value,
    //       [key]: [...removeAssist],
    //     })
    //   }
    // },
  },
  setup() {
    const store = useStore();
    const setProfileVal = (check, value) => {
      if (check) {
        store.dispatch("setProfileVals", {
          type: "assist",
          value: [...store.state.profile.assist, value],
        });
        // emit("update:assist", [...props.value["assist"], value]);
      } else {
        const removeAssist = store.state.profile.assist.filter(
          (item) => item !== value
        );
        store.dispatch("setProfileVals", {
          type: "assist",
          value: [...removeAssist],
        });
        // emit("update:assist", [...removeAssist]);
      }
    };
    return {
      setProfileVal,
    };
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
  padding-block: 0.6rem;
  width: 100%;
  font-size: 1.05rem;
  transform: translateX(30%);
}
.p-checkbox span {
  margin-left: 0.6rem;
}
</style>
