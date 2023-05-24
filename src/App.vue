<template>
  <main class="main">
    <header class="header">
      <h1>Starting a new project? Let's work on it!</h1>
      <h4>
        Please fill this short form to get started, we will reach out to you
        shortly
      </h4>
    </header>
    <section class="form-container">content</section>
  </main>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #7f3adf, #90a0f9);
  color: #ffd;
}

.header {
  text-align: center;
  padding-top: 3rem;
}
.header h4 {
  margin-top: 0.8rem;
}

.form-container {
  background-color: #fff;
  border-radius: 0.8rem;
  margin: 2rem auto 0 auto;
  max-width: 65%;
  padding: 1rem;
  color: #000;
}
</style>
