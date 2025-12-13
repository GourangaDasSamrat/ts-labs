// function

function makeChai(type: string, cups: number): string {
  //here's we define that type should be string, cups should be number the the thing we return from this function should be string.
  return `Making ${cups} cups ${type} chai.`;
}

console.log(makeChai("Ginger", 3));

// optional parameter

// optional parameter means we said ts that is parameter is optional, means if we passwd a argument when invoke this function or not ts don't throw any error.

function orderChai(name?: string) {} // here name is optional

// default value of parameter

// its already exist on javascript, means we set a default value for a parameter, so if we can't pass any value on invocation time, thats value will be use.

function getChai(name: string = "Ginger Chai") {} // her the default value of name is `Ginger Chai`

function createChai(order: { name: string; price: number; quantity: number }) {}
