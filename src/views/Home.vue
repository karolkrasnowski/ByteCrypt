<template>
  <v-container class="main-container">
    <div class="text-h3 mb-5 mt-5 font-weight-medium" align="center">
      ByteCrypt
    </div>
    <div
      class="text-h6 grey--text mb-5 font-weight-light font-italic"
      align="center"
    >
      Encrypt your files without leaving your browser
    </div>
    <stepper />
  </v-container>
</template>

<script>
import Stepper from '../components/Stepper.vue'

export default {
  name: 'Home',

  components: {
    Stepper,
  },
}
</script>
<style scoped>
@media (min-width: 960px) {
  .main-container {
    width: 50%;
  }
}
</style>