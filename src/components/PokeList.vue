<template>
  <v-container>
    <v-row>
      <v-col
        v-for="pokemon in pokemons"
        :key="pokemon.name"
        cols="12" sm="6" md="4" lg="3"
      >
        <v-card
          class="pokemon-card"
          elevation="6"
          :style="{ border: '4px solid ' + (pokemon.types[0] ? getTypeColor(pokemon.types[0]) : '#ccc') }"
        >
          <v-card-title class="text-h6 font-weight-bold text-capitalize pokemon-name" style="color: #333; padding: 10px;">
            {{ pokemon.name }}
          </v-card-title>
          <v-img :src="pokemon.image" :width="150" class="mx-auto pokemon-image" style="border-radius: 50%; border: 2px solid #fff; margin-top: -20px;"></v-img>
          <v-card-text class="pokemon-info">
            <div class="stats-row">
              <div class="stat-item">
                <span class="stat-label">Altura</span>
                <span class="stat-value">{{ (pokemon.height / 10).toFixed(1) }} m</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Peso</span>
                <span class="stat-value">{{ (pokemon.weight / 10).toFixed(1) }} kg</span>
              </div>
            </div>
            <div class="types-container">
              <span
                v-for="type in pokemon.types"
                :key="type"
                class="type-badge"
                :style="{ backgroundColor: getTypeColor(type) }"
              >
                {{ type.toUpperCase() }}
              </span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ['pokemons'],
  methods: {
    getTypeColor(type: string) {
      const colors = {
        normal: '#A8A878',
        fire: '#FF4422',
        water: '#3399FF',
        electric: '#FFCC33',
        grass: '#77CC55',
        ice: '#98D8D8',
        fighting: '#C03028',
        poison: '#A040A0',
        ground: '#E0C068',
        flying: '#A890F0',
        psychic: '#F85888',
        bug: '#A8B820',
        rock: '#B8A038',
        ghost: '#705898',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0',
        fairy: '#EE99AC'
      };
      return colors[type.toLowerCase()] || '#ccc';
    },
  },
});
</script>

<style scoped>
.pokemon-card {
  border-radius: 10px;
  background-color: #fff;
  transition: transform 0.2s;
  padding: 10px;
  overflow: hidden;
  text-align: center;
}

.pokemon-card:hover {
  transform: scale(1.05);
}

.pokemon-name {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  margin: -10px -10px 0 -10px;
  padding: 5px 10px;
}

.pokemon-image {
  margin-top: -30px; /* Ajuste para sobrepor o título */
  position: relative;
  z-index: 1;
}

.pokemon-info {
  padding: 10px;
}

.stats-row {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-item {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.stat-label {
  font-family: 'Roboto', sans-serif;
  color: #666;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.stat-value {
  font-family: 'Roboto', sans-serif;
  color: #333;
  font-weight: bold;
  font-size: 1.1rem;
}

.types-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  padding: 5px;
}

.type-badge {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 15px;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size: 0.9rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
