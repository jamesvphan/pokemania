// let store = new Store()
// let your_roster = new Roster()
// let enemy_roster = new Roster()
// let allPokes = new Roster()
//
//
// var newBattle = new Battle(your_roster, enemy_roster)
// newBattle.pokeBattle()

$(() => {
  $(document).on({
      ajaxStart: function() { $("body").addClass("loading");   },
      ajaxStop: function() { $("body").removeClass("loading"); }
  });
  Type.all()
  .then((types) => {
    var $where = $(".pokeSubmit")
    let psController = new PokemonSearchController($where, types)
    plsWork()
    plsRemove()
    plsEvolve()
    plsBattle()
    // Creates 2 rosters
    // binds events to button clicks
  })
})
