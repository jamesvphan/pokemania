class Pokemon {
  constructor(number, name, types, sprite) {
    this.number = number,
    this.name = name,
    this.types = types,
    this.sprite = sprite
    roster.push(this)
  }
  static find(numOrName) {
    return $.get(`https://pokeapi.co/api/v2/pokemon/${numOrName}`).
    then((pokemon) => {
      var sprite = `https://assets-lmcrhbacy2s.stackpathdns.com/img/pokemon/animated/${pokemon.name}.gif`
      return new Pokemon(pokemon.id, pokemon.name, pokemon.types, sprite)
    })
  }
}

var roster = []

$(function() {
  $(".pokeSubmit").on("click", function() {
    event.preventDefault()
    if (this.id === "1") {
      var input = $("#numOrName1").val()
      var div = "pokemon"
    } else {
      var input = $("#numOrName2").val()
      var div = "matchup"
    }
    Pokemon.find(input).
    then(function(pokemon){
      let a_tag = `<a href='#' data-pokemon-name='${pokemon.name}' onmouseover='pokemonInfo(this, "${pokemon.name}")' onclick="removePokemon(this)">`
      $('.container').find(`.${div}:empty:first`).html(a_tag + "<img src=" + pokemon.sprite + "></a>")
    })
  })
})

function removePokemon(pokemon) {
  let i = pokemon
  $(i).parent().empty()
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
