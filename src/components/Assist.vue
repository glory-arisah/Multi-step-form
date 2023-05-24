<template>
  <section class="assist">
    <form class="as-form">
      <h2 class="as-heading">How can I help you?</h2>
      <section class="checkbox-wrapper">
        <p class="p-checkbox">
          <input type="checkbox" /> <span>UI Design</span>
        </p>
        <p class="p-checkbox">
          <input type="checkbox" /> <span>Marketing Site</span>
        </p>
        <p class="p-checkbox">
          <input type="checkbox" /> <span>UI Development</span>
        </p>
        <p class="p-checkbox">
          <input type="checkbox" /> <span>Grab a beer</span>
        </p>
      </section>
    </form>
  </section>
</template>

<script>
export default {
  name: "Assist",
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
