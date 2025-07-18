import api from "./api";

export interface PokemonListItem {
  name: string;
  image: string;
  height: number;
  weight: number;
  types: string[];
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    slot: number;
    type: { name: string; url: string };
  }[];
  sprites: {
    front_default: string;
  };
}

const detailCache = new Map<string, Pokemon>();

export async function getPokemonByName(
  name: string,
  options?: { signal?: AbortSignal }
): Promise<Pokemon> {
  const key = name.toLowerCase();
  if (detailCache.has(key)) {
    return detailCache.get(key)!;
  }
  const response = await api.get<Pokemon>(`/pokemon/${key}`, options);
  detailCache.set(key, response.data);
  return response.data;
}

export async function listAllPokemonNames(): Promise<string[]> {
  const res = await api.get<PokemonListResponse>(
    "/pokemon?limit=100000&offset=0"
  );
  return res.data.results.map((p) => p.name);
}

export async function listPokemonPage(
  offset: number,
  limit = 20
): Promise<{ items: PokemonListItem[]; count: number }> {
  const res = await api.get<PokemonListResponse>(
    `/pokemon?offset=${offset}&limit=${limit}`
  );

  const items = await Promise.all(
    res.data.results.map(async (p) => {
      const details = await getPokemonByName(p.name);
      return {
        name: details.name,
        image: details.sprites.front_default,
        height: details.height,
        weight: details.weight,
        types: details.types.map((t) => t.type.name),
      } as PokemonListItem;
    })
  );

  return { items, count: res.data.count };
}
