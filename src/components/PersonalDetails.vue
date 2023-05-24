<template>
  <section class="personal-details">
    <form class="pd-form">
      <h2 class="pd-heading">Please fill your details</h2>
      <input class="pd-form-input" type="text" placeholder="Full name" />
      <input class="pd-form-input" type="text" placeholder="Age" />
      <input class="pd-form-input" type="text" placeholder="Phone number" />
      <input class="pd-form-input" type="text" placeholder="Place of birth" />
    </form>
  </section>
</template>

<script>
export default {
  name: "PersonalDetails",
};
</script>

<style scoped>
.personal-details {
  margin: 2.5rem 0.5rem 2rem 0.5rem;
}

.pd-heading {
  text-align: center;
  margin-bottom: 1rem;
}

.pd-form {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}
.pd-form-input {
  padding: 0.8rem 0.9rem;
  border-radius: 0.6rem;
  border: 1.2px solid #c9c9c9;
  font-size: 0.9rem;
  color: #777575;
  font-weight: 300;
}
.pd-form-input:focus {
  color: #515050;
  font-weight: 500;
  transition: all 400ms;
  -moz-transition: all 0.5s;
}
.pd-form-input:focus,
.pd-form-input:hover {
  outline: none;
  border: 1.2px solid #7033c5;
  transition: border 300ms;
}
</style>
