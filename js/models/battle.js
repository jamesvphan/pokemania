class Battle {
  pokeBattle() {
    var matches = []
    var score = 0
    for (var i = 0; i < your_roster.pokemon.length; i++) {
      var ypoke = your_roster[i]
      for (var j = 0; j < enemy_roster.pokemon.length; j++) {
        var epoke = enemy_roster[j]
        var yourscore = ypoke.stats.reduce(function(total, stat) {
          return total + stat.base_stat
        }, 0)
        var enemyscore = epoke.stats.reduce(function(total, stat) {
          return total + stat.base_stat
        }, 0)
        for (var k = 0; k < ypoke.weak_to.length; k++) {
          var yweak = ypoke.weak_to[k]
          for (var l = 0; l < epoke.types.length; l++) {
            var etype = epoke.types[l].name
            if (yweak == etype) {
              var yourscore = yourscore*0.5
            }
          }
        }
        for (var k = 0; k < ypoke.not_weak_to.length; k++) {
          var ynotweak = ypoke.not_weak_to[k]
          for (var l = 0; l < epoke.types.length; l++) {
            var etype = epoke.types[l].name
            if (ynotweak == etype) {
              var yourscore = yourscore*2
            }
          }
        }
        for (var k = 0; k < ypoke.super_effective.length; k++) {
          var ysupereff = ypoke.super_effective[k]
          for (var l = 0; l < epoke.types.length; l++) {
            var etype = epoke.types[l].name
            if (ysupereff == etype) {
              var enemyscore = enemyscore*0.5
            }
          }
        }
        for (var k = 0; k < ypoke.not_very_effective.length; k++) {
          var ynotveff = ypoke.not_very_effective[k]
          for (var l = 0; l < epoke.types.length; l++) {
            var etype = epoke.types[l].name
            if (ynotveff == etype) {
              var enemyscore = enemyscore*2
            }
          }
        }
        if (yourscore < enemyscore) {
          matches.push(`Your ${ypoke.name} loses to the enemy ${epoke.name}!`)
          score--
        } else if (yourscore > enemyscore) {
          matches.push(`Your ${ypoke.name} beats the enemy ${epoke.name}!`)
          score++
        } else {
          matches.push(`Your ${ypoke.name} and the enemy ${epoke.name} draw!`)
        }
      }
    }
    if (score == 0) {
      var winner = "Inconceivable! A draw!"
    } else if (score > 0) {
      var winner = "You won, congratulations!"
    } else {
      var winner = "The enemy has a better lineup!"
    }
    var results = [matches, winner]
    return results
  }
}
