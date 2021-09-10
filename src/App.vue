<template>
  <v-app id="app">
    <v-app-bar
      app
      color="primary"
      dark
      v-if="HomeScreen"
      clas="ma-0 pa-0"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Bridgepoint Logo"
          class=""
          contain
          src="./assets/img/bridgepoint.jpeg"
          transition="scale-transition"
          width="150"
        />

        <!-- <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        /> -->
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://www.google.com/"
        target="_blank"
        text
      >
        <span class="mr-2">Agente</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    logo: "",
    HomeScreen: null
  }),
   async created() {
      console.log(this.$route)
      if(this.$route.name === "HomeScreen"){
        this.HomeScreen = true;
      }
    },
};
</script>

<style>
.v-toolbar__content {
  padding: 0 !important;
}
</style>