<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Pokédex</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>
</style>
