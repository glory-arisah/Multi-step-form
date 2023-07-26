import { Store } from "vuex";
import { StateProps } from "./store/index";

declare module "@vue/runtime-core" {
  // declare your own store states

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<StateProps>;
  }
}
