<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { capitalize } from "vue";

interface ValidCheckTypes {
  blank: boolean;
  length?: boolean;
  format?: boolean;
}

interface UserValidProps {
  fullName: ValidCheckTypes;
  email: ValidCheckTypes;
  phone: ValidCheckTypes;
  placeOfBirth: ValidCheckTypes;
}

export default defineComponent({
  data() {
    return {
      showValidErrors: {
        fullName: { blank: false, length: false },
        email: { blank: false, length: false, format: false },
        phone: { blank: false, format: false },
        placeOfBirth: { blank: false },
      } as UserValidProps,
    };
  },
  computed: {
    fullName() {
      return this.$store.state.profile.fullName;
    },
    email() {
      return this.$store.state.profile.email;
    },
    phone() {
      return this.$store.state.profile.phone;
    },
    placeOfBirth() {
      return this.$store.state.profile.placeOfBirth;
    },
  },
  methods: {
    // UTILITIES
    capitalizeName(value: string) {
      return value
        .split(" ")
        .map((name) => capitalize(name))
        .join(" ");
    },
    // VALIDATIONS
    handleInputFormat(field: keyof UserValidProps) {
      let fullName,
        placeOfBirth = "";
      const emailRegex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
      const phoneRegex =
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
      switch (field) {
        case "fullName":
          // prevent users from inputting punctuation characters
          fullName = this.fullName.replace(
            /[0-9_*!<>&;/\\[\]{}()?'":;%@^]+\s*$/g,
            ""
          );
          fullName = this.capitalizeName(this.fullName);
          this.$store.dispatch("setProfileVals", {
            type: "fullName",
            value: fullName,
          });
          break;
        case "email":
          emailRegex.test(this.email)
            ? (this.showValidErrors.email.format = false)
            : (this.showValidErrors.email.format = true);
          break;
        case "phone":
          phoneRegex.test(this.phone)
            ? (this.showValidErrors.phone.format = false)
            : (this.showValidErrors.phone.format = true);
          break;
        case "placeOfBirth":
          // prevent users from inputting punctuation characters
          placeOfBirth = this.placeOfBirth.replace(
            /[0-9_*!<>&;/\\[\]{}()?'":;%@^]+\s*$/g,
            ""
          );
          this.$store.dispatch("setProfileVals", {
            type: "placeOfBirth",
            value: placeOfBirth,
          });
          break;
      }
    },
    handleBlankValidation(field: keyof UserValidProps) {
      this.$store.state.profile[field].trim().length === 0 &&
        (this.showValidErrors[field].blank = true);
    },
    liveValidationUtility(field: keyof UserValidProps, condition: boolean) {
      if (this.showValidErrors[field].length !== undefined) {
        condition
          ? (this.showValidErrors[field].length = true)
          : (this.showValidErrors[field].length = false);
      }
    },
    handleLiveValidations(field: keyof UserValidProps, event: Event) {
      const { target } = event;
      const TargetType = target as HTMLInputElement;
      this.$store.dispatch("setProfileVals", {
        type: field,
        value: TargetType.value,
      });
      switch (field) {
        case "fullName":
          this.showValidErrors.fullName.blank = false;
          this.handleInputFormat("fullName");
          this.liveValidationUtility(
            "fullName",
            TargetType.value.trim().length < 8 ||
              TargetType.value.trim().length > 35
          );
          break;
        case "email":
          this.showValidErrors.email.blank = false;

          this.handleInputFormat("email");
          this.liveValidationUtility(
            "email",
            TargetType.value.trim().length < 5 ||
              TargetType.value.trim().length > 35
          );
          break;
        case "phone":
          ``;
          this.showValidErrors.phone.blank = false;
          this.handleInputFormat("phone");
          break;
        case "placeOfBirth":
          this.showValidErrors.placeOfBirth.blank = false;
          this.handleInputFormat("placeOfBirth");
          break;
      }
    },
    // SUBMISSION
    setProfileVal(type: keyof UserValidProps, e: Event) {
      const { target } = e;
      const TargetType = target as HTMLInputElement;
      const value = TargetType.value;
      this.$store.dispatch("setProfileVals", { type, value });
    },
    setStoreErrors() {
      if (
        Object.values(this.showValidErrors).some((value: ValidCheckTypes) => {
          return value.blank || value.format || value.length;
        })
      ) {
        this.$store.dispatch("hasErrors", true);
        return;
      }
      this.$store.dispatch("hasErrors", false);
    },
    handleSubmit() {
      Object.keys(this.showValidErrors).forEach((field) =>
        this.handleBlankValidation(field as keyof UserValidProps)
      );
      if (
        Object.values(this.showValidErrors).some((value: ValidCheckTypes) => {
          return value.blank || value.format || value.length;
        })
      ) {
        this.$store.dispatch("hasErrors", true);
        return;
      }
      this.$store.dispatch("hasErrors", false);
      this.$store.dispatch("next");
    },
  },
});
</script>

<style scoped></style>
