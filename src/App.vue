<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="ByteCrypt Logo"
          class="shrink mr-2"
          contain
          src="/key.svg"
          transition="scale-transition"
          width="40"
        />
        <span>ByteCrypt</span>
      </div>
      <v-spacer></v-spacer>
      <i class="fab fa-github fa-2x mr-2 github-icon" @click="goToGitHub"></i>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({}),
  methods: {
    goToGitHub() {
      window
        .open('https://github.com/karolkrasnowski/ByteCrypt', '_blank')
        .focus()
    },
  },
}
</script>
<style scoped>
.github-icon {
  cursor: pointer;
}
</style>