<template>
  <v-text-field
    v-model="searchQuery"
    label="Buscar Pokémon"
    prepend-icon="mdi-magnify"
    @input="emitSearch"
  ></v-text-field>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { debounce } from 'lodash';

export default defineComponent({
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    emitSearch() {},
  },
  mounted() {
    // Tipar corretamente o this aqui é seguro
    this.emitSearch = debounce(() => {
      this.$emit('search', this.searchQuery);
    }, 300);
  },
});
</script>
