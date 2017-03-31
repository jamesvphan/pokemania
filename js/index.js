

// On clicking button to add pokemon, creates a new Pokemon object, and displays respective <a> element
function plsWork(object) {
  // submit controller
  $(".pokeSubmit").on("click", function() {
    event.preventDefault()
    var input = $("#numOrName").val()
    if (this.id == "your-roster") {
      var team = 1
    } else {
      var team = 2
    }
    if (team == 1 && store.state.your_roster.length >= 6) {
      alert("Your roster is maxed out!")
    } else if (team == 2 && store.state.enemy_roster.length >= 6) {
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

function plsBattle() {
  //battle controller
  $("#dispBattle").on("click", function() {
    let battle = new Battle(store.state.your_roster, store.state.enemy_roster)
    var results = battle.pokeBattle()
    var matches = jQuery.unique(results[0]).sort()
    var winner = results[1]
    //battle view
    $('.modal-body').html(matches.join("<br>") + "<br>" + "<strong>" + winner + "</strong>")
    $('#myModal').modal('show');
  })
}


// takes pokemon name and returns Pokemon object from allPokes array
// helper function
function grabPokemon(name) {
  return store.findPokemon("pokemon", name)
}

// takes <a> element and name from <a> element, and makes request to return stats of pokemon
// display info controller
function pokemonInfo(element, name) {
  let pokemon = grabPokemon(name)
  let poke_types = pokemon.types.map(function(type_obj){
    return type_obj.type.name
  })
  let poke_stats = pokemon.stats.map(function(stat_obj){
    return `<strong>${stat_obj.stat.name}:</strong> ${stat_obj.base_stat}`
  })
  // display info view
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
  // 
  if (pokemon_obj.team == 1){
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
function plsRemove() {
  $(document).on("click", ".popover-footer .btn.exit", function(){
    var poke_element = $(this).parent().parent().parent().children()[0]
    remove(poke_element)
  });
}

// on popover, "evolves" pokemon by replacing current Pokemon with evolved form, using evo obj as reference to pokemon evolution chains
function plsEvolve() {
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
        remove(old)
        if ($(this)[0].dataset.team == "pokemon") {
          var team = 1
        } else {
          var team = 2
        }
        Pokemon.initialize(evo[old_pokemon.name][index], team).
        then(function(pokemon){
          createPokemonLink(pokemon)
        })
      } else {
        // evolve pokemon
        var old = $(this).parent().parent().parent().children()[0]
        remove(old)
        if ($(this)[0].dataset.team == "pokemon") {
          var team = 1
        } else {
          var team = 2
        }
        Pokemon.initialize(evo[old_pokemon.name][0], team).
        then(function(pokemon){
          createPokemonLink(pokemon)
        })
      }
    }
    $(this).parents(".popover").popover('hide');
  });
}

function remove(poke_element) {
  if (poke_element.dataset.team == "pokemon") {
    var pokemon = store.state.your_roster.filter((pokemon) => pokemon.name == poke_element.dataset.pokemonName)
    var index = store.state.your_roster.indexOf(pokemon)
    store.state.your_roster.splice(index, 1)
  } else {
    var pokemon = store.state.enemy_roster.filter((pokemon) => pokemon.name == poke_element.dataset.pokemonName)
    var index = store.state.enemy_roster.indexOf(pokemon)
    store.state.enemy_roster.splice(index, 1)
  }
  $(poke_element).parent().empty()
}
