<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="ByteCrypt Logo"
          class="shrink mr-2"
          contain
          src="https://www.freeiconspng.com/thumbs/key-icon/key-icon-4.png"
          transition="scale-transition"
          width="40"
        />
        <span>ByteCrypt</span>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
