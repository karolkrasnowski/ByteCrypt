<template>
  <v-container class="main-container">
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