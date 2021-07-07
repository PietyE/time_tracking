

export const currencyListMapper = (currenciesArray) => {
   if (!currenciesArray || !Array.isArray(currenciesArray) || !currenciesArray.length) {
     return [];
   }
     const result = currenciesArray.map(item => ({name: item.code}));
   return result;
}



// var result = arr.map(person => ({ value: person.id, text: person.name }));

// const mapped = obj.map(({ a, b }) => ({ a, b }));

// let modified = data.map(obj => ({a: obj.a, b: obj.b}))