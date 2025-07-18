<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <v-app>
    <v-app-bar app color="#FF0000" dark>
      <v-toolbar-title class="headline">
        <span style="font-family: 'Press Start 2P', cursive; color: #FFD700;">PokéDex</span>
      </v-toolbar-title>
    </v-app-bar>
    <v-main style="background-color: #F5F5F5; min-height: 100vh;">
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>
.headline {
  font-size: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>
