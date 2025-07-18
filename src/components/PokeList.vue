<template>
  <v-container>
    <v-row>
      <v-col
        v-for="pokemon in pokemons"
        :key="pokemon.name"
        cols="12" sm="6" md="4" lg="3"
      >
        <v-card>
          <v-card-title>{{ pokemon.name }}</v-card-title>
          <v-img :src="pokemon.image" :width="150"></v-img>
          <v-card-text>
            <p>Altura: {{ pokemon.height / 10 }} m</p>
            <p>Peso: {{ pokemon.weight / 10 }} kg</p>
            <p>Tipos: {{ pokemon.types.join(', ') }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ['pokemons']
});
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}

.container-item {
  margin: 15px;
}
.v-card {
  padding: 10px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
}
</style>
