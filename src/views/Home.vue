<template>
  <main>
    <div class="content">
      <h1 style="font-family: 'Press Start 2P', cursive; color: #FF0000; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">PokéDex</h1>
      <h2 style="font-family: 'Roboto', sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
        Explore os pokémons de todas as gerações com imagens e informações atualizadas. Utilize a busca para encontrar seu Pokémon favorito e navegue entre as páginas para descobrir novas criaturas do universo Pokémon!
      </h2>
    </div>

    <poke-search @search="updateSearch" style="margin-top: 20px; max-width: 400px; margin-left: auto; margin-right: auto;" />
    <poke-filter-type @filter="handleFilter" style="margin-top: 20px; max-width: 400px; margin-left: auto; margin-right: auto;" />
    <v-progress-circular
      v-if="isLoading"
      indeterminate
      size="64"
      class="mx-auto my-12"
      color="#FF0000"
    />

    <template v-else>
      <poke-list v-if="filteredPokemonOnPage.length" :pokemons="filteredPokemonOnPage" />
      <div v-else class="text-center my-12">
        <p v-if="searchTerm && filterType" style="font-family: 'Roboto', sans-serif; color: #666;">
          Nenhum Pokémon encontrado para “<strong>{{ searchTerm }}</strong>” do tipo “<strong>{{ filterType }}</strong>”.
        </p>
        <p v-else-if="searchTerm" style="font-family: 'Roboto', sans-serif; color: #666;">
          Nenhum Pokémon encontrado para “<strong>{{ searchTerm }}</strong>”.
        </p>
        <p v-else-if="filterType" style="font-family: 'Roboto', sans-serif; color: #666;">
          Nenhum Pokémon encontrado para o tipo “<strong>{{ filterType }}</strong>”.
        </p>
        <p v-else style="font-family: 'Roboto', sans-serif; color: #666;">Carregando Pokémons...</p>
      </div>

      <poke-pagination
        v-if="filteredPokemonOnPage.length"
        :current-page="currentPage"
        :total="Math.ceil(totalFilteredPokemon / limit)"
        @update:modelValue="handlePageChange"
        style="margin-top: 20px"
      />
    </template>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import debounce from "lodash/debounce";
import PokeList from "../components/PokeList.vue";
import PokePagination from "../components/PokePagination.vue";
import PokeSearch from "../components/PokeSearch.vue";
import PokeFilterType from "../components/PokeFilterType.vue";
import {
  getPokemonByName,
  listAllPokemonNames,
  listPokemonPage,
  type PokemonListItem,
} from "../services/pokemonService";
import axios from "axios";

export default defineComponent({
  name: "HomeView",
  components: { PokeList, PokePagination, PokeSearch, PokeFilterType },

  setup() {
    const allPokemonNames = ref<string[]>([]);
    const pokemonListItem = ref<PokemonListItem[]>([]);
    const filteredPokemonOnPage = ref<PokemonListItem[]>([]);
    const currentPage = ref(1);
    const totalPokemon = ref(0);
    const totalFilteredPokemon = ref(0);
    const limit = 20;
    const searchTerm = ref("");
    const filterType = ref("");
    const isLoading = ref(true);
    let abortController: AbortController | null = null;

    const initNames = async () => {
      allPokemonNames.value = await listAllPokemonNames();
    };

    const loadPage = async (page: number, search: string, type: string) => {
      isLoading.value = true;
      const offset = (page - 1) * limit;

      try {
        let pokemonNames: string[] = [];
        if (type) {
          const typeResponse = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
          pokemonNames = typeResponse.data.pokemon.map((p: any) => p.pokemon.name);
          totalFilteredPokemon.value = pokemonNames.length;
        } else {
          pokemonNames = allPokemonNames.value;
          totalFilteredPokemon.value = allPokemonNames.value.length;
        }

        if (search) {
          pokemonNames = pokemonNames.filter((n) =>
            n.toLowerCase().includes(search.toLowerCase())
          );
          totalFilteredPokemon.value = pokemonNames.length;
        }

        const start = offset;
        const end = start + limit;
        const paginatedNames = pokemonNames.slice(start, end);

        const results = await Promise.all(
          paginatedNames.map((name) =>
            getPokemonByName(name, { signal: abortController?.signal })
          )
        );

        filteredPokemonOnPage.value = results.map((details) => ({
          name: details.name,
          image: details.sprites.front_default,
          height: details.height,
          weight: details.weight,
          types: details.types.map((t: any) => t.type.name),
        }));
      } catch (e: any) {
        if (e.name !== "AbortError") console.error(e);
      } finally {
        isLoading.value = false;
      }
    };

    const handlePageChange = async (newPage: number) => {
      currentPage.value = newPage;
      await loadPage(newPage, searchTerm.value, filterType.value);
    };

    const doSearch = debounce(async (term: string) => {
      abortController?.abort();
      abortController = new AbortController();
      currentPage.value = 1; // Resetar para a primeira página na busca
      await loadPage(currentPage.value, term, filterType.value);
    }, 300);

    const updateSearch = (q: string) => {
      searchTerm.value = q.trim().toLowerCase();
      isLoading.value = true;
      doSearch(searchTerm.value);
    };

    const handleFilter = (type: string) => {
      filterType.value = type === "Todos" ? "" : type;
      currentPage.value = 1; // Resetar para a primeira página no filtro
      isLoading.value = true;
      loadPage(currentPage.value, searchTerm.value, filterType.value);
    };

    onMounted(async () => {
      await initNames();
      await loadPage(1, "", "");
    });

    return {
      filteredPokemonOnPage,
      currentPage,
      totalFilteredPokemon,
      limit,
      searchTerm,
      filterType,
      isLoading,
      handlePageChange,
      updateSearch,
      handleFilter,
    };
  },
});
</script>

<style scoped>
.content {
  text-align: center;
  margin-bottom: 20px;
}
</style>
