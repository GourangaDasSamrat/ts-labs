// Interface

interface Chai {
  flavor: string;
  price: number;
  milk?: number; // optional property
}

const GingerChai: Chai = {
  flavor: "Ginger Chai",
  price: 23,
};

interface Shop {
  readonly id: number; // readonly property
  name: string;
}

const ChaiStore: Shop = {
  id: 87,
  name: "Chai House",
};

// ChaiStore.id=98 // here ts throw an error cause id is readonly value so it's can't be reassign

// function in interface

interface DiscountCalc {
  (price: number): number;
}

const apply50: DiscountCalc = (p) => p * 0.5;

// methods in interface

interface TeaMachine {
  start(): void;
  stop(): void;
}

const machine: TeaMachine = {
  start() {
    console.log("start");
  },
  stop() {
    console.log("start");
  },
};

// index signature

interface ChaiRating {
  [flavour: string]: number;
}

const ratings: ChaiRating = {
  GingerChai: 3.5,
  KashmiriChai: 5,
  MilkChai: 2.8,
};

// interface merging

interface User {
  name: string;
}

interface User {
  age: number;
}

const newUser: User = {
  name: "Gouranga",
  age: 17,
};

// interface extends

interface A {
  a: string;
}
interface B {
  b: string;
}

interface C extends A, B {}

const extendedLetter: C = {
  a: "hello",
  b: "me",
};
