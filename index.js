const numTypes = 18
const allTypes = []
Array.from({length:numTypes},(v,k)=>k+1).map(function(number) {
  return $.get(`https://pokeapi.co/api/v2/type/${number}/`).
  then((typeData) => {
    allTypes.push(typeData)
  })
})

allTypes.filter(function(type) {
  return type.name == "ghost"
})[0]

class Pokemon {
  constructor(number, name, types, sprite, team, weak_to, not_weak_to) {
    this.number = number,
    this.name = name,
    this.types = types,
    this.sprite = sprite
    this.team = team
    this.weak_to = weak_to
    this.not_weak_to = not_weak_to
  }
  static intialize(numOrName, team) {
    return $.get(`https://pokeapi.co/api/v2/pokemon/${numOrName}`).
    then((pokemon) => {
      var sprite = `https://assets-lmcrhbacy2s.stackpathdns.com/img/pokemon/animated/${pokemon.name}.gif`
      var types = pokemon.types.map(function(ptype) {
        return allTypes.filter(function(type) {
          return type.name == ptype.type.name
        })[0]
      })
      var pokemon = new Pokemon(pokemon.id, pokemon.name, types, sprite, team, [], [])
      if (pokemon.team == 1) {
        your_roster.push(pokemon)
      } else {
        enemy_roster.push(pokemon)
      }
      for (var j = 0; j < pokemon.types.length; j++) {
        var type = pokemon.types[j]
        for (var k = 0; k < type.damage_relations.double_damage_from.length; k++) {
          pokemon.weak_to.push(type.damage_relations.double_damage_from[k].name)
        }
        for (var k = 0; k < type.damage_relations.half_damage_from.length; k++) {
          pokemon.not_weak_to.push(type.damage_relations.half_damage_from[k].name)
        }
      }
      return pokemon
    })
  }
}

var your_roster = []
var enemy_roster = []

$(function() {
  $(".pokeSubmit").on("click", function() {
    event.preventDefault()
    var input = $("#numOrName").val()
    if (this.id == "1") {
      var team = 1
    } else {
      var team = 2
    }
    Pokemon.intialize(input, team).
    then(function(pokemon){
      if (pokemon.team == 1){
        var div = 'pokemon'
      } else {
        var div = 'matchup'
      }
      let a_tag = `<a href='#' data-pokemon-name='${pokemon.name}' onmouseover='pokemonInfo(this, "${pokemon.name}")' onclick="removePokemon(this)">`
      $('.container').find(`.${div}:empty:first`).html(a_tag + "<img src=" + pokemon.sprite + "></a>")
    })
  })
})


function removePokemon(pokemon) {
  let i = pokemon
  $(i).parent().empty()
}


function pokeBattle() {
  var result = []
  for (var i = 0; i < your_roster.length; i++) {
    var ypoke = your_roster[i]
    var score = 0
    for (var j = 0; j < enemy_roster.length; j++) {
      var epoke = enemy_roster[j]
      for (var k = 0; k < ypoke.weak_to.length; k++) {
        var yweak = ypoke.weak_to[k]
        for (var l = 0; l < epoke.types.length; l++) {
          eweak = epoke.types[l].name
          if (yweak == eweak) {
            score--
          }
        }
      }
      if (score < 0) {
        result.push(`${ypoke.name} is weak against ${epoke.name}!`)
      }
    }
  }
  console.log(result)
}

function pokemonInfo(element, name) {
  return $.get(`https://pokeapi.co/api/v2/pokemon/${name}`).
    then((pokemon)=>{
      let poke_types = pokemon.types.map(function(type_obj){
        return type_obj.type.name
      })
      let poke_stats = pokemon.stats.map(function(stat_obj){
        return `${stat_obj.stat.name}: ${stat_obj.base_stat}`
      })
      $('.info').html(`${poke_types}\n${poke_stats.join("\n")}`)
      $('.info').css("display", "block")
  })
}

// function pokeCompare() {
//
// }

//epoke.weak_to.push(0)
// for (var k = 0; k < enemy_roster.length; k++) {
//   var epoke = enemy_roster[k]
//   for (var l = 0; l < epoke.types.length; l++) {
//     var etype = epoke.types[l]
