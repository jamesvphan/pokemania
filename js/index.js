

// On clicking button to add pokemon, creates a new Pokemon object, and displays respective <a> element
function plsWork(object) {
  $(".pokeSubmit").on("click", function() {
    event.preventDefault()
    var input = $("#numOrName").val()
    if (this.id == "your-roster") {
      var team = 1
    } else {
      var team = 2
    }
    if (team == 1 && object.your_roster.pokemon.length >= 6) {
      alert("Your roster is maxed out!")
    } else if (team == 2 && object.enemy_roster.pokemon.length >= 6) {
      alert("The enemy roster is maxed out!")
    } else {
      Pokemon.initialize(input, team).
      then(function(pokemon){
        if (pokemon.team == 1){
          var div = 'pokemon'
        } else {
          var div = 'matchup'
        }
        let data_attr = `data-team="${div}" data-toggle="popover" data-html="true" data-placement="bottom" data-content="" data-pokemon-name='${pokemon.name}' data-roster=${div}`
        let title = `title=${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}`
        let events = `onclick="pokemonInfo(this, '${pokemon.name}')"`

        let a_tag = `<a href='#' ${data_attr} ${title} ${events}>`
        $('.container').find(`.${div}:empty:first`).html(a_tag + "<img src=" + pokemon.sprite + "></a>")
      })
      $("#numOrName").val('')
    }
  })
}




// takes pokemon name and returns Pokemon object from allPokes array
function grabPokemon(name) {
  return store.findPokemon("pokemon", name)
}

// takes <a> element and name from <a> element, and makes request to return stats of pokemon
function pokemonInfo(element, name) {
  let pokemon = grabPokemon(name)
  let poke_types = pokemon.types.map(function(type_obj){
    return type_obj.type.name
  })
  let poke_stats = pokemon.stats.map(function(stat_obj){
    return `<strong>${stat_obj.stat.name}:</strong> ${stat_obj.base_stat}`
  })
  $('[data-toggle="popover"]').popover({
    placement : "top",
    trigger: 'click',
    animation: true,
    template: `<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div><div class="popover-footer"><a href="#" data-team=${element.dataset.team} data-pokemon-name=${name} class="btn evolve btn-primary btn-sm">Evolve!</a><a href="#" class="btn exit btn-danger btn-sm">Remove</a></div></div>`
   })
  $('[data-toggle="popover"]').attr("data-content", `${createTypeElement(poke_types)}
  <br>${poke_stats.join("<br>")}`)
}

// takes in an array of types and creates span elements to be displayed in the popup
function createTypeElement(types) {
  return types.map(function(type){
    return `<span class="type ${type} left">${type}</span>`
  }).join("")
}
// takes pokemon_obj and creates <a> element with attributes from pokemon_obj to be displayed on page
function createPokemonLink(pokemon_obj) {
  if (pokemon_obj.team == "pokemon"){
    var div = 'pokemon'
  } else {
    var div = 'matchup'
  }
  let data_attr = `data-team="${div}" data-toggle="popover" data-html="true" data-placement="bottom" data-content="" data-pokemon-name='${pokemon_obj.name}' data-roster=${div}`
  let title = `title=${pokemon_obj.name[0].toUpperCase() + pokemon_obj.name.slice(1)}`
  let events = `onclick="pokemonInfo(this, '${pokemon_obj.name}')"`

  let a_tag = `<a href='#' ${data_attr} ${title} ${events}>`
  $('.container').find(`.${div}:empty:first`).html(a_tag + "<img src=" + pokemon_obj.sprite + "></a>")
}

// on popover, calls removePokemon if remove button is clicked
$(document).on("click", ".popover-footer .btn.exit", function(){
  Roster.removePokemon($(this).parent().parent().parent().children()[0])
});

// on popover, "evolves" pokemon by replacing current Pokemon with evolved form, using evo obj as reference to pokemon evolution chains
$(document).on("click", ".popover-footer .btn.evolve" , function(){
  // find the pokemon in all Pokes
  var old_pokemon = grabPokemon($(this)[0].dataset.pokemonName)
  // find the next evolution
  if (evo[old_pokemon.name] == undefined) {
    // if pokemon evolution doesn't exist
    alert(`${old_pokemon.name[0].toUpperCase() + old_pokemon.name.slice(1)} does not evolve anymore.`)
  } else {
    // if pokemon exists
    if (evo[old_pokemon.name].length > 1) {
      // check if pokemon can evolve into more than one pokemon and randomly choose one
      let index = Math.floor(Math.random() * evo[old_pokemon.name].length)
      var old = $(this).parent().parent().parent().children()[0]
      removePokemon(old)
      Pokemon.intialize(evo[old_pokemon.name][index], $(this)[0].dataset.team).
      then(function(pokemon){
        createPokemonLink(pokemon)
      })
    } else {
      // evolve pokemon
      var old = $(this).parent().parent().parent().children()[0]
      removePokemon(old)
      Pokemon.intialize(evo[old_pokemon.name][0], $(this)[0].dataset.team).
      then(function(pokemon){
        createPokemonLink(pokemon)
      })
    }
  }
  $(this).parents(".popover").popover('hide');
});
