<template>
  <v-container fill-height fluid>
    <v-row>
      <v-col>
        <v-card class="mx-auto" max-width="344" >
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
                  <v-btn class="ma-2" color="info" dark @click="login">
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

        const response = await fetch(this.endpointApiAuth);
        const data = await response.json();
        console.log("dataResponse", data);

        if (data.error == null) {
          userAccesToken = data.token;
          identityId = data.identityId;
          expiresOn = data.expiresOn;

          await this.$store.dispatch("acs/setToken", userAccesToken);
          await this.$store.dispatch("acs/setIdentityId", identityId);
          await this.$store.dispatch("acs/setExpiresOn", expiresOn);
          this.isLoading = false;
          this.$router.push("local-preview");
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error(error);
        this.isLoading = false;
        this.snackbar = true;
      }
    },
  },
};
</script>