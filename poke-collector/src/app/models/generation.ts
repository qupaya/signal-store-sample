export interface Generation {
  id: number;
  pokemonCount: PokemnCount;
  generationNames: GenerationName[];
}

export interface PokemnCount {
  aggregate: Aggregate;
}

export interface Aggregate {
  count: number;
}

export interface GenerationName {
  name: string;
}
