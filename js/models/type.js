const Type = (function() {
  'use strict';

  let numTypes = 18
  return class Type {
    static all(){
      if (!!store.findTypes()[0]) {
        return new Promise((resolve) => {
          resolve(store.findTypes())
        })
      } else {
        let types = []
        for (var currentType = 1; currentType <= numTypes; currentType++) {
          types.push(Api.getJSON(`type/${currentType}/`))
        }
        return Promise.all(types)
        .then((types) => {
          var alltypes = types.reduce((acc, type) => {
            return acc.concat(type)
          }, [])
          store.addTypes(alltypes)
          return alltypes
        })
      }
    }
  }
}());
