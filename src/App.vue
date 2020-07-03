<template>
  <v-app>
    <v-content>
      <div :style="loaderStyle">
        <Loader />
      </div>
      <div :style="contentStyle">
        <Navbar />
        <AdminMenu />
        <v-fade-transition mode="out-in">
          <router-view />
        </v-fade-transition>
        <PageFooter />
      </div>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/layout/Navbar";
import PageFooter from "./components/layout/PageFooter";
import AdminMenu from "./components/layout/AdminMenu";
import Loader from "./components/layout/Loader";

export default {
  name: "App",

  components: {
    Navbar,
    PageFooter,
    AdminMenu,
    Loader
  },

  data: () => ({
    loading: true,
    loaderStyle: "display:block",
    contentStyle: "display:none"
  }),
  created() {
    this.$store.dispatch("autoLogin");
    setTimeout(() => {
      this.loaderStyle = "display:none";
      this.contentStyle = "display:block";
    }, 4000);
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 4000);
  }
};
</script>

<style lang="scss">
* {
  font-family: "Noto Sans HK", sans-serif;
}
</style>
