import api from './api';

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
    results: PokemonListItem[];
}

export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: {
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }[];
    sprites: {
        front_default: string;
    };
}

export async function getPokemonByName(name: string): Promise<Pokemon> {
  const response = await api.get<Pokemon>(`/pokemon/${name}`);
  return response.data;
}
