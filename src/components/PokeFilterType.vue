<template>
  <v-select
    v-model="selectedType"
    :items="['Todos', ...types]"
    label="Filtrar por tipo"
    @update:modelValue="emitFilter"
    clearable
  ></v-select>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import api from "../services/api";

export default defineComponent({
  data() {
    return {
      selectedType: "Todos",
      types: [] as string[],
    };
  },
  async mounted() {
    try {
      const response = await api.get("/type");
      this.types = response.data.results.map((t: { name: string }) => t.name);
    } catch (error) {
      console.error("Erro ao carregar tipos:", error);
    }
  },
  methods: {
    emitFilter() {
      this.$emit("filter", this.selectedType === "Todos" ? "" : this.selectedType);
    },
  },
});
</script>
