// union

let age: string | number = 100;

let airlineSeat: "window" | "aisle" | "baseline" = "baseline";

// any

let orders = ["10", "30", "45", "55"];
let currentOrder; // it's default datatype is any

for (let i of orders) {
  if (i === "45") {
    currentOrder = i;
  }
}

console.log(currentOrder);
