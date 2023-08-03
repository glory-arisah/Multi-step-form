<template>
  <section class="assist">
    <form @submit="onSubmit">
      <h2 class="as-heading">How can I help you?</h2>
      <section class="checkbox-wrapper">
        <p class="p-checkbox">
          <VField
            v-slot="{ field, handleChange }"
            name="assist"
            type="checkbox"
            :validate-on-input="true"
            value="u-d"
          >
            <input
              type="checkbox"
              v-model="assist"
              value="u-d"
              v-bind="field"
              @change="handleChange('u-d')"
            />
          </VField>
          <span>UI Design</span>
        </p>
        <p class="p-checkbox">
          <VField
            v-slot="{ field, handleChange }"
            :validate-on-input="true"
            name="assist"
            type="checkbox"
            value="m-s"
          >
            <input
              v-bind="field"
              v-model="assist"
              value="m-s"
              type="checkbox"
              @change="handleChange('m-s')"
            />
          </VField>
          <span>Marketing Site</span>
        </p>
        <p class="p-checkbox">
          <VField
            v-slot="{ field, handleChange }"
            :validate-on-input="true"
            name="assist"
            type="checkbox"
            value="u-de"
          >
            <input
              v-bind="field"
              v-model="assist"
              type="checkbox"
              value="u-de"
              @change="handleChange('u-de')"
            />
          </VField>
          <span>UI Development</span>
        </p>
        <p class="p-checkbox">
          <VField
            v-slot="{ field, handleChange }"
            :validate-on-input="true"
            name="assist"
            type="checkbox"
            value="g-a-b"
          >
            <input
              v-bind="field"
              v-model="assist"
              type="checkbox"
              value="g-a-b"
              @change="handleChange('g-a-b')"
            />
          </VField>
          <span>Grab a beer</span>
        </p>
        <p class="p-checkbox">
          <VField
            v-slot="{ field, handleChange }"
            :validate-on-input="true"
            name="assist"
            type="checkbox"
            value="nil"
          >
            <input
              v-bind="field"
              v-model="assist"
              type="checkbox"
              value="nil"
              @change="handleChange('nil')"
            />
          </VField>
          <span>No request</span>
        </p>
        <span>
          <ErrorMessage name="assist" class="text-danger-sm" />
        </span>
      </section>
      <div class="action-btns">
        <button @click="$store.dispatch('previous')" class="btn back">
          Back
        </button>
        <button type="submit" :disabled="!meta.valid" class="btn next">
          Next
        </button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { key } from "../store/index";
import * as VeeValidate from "vee-validate";
import * as yup from "yup";

export default {
  name: "Assist",
  setup() {
    const store = useStore(key);

    onMounted(() => {
      if (!store.state.hasErrors.assist) return;
      store.dispatch("hasErrors", { type: "assist", value: true });
    });

    // VEEVALIDATE SCHEMA
    const assistSchema = yup.object({
      assist: yup
        .array()
        .of(yup.string().required())
        .required()
        .min(1, "* select at least one value"),
    });

    const { handleSubmit, meta } = VeeValidate.useForm({
      validationSchema: assistSchema,
      validateOnMount: true,
      initialValues: {
        assist: store.state.profile.assist,
      },
    });

    const setAssists = (check: boolean, value: string) => {
      if (check) {
        store.dispatch("setProfileVals", {
          type: "assist",
          value: [...store.state.profile.assist, value],
        });
      } else {
        const assists = store.state.profile.assist.filter(
          (item) => item !== value
        );
        store.dispatch("setProfileVals", {
          type: "assist",
          value: [...assists],
        });
      }
    };

    const assist = computed({
      get: () => store.state.profile.assist,
      set: () => {
        setAssists(
          (event!.target as HTMLInputElement).checked,
          (event!.target as HTMLInputElement).value
        );
        store.state.profile.assist.length
          ? store.dispatch("hasErrors", { type: "assist", value: false })
          : store.dispatch("hasErrors", { type: "assist", value: true });
      },
    });

    const onSubmit = handleSubmit(() => {
      store.dispatch("next");
    });

    return {
      assist,
      setAssists,
      assistSchema,
      onSubmit,
      meta,
    };
  },
  components: {
    VField: VeeValidate.Field,
    ErrorMessage: VeeValidate.ErrorMessage,
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
