// Array

const ChaiFlavours: string[] = ["Ginger Chai", "Kashmiri Chai"]; // string array
const ChaiPrice: number[] = [29, 33]; // number array

const rating: Array<number> = [5.0, 3.5]; // we can also declare array's datatype like this.

// array of object

type Chai = {
  name: string;
  price: number;
  isHot: boolean;
};

const menu: Chai[] = [
  {
    name: "Ginger Chai",
    price: 34,
    isHot: true,
  },
  {
    name: "Kashmiri Chai",
    price: 21,
    isHot: false,
  },
  {
    name: "Chocolate Chai",
    price: 55,
    isHot: false,
  },
  {
    name: "Irani Chai",
    price: 100,
    isHot: false,
  },
];

// readonly array

// means we can't modify the value of this array

const Menu: readonly Chai[] = [
  {
    name: "Ginger Chai",
    price: 34,
    isHot: true,
  },
  {
    name: "Kashmiri Chai",
    price: 21,
    isHot: false,
  },
];

// Menu.push(); // here ts throw a error that Menu don't has push property

// multi dimensional array

const HotelMenu: number[][] = [
  [10, 1023, 233],
  [34, 10, 44],
  [54, 70, 78],
];

// Tuples

// Tuples is kinda array but with some restrictions

// we can make some value optional,like 3rd value of this tuple is optional
let ChaiTuple: [string, number, string?];
ChaiTuple = ["Kashmiri Chai", 12, "Ginger Chai"];
ChaiTuple = ["Ginger Chai", 100];

// Readonly Tuples
const UserInfo: readonly [string, string, number] = [
  "Gouranga Das Samrat",
  "Khulna",
  5,
];

// named tuple
const ChaiItem: [name: string, price: number] = ["Ginger Chai", 2];
