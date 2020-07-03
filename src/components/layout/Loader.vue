<template>
  <div class="loader-container">
    <v-progress-circular class="loader" indeterminate color="purple" size="400"></v-progress-circular>
    <div class="loader-content">
      <img src="../../assets/logo.png" alt="perfu-logo" />
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
    img {
      height: 100px;
    }
  }
}
</style>
