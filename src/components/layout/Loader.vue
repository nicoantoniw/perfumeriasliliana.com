<template>
  <div class="loader-container">
    <v-progress-circular class="loader" indeterminate color="pink" size="500"></v-progress-circular>
    <div class="loader-content">
      <h1>Logo</h1>
      <h2>Bienvenido a Perfumerias Liliana</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "loader",
  data: () => ({}),

  methods: {}
};
</script>

<style lang="scss">
.loader-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .loader {
    position: absolute;
  }
  .loader-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
