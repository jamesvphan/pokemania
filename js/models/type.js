const Type = (function() {
  'use strict';

  let numTypes = 18
  return class Type {
    //...
    static all(){
      let types = []
      for (var currentType = 1; currentType <= numTypes; currentType++) {
        types.push(Api.getJSON(`type/${currentType}/`))
      }
      return Promise.all(types)
      .then((types) => {
        return types.reduce((acc, type) => {
          return acc.concat(type)
        }, [])
      }).
    }
  }
}());
