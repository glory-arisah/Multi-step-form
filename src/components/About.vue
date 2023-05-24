<template>
  <section class="about-company">
    <form class="ac-form">
      <h2 class="ac-heading">About your company</h2>
      <textarea
        class="ac-form-textarea"
        rows="9"
        placeholder="Tell us a bit about your organization."
      ></textarea>
    </form>
  </section>
</template>

<script>
export default {
  name: "About",
};
</script>

<style scoped>
.about-company {
  width: 80%;
  /* margin: 2.5rem 0.5rem 2rem 0.5rem; */
}

.ac-heading {
  text-align: center;
  margin-bottom: 1rem;
}

.ac-form {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}
.ac-form-textarea {
  border-radius: 0.5rem;
  padding: 0.5rem 0.9rem;
  border-radius: 0.6rem;
  border: 1.2px solid #c9c9c9;
  font-size: 0.9rem;
  color: #777575;
  font-weight: 300;
  resize: none;
}

.ac-form-textarea:focus,
.ac-form-textarea:hover {
  outline: none;
  border: 1.2px solid #7033c5;
  transition: border 300ms;
}
</style>
