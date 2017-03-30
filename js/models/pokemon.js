class Pokemon {
  constructor(number, name, types, stats, sprite, team, weak_to, not_weak_to, super_effective, not_very_effective) {
    this.number = number,
    this.name = name,
    this.types = types,
    this.stats = stats,
    this.sprite = sprite,
    this.team = team,
    this.weak_to = weak_to,
    this.not_weak_to = not_weak_to,
    this.super_effective = super_effective,
    this.not_very_effective = not_very_effective
  }
  static intialize(numOrName, team) {
    if (store.findPokemon("pokemon", numOrName)) {
      return new Promise((resolve) => {
        resolve(store.findPokemon("pokemon", numOrName))
      })
    } else {
      return Api.getJSON(`pokemon/${numOrName.toLowerCase()}`)
                .then((pokemon) => {
                  store.addPokemon("pokemon", pokemon)
                  return pokemon
                })
    }
    .then((pokemon) => {
      var sprite = `https://assets-lmcrhbacy2s.stackpathdns.com/img/pokemon/animated/${pokemon.name}.gif`
      var types = pokemon.types.map(function(ptype) {
        return allTypes.filter(function(type) {
          return type.name == ptype.type.name
        })[0]
      })
      var pokemon = new Pokemon(pokemon.id, pokemon.name, types, pokemon.stats, sprite, team, [], [], [], [])
      Roster.addPokemon(pokemon)
      addDamageRelations(pokemon)
      removeDuplicates(pokemon)
      return pokemon
    })
  }
}

function removeDuplicates(pokemon) {
  pokemon.weak_to = jQuery.unique(pokemon.weak_to)
  pokemon.not_weak_to = jQuery.unique(pokemon.not_weak_to)
  pokemon.super_effective = jQuery.unique(pokemon.super_effective)
  pokemon.not_very_effective = jQuery.unique(pokemon.not_very_effective)
}

function addDamageRelations(pokemon) {
  for (var j = 0; j < pokemon.types.length; j++) {
    var type = pokemon.types[j]
    for (var k = 0; k < type.damage_relations.double_damage_from.length; k++) {
      pokemon.weak_to.push(type.damage_relations.double_damage_from[k].name)
    }
    for (var k = 0; k < type.damage_relations.half_damage_from.length; k++) {
      pokemon.not_weak_to.push(type.damage_relations.half_damage_from[k].name)
    }
    for (var k = 0; k < type.damage_relations.no_damage_from.length; k++) {
      pokemon.not_weak_to.push(type.damage_relations.no_damage_from[k].name)
    }
    for (var k = 0; k < type.damage_relations.double_damage_to.length; k++) {
      pokemon.super_effective.push(type.damage_relations.double_damage_to[k].name)
    }
    for (var k = 0; k < type.damage_relations.half_damage_to.length; k++) {
      pokemon.not_very_effective.push(type.damage_relations.half_damage_to[k].name)
    }
    for (var k = 0; k < type.damage_relations.no_damage_to.length; k++) {
      pokemon.not_very_effective.push(type.damage_relations.no_damage_to[k].name)
    }
  }
}
