<template>
  <main>
    <div class="content">
      <h1>PokéDex</h1>
      <h2>
        Explore os pokémons de todas as gerações com imagens e informações
        atualizadas. Utilize a busca para encontrar seu Pokémon favorito e
        navegue entre as páginas para descobrir novas criaturas do universo
        Pokémon!
      </h2>
    </div>

    <poke-search @search="handleSearch" />
    <poke-filter-type @filter="handleFilter" />
    <v-progress-circular v-if="loading" indeterminate />
    <poke-list v-else :pokemons="pokemonListItem" />

    <poke-pagination
      :current-page="currentPage"
      :total="Math.ceil(totalPokemon / limit)"
      @update:modelValue="handlePageChange"
    />
  </main>
</template>

<script lang="ts">
import PokeFilterType from "../components/PokeFilterType.vue";
import { defineComponent } from "vue";
import axios from "axios";
import PokeList from "../components/PokeList.vue";
import PokePagination from "../components/PokePagination.vue";
import PokeSearch from "../components/PokeSearch.vue";
import {
  getPokemonByName,
  type PokemonListItem,
} from "../services/pokemonService";
import { filter } from "lodash";

export default defineComponent({
  components: { PokeList, PokePagination, PokeSearch, PokeFilterType },

  data() {
    return {
      filterType: "",
      loading: false,
      pokemonListItem: [] as PokemonListItem[],
      currentPage: 1,
      apiUrl: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
      totalPokemon: 0,
      limit: 20,
      searchTerm: "",
    };
  },
  computed: {
    filteredPokemons() {
      let list = this.pokemonListItem;
      if (this.searchTerm) {
        list = list.filter(p => p.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
      }
      if (this.filterType) {
        list = list.filter(p => p.types.includes(this.filterType));
      }
      return list;
    },
  },

  mounted() {
    this.loadPokemonList(this.apiUrl);
  },

  methods: {
    handleFilter(filterType: string) {
      this.filterType = filterType; // Reset to first page on new filter
    },
    handleSearch(searchQuery: string) {
      this.searchTerm = searchQuery;// Reset to first page on new search
    },
    async loadPokemonList(url: string) {
      this.loading = true;
      try {
        const response = await axios.get(url);

        const pokemonsWithImages = await Promise.all(
          response.data.results.map(async (pokemon: { name: string }) => {
            const details = await getPokemonByName(pokemon.name);
            return {
              name: pokemon.name,
              image: details.sprites.front_default,
              height: details.height,
              weight: details.weight,
              types: details.types.map((type) => type.type.name),
            };
          })
        );

        this.pokemonListItem = pokemonsWithImages;
        this.totalPokemon = response.data.count;
      } catch (error) {
        console.error("erro ao carregar a lista de pokémons:", error);
      } finally {
        this.loading = false;
      }
    },

    handlePageChange(newPage: number) {
      this.currentPage = newPage;
      const offset = (newPage - 1) * this.limit;
      const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${this.limit}`;
      this.loadPokemonList(url);
    },
  },
});
</script>
