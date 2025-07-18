<template>
  <v-select
    v-model="selectedType"
    :items="types"
    label="Filtrar por tipo"
    @update:modelValue="emitFilter"
  ></v-select>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import api from '../services/api';

export default defineComponent({
  data() {
    return {
      selectedType: '',
      types: [] as string[],
    };
  },
  async mounted() {
    const response = await api.get('/type');
    this.types = response.data.results.map((t: { name: string }) => t.name);
  },
  methods: {
    emitFilter() {
      this.$emit('filter', this.selectedType);
    },
  },
});
</script>
