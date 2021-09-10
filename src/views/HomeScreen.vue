<template>
  <v-container fill-height fluid>
    <v-row>
      <v-col>
        <v-card class="mx-auto" max-width="344">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                {{ title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                Habilitar mi dispositivo para dar atención a cliente de BPI
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="80">
              <v-img src="../assets/img/support_agent.png"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-container>
            <v-row align-content="center" justify="center">
              <v-col>
                <div class="text-center">
                  <v-btn
                    class="big-button ma-2"
                    color="info"
                    dark
                    @click="login"
                  >
                    <v-icon dark x-large> mdi-power-standby </v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <LoadingScreen v-if="isLoading"></LoadingScreen>
    <v-snackbar v-model="snackbar" :multi-line="multiLine">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import LoadingScreen from "@/components/LoadingScreen";

export default {
  name: "HomeScreen",
  components: {
    LoadingScreen,
  },
  data: () => ({
    multiLine: true,
    snackbar: false,
    text: `Ocurrio un error, probar nuevamente`,
    title: "Dar atención",
    isLoading: false,
    endpointApiAuth:
      "https://app-service-poc-jaibo.azurewebsites.net/api/Auth/GetToken",
    //"https://localhost:44301/api/Auth/GetToken",
  }),
  async created() {
    console.log("Created.");
  },
  methods: {
    async login() {
      console.log("login");
      try {
        this.isLoading = true;

        let userAccesToken = null;
        let identityId = null;
        let expiresOn = null;
        let id = null;
        var bodyRequest = { consumer: "agent" };

        let responseAuth = await this.postData(
          this.endpointApiAuth,
          bodyRequest
        );
        console.log("Response", responseAuth);

        if (responseAuth.error == null) {
          userAccesToken = responseAuth.token;
          identityId = responseAuth.identityId;
          expiresOn = responseAuth.expiresOn;
          id = responseAuth.id;

          await this.$store.dispatch("acs/setToken", userAccesToken);
          await this.$store.dispatch("acs/setIdentityId", identityId);
          await this.$store.dispatch("acs/setExpiresOn", expiresOn);
          await this.$store.dispatch("acs/setId", id);
          this.isLoading = false;
          this.$router.push("local-preview");
        } else {
          console.error(responseAuth.error);
        }
      } catch (error) {
        console.error(error);
        this.isLoading = false;
        this.snackbar = true;
      }
    },

    async postData(url = "", data = {}) {
      // Opciones por defecto estan marcadas con un *
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    },
  },
};
</script>

<style>
.big-button {
  height: 71px !important;
  min-width: 64px !important;
  padding: 5px 20px !important;
}
</style>
