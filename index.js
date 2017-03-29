const numTypes = 18
const allTypes = []
Array.from({length:numTypes},(v,k)=>k+1).map(function(number) {
  return $.get(`https://pokeapi.co/api/v2/type/${number}/`).
  then((typeData) => {
    allTypes.push(typeData)
  })
})

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
    return $.get(`https://pokeapi.co/api/v2/pokemon/${numOrName}`).
    then((pokemon) => {
      var sprite = `https://assets-lmcrhbacy2s.stackpathdns.com/img/pokemon/animated/${pokemon.name}.gif`
      var types = pokemon.types.map(function(ptype) {
        return allTypes.filter(function(type) {
          return type.name == ptype.type.name
        })[0]
      })
      var pokemon = new Pokemon(pokemon.id, pokemon.name, types, pokemon.stats, sprite, team, [], [], [], [])
      if (pokemon.team == 1) {
        your_roster.push(pokemon)
        allPokes.push(pokemon)
      } else {
        enemy_roster.push(pokemon)
        allPokes.push(pokemon)
      }
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
      return pokemon
    })
  }
}

var your_roster = []
var enemy_roster = []
var allPokes = []

$(function() {
  $(".pokeSubmit").on("click", function() {
    event.preventDefault()
    var input = $("#numOrName").val()
    if (this.id == "1") {
      var team = 1
    } else {
      var team = 2
    }
    if (team == 1 && your_roster.length >= 6) {
      alert("Your roster is maxed out!")
    } else if (team == 2 && enemy_roster.length >= 6) {
      alert("Your roster is maxed out!")
    } else {
      Pokemon.intialize(input, team).
      then(function(pokemon){
        if (pokemon.team == 1){
          var div = 'pokemon'
        } else {
          var div = 'matchup'
        }
        let a_tag = `<a href='#' data-toggle="popover" data-placement="bottom" title='${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)} Stats' data-content="Popover on bottom." onmouseover="pokemonInfo(this, '${pokemon.name}' )" data-pokemon-name='${pokemon.name}' data-roster=${div} onclick="removePokemon(this)">`
        $('.container').find(`.${div}:empty:first`).html(a_tag + "<img src=" + pokemon.sprite + "></a>")
      })
    }
  })
})


function removePokemon(poke_element) {
  let el = poke_element
  let poke_obj = {};
  if (poke_element.dataset.roster === "pokemon") {
    poke_obj.pokemon = your_roster.find(function(pokemon, index) {
      poke_obj.index = index
      return pokemon.name === el.dataset.pokemonName
    })
    your_roster.splice(poke_obj.index, 1)
  } else {
    poke_obj.pokemon = enemy_roster.find(function(pokemon, index) {
      poke_obj.index = index
      return pokemon.name === el.dataset.pokemonName
    })
    enemy_roster.splice(poke_obj.index, 1)
  }
  $(poke_element).parent().empty()
}


function pokeBattle() {
  var result = []
  for (var i = 0; i < your_roster.length; i++) {
    var ypoke = your_roster[i]
    var enemyvsyourscore = 0
    var yourvsenemyscore = 0
    for (var j = 0; j < enemy_roster.length; j++) {
      var epoke = enemy_roster[j]

      for (var k = 0; k < ypoke.weak_to.length; k++) {
        var yweak = ypoke.weak_to[k]
        for (var l = 0; l < epoke.types.length; l++) {
          etype = epoke.types[l].name
          if (yweak == etype) {
            enemyvsyourscore--
          }
        }
      }
      for (var k = 0; k < ypoke.not_weak_to.length; k++) {
        var ynotweak = ypoke.not_weak_to[k]
        for (var l = 0; l < epoke.types.length; l++) {
          etype = epoke.types[l].name
          if (ynotweak == etype) {
            enemyvsyourscore++
          }
        }
      }
      if (enemyvsyourscore < 0) {
        result.push(`${epoke.name} is super effective against ${ypoke.name}!`)
      } else if (enemyvsyourscore > 0) {
        result.push(`${epoke.name} is not very effective against ${ypoke.name}!`)
      }

      for (var k = 0; k < ypoke.super_effective.length; k++) {
        var ysupereff = ypoke.super_effective[k]
        for (var l = 0; l < epoke.types.length; l++) {
          etype = epoke.types[l].name
          if (ysupereff == etype) {
            yourvsenemyscore--
          }
        }
      }
      for (var k = 0; k < ypoke.not_very_effective.length; k++) {
        var ynotveff = ypoke.not_very_effective[k]
        for (var l = 0; l < epoke.types.length; l++) {
          etype = epoke.types[l].name
          if (ynotveff == etype) {
            enemyvsyourscore++
          }
        }
      }
      if (yourvsenemyscore < 0) {
        result.push(`${ypoke.name} is super effective against ${epoke.name}!`)
      } else if (yourvsenemyscore > 0) {
        result.push(`${ypoke.name} is not very effective against ${epoke.name}!`)
      }
    }
  }
  console.log(result)
}


function pokemonInfo(element, name) {
  let pokemon = allPokes.find(function(ele) {
    return ele.name == name
  })
  let poke_types = pokemon.types.map(function(type_obj){
    return type_obj.name
  })
  let poke_stats = pokemon.stats.map(function(stat_obj){
    return `${stat_obj.stat.name}: ${stat_obj.base_stat}`
  })
  $('[data-toggle="popover"]').attr("data-content", `${poke_types}\n\n${poke_stats.join("\n\n")}`)
  $('[data-toggle="popover"]').popover({
    placement : 'top',
    trigger: 'hover'
   })
}

function pokemonInfo2() {
 //$(document).ready(function() {
 $('[data-toggle="popover"]').popover({
   placement : 'top',
   trigger: 'hover'
  })
 }
