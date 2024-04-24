export interface Pokemon {
  name: string;
  pokemon_v2_pokemonspecy: PokemonV2Pokemonspecy;
  pokemon_species_id: number;
}

export interface PokemonV2Pokemonspecy {
  base_happiness: number;
  capture_rate: number;
  color: { name: string };
  evolution_chain_id: number;
  evolves_from_species_id?: number;
  evolutionchain: { pokemonspecies: PokemonSpecy[] };
  flavortexts: { flavor_text: string }[];
  pokemons: PokemonDetails[];
}

export interface PokemonSpecy {
  is_baby: boolean;
  order: number;
  names: { name: string }[];
  evolves_from_species_id?: number;
  id: number;
  pokemonevolutions: PokemonEvolution[];
}

export interface PokemonEvolution {
  min_level?: number;
  evolutiontrigger: { evolutiontriggernames: { name: string }[] };
  min_happiness?: number;
  min_beauty: any;
  min_affection?: number;
  item?: PokemonEvolutionItem;
}

export interface PokemonEvolutionItem {
  name: string;
  itemSprites: { sprites: { default?: string }[] };
  itemNames: { name: string }[];
}

export interface PokemonDetails {
  base_experience?: number;
  height: number;
  weight: number;
  forms: Form[];
  pokemonTypes: PokemonType[];
  pokemonStats: PokemonStat[];
}

export interface Form {
  form_name: string;
  is_mega: boolean;
  pokemon_id: number;
  formNames: { name: string }[];
  formSprites: FormSprite[];
}

export interface FormSprite {
  sprites: {
    back_shiny?: string;
    back_female?: string;
    front_shiny?: string;
    back_default?: string;
    front_female?: string;
    front_default?: string;
    back_shiny_female?: string;
    front_shiny_female?: string;
  }
}

export interface PokemonType {
  pokemonType: { pokemonTypeNames: { name: string }[] };
}

export interface PokemonStat {
  stat: Stat;
  base_stat: number;
  effort: number;
}

export interface Stat {
  id: number;
  statNames: { name: string }[];
  is_battle_only: boolean;
  statAggregate: { aggregate: { max: { base_stat: number } } };
}
