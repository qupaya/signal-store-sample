import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Generation} from "../models/generation";
import {GraphRequest} from "../models/graph-request";
import {Root} from "../models/data-root";
import {Pokemon} from "../models/pokemon";

const generationsQuery = `query samplePokeAPIQuery {
  items: pokemon_v2_generation {
    id
    pokemonCount: pokemon_v2_pokemonspecies_aggregate {
      aggregate {
        count
      }
    }
    generationNames: pokemon_v2_generationnames(where: {language_id: {_eq: 6}}) {
      name
    }
  }
}`;

const pokemonOverviewCollection = `
query samplePokeAPIQuery($language: Int = 6, $generation: Int = 1) {
  items: pokemon_v2_pokemonspeciesname(where: {language_id: {_eq: $language}, pokemon_v2_pokemonspecy: {generation_id: {_eq: $generation}}}) {
    name
    pokemon_v2_pokemonspecy {
      base_happiness
      capture_rate
      color: pokemon_v2_pokemoncolor {
        name
      }
      evolution_chain_id
      evolves_from_species_id
      evolutionchain: pokemon_v2_evolutionchain {
        pokemonspecies: pokemon_v2_pokemonspecies(order_by: {order: asc}) {
          is_baby
          order
          names: pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: $language}}) {
            name
          }
          evolves_from_species_id
          id
          pokemonevolutions: pokemon_v2_pokemonevolutions {
            min_level
            evolutiontrigger: pokemon_v2_evolutiontrigger {
              evolutiontriggernames: pokemon_v2_evolutiontriggernames(where: {language_id: {_eq: $language}}) {
                name
              }
            }
            min_happiness
            min_beauty
            min_affection
            item: pokemon_v2_item {
              name
              itemSprites: pokemon_v2_itemsprites {
                sprites
              }
              itemNames: pokemon_v2_itemnames(where: {language_id: {_eq: $language}}) {
                name
              }
            }
          }
        }
      }
      flavortexts: pokemon_v2_pokemonspeciesflavortexts(where: {language_id: {_eq: $language}}, distinct_on: flavor_text) {
        flavor_text
      }
      pokemons: pokemon_v2_pokemons {
        base_experience
        height
        weight
        forms: pokemon_v2_pokemonforms {
          form_name
          is_mega
          pokemon_id
          formNames: pokemon_v2_pokemonformnames(where: {language_id: {_eq: $language}}) {
            name
          }
          formSprites: pokemon_v2_pokemonformsprites {
            sprites
          }
        }
        pokemonTypes: pokemon_v2_pokemontypes {
          pokemonType: pokemon_v2_type {
            pokemonTypeNames: pokemon_v2_typenames(where: {language_id: {_eq: $language}}) {
              name
            }
          }
        }
        pokemonStats: pokemon_v2_pokemonstats {
          stat: pokemon_v2_stat {
            statNames: pokemon_v2_statnames(where: {language_id: {_eq: $language}}) {
              name
            }
            is_battle_only
            statAggregate: pokemon_v2_pokemonstats_aggregate {
              aggregate {
                max {
                  base_stat
                }
              }
            }
            id
          }
          base_stat
          effort
        }
      }
    }
    pokemon_species_id
  }
}`;

const singlePokemonDetailsQuery = `query samplePokeAPIQuery($language: Int = 6, $id: Int = 1) {
  items: pokemon_v2_pokemonspeciesname(where: {language_id: {_eq: $language}, pokemon_species_id: {_eq: $id}}) {
    name
    pokemon_v2_pokemonspecy {
      base_happiness
      capture_rate
      color: pokemon_v2_pokemoncolor {
        name
      }
      evolution_chain_id
      evolves_from_species_id
      evolutionchain: pokemon_v2_evolutionchain {
        pokemonspecies: pokemon_v2_pokemonspecies(order_by: {order: asc}) {
          is_baby
          order
          names: pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: $language}}) {
            name
          }
          evolves_from_species_id
          id
          pokemonevolutions: pokemon_v2_pokemonevolutions {
            min_level
            evolutiontrigger: pokemon_v2_evolutiontrigger {
              evolutiontriggernames: pokemon_v2_evolutiontriggernames(where: {language_id: {_eq: $language}}) {
                name
              }
            }
            min_happiness
            min_beauty
            min_affection
            item: pokemon_v2_item {
              name
              itemSprites: pokemon_v2_itemsprites {
                sprites
              }
              itemNames: pokemon_v2_itemnames(where: {language_id: {_eq: $language}}) {
                name
              }
            }
          }
        }
      }
      flavortexts: pokemon_v2_pokemonspeciesflavortexts(where: {language_id: {_eq: $language}}, distinct_on: flavor_text) {
        flavor_text
      }
      pokemons: pokemon_v2_pokemons {
        base_experience
        height
        weight
        forms: pokemon_v2_pokemonforms {
          form_name
          is_mega
          pokemon_id
          formNames: pokemon_v2_pokemonformnames(where: {language_id: {_eq: $language}}) {
            name
          }
          formSprites: pokemon_v2_pokemonformsprites {
            sprites
          }
        }
        pokemonTypes: pokemon_v2_pokemontypes {
          pokemonType: pokemon_v2_type {
            pokemonTypeNames: pokemon_v2_typenames(where: {language_id: {_eq: $language}}) {
              name
            }
          }
        }
        pokemonStats: pokemon_v2_pokemonstats {
          stat: pokemon_v2_stat {
            statNames: pokemon_v2_statnames(where: {language_id: {_eq: $language}}) {
              name
            }
            is_battle_only
            statAggregate: pokemon_v2_pokemonstats_aggregate {
              aggregate {
                max {
                  base_stat
                }
              }
            }
            id
          }
          base_stat
          effort
        }
      }
    }
    pokemon_species_id
  }
}`;


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly httpClient = inject(HttpClient);

  generations(): Observable<Root<Generation>> {
    return this.loadData<Generation>({ query: generationsQuery });
  }

  loadPokemonCollection(generationId: number): Observable<Root<Pokemon>> {
    return this.loadData<Pokemon>({ query: pokemonOverviewCollection, variables: { language: 6, generation: generationId }});
  }

  loadPokemonDetails(id: number): Observable<Pokemon> {
    return this.loadData<Pokemon>({ query: singlePokemonDetailsQuery, variables: { language: 6, id }}).pipe(
      map(({ data }) => data.items[0])
    );
  }

  private loadData<T>(data: GraphRequest): Observable<Root<T>> {
    const body = {}
    return this.httpClient.post<Root<T>>('https://beta.pokeapi.co/graphql/v1beta', {
      operationName: 'samplePokeAPIQuery',
      ...data
    });
  }
}
