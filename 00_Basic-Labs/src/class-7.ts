// object

// object without type declaration

const chai = {
  chaiName: "Kashmiri Chai",
  price: 40,
  isHot: false,
};

// object with type declaration

let tea: {
  teaName: string;
  price: number;
  isHot: boolean;
};

tea = {
  teaName: "Ginger Chai",
  price: 30,
  isHot: true,
};

// aliased object

type Tea = {
  teaName: string;
  price: number;
  ingredients: string[];
};

const gingerChai: Tea = {
  teaName: "Ginger Chai",
  price: 30,
  ingredients: ["tea leaves", "Ginger", "Milk", "Water"],
};

// duck typing

type Cup = { size: string };

let smallCup: Cup = { size: "200ml" };
let bigCup = {
  size: "400ml",
  price: 30,
};

smallCup = bigCup; //ts don't show any error here cause in smallCup, the bare minimum requirement is size, so ts don't care about you add more property or not.

// another example

type Brew = { brewTime: number };
const coffee = {
  brewTime: 3,
  beans: "African",
};

const chaiBrew: Brew = coffee; //ts also don't throw any error here cause the same reason that describe in 49 line.

// split out datatype

// means separately declare new datatype instead of declare it on the go.

type User = {
  name: string;
  password: string;
  id: number;
};

type Address = {
  street: string;
  postcode: number;
};

type UserData = {
  pin: number;
  user: User[];
  address: Address[];
};

// Partial object

// it's means we can partially update the function with parameters, but here's a problem, we can also update a function without pass any parameters inside it, that's a problem like line number 98.

type Chai = {
  name: string;
  price: number;
  isHot: boolean;
};

const updatedChai = (updates: Partial<Chai>) => {
  console.log(`Updating chai with ${updates}`);
};

updatedChai({ price: 30 });
updatedChai({ isHot: true });
updatedChai({});

// Required object

// its totally opposite of Partial, means on type declaration if you make any property optional, it's force you to use all of the property in the type on your function.

type ChaiOrder = {
  name?: string;
  quantity?: number;
};

const placeOrder = (order: Required<ChaiOrder>) => {
  console.log(`Place chai order with ${order}`);
};

placeOrder({
  name: "Ginger Chai",
  quantity: 44,
});

// Pick object

// pick is kinda mixer or Required and partially, means heres we have power to chose which property is required and which is optional.

type ChaiOrder2 = {
  name: string;
  price: number;
  isHot: boolean;
  ingredients: string[];
};

type BasicChaiInfo = Pick<ChaiOrder2, "name" | "isHot">; // here we make name and isHot required and another properties are optional

const ChaiInfo: BasicChaiInfo = {
  name: "Ginger Chai",
  isHot: true,
};

// Omit object

// its hide a property which we select from an data type

type NewChai = {
  name: string;
  price: number;
  isHot: boolean;
  secretIngredients: string[];
};

type PublicChai = Omit<NewChai, "secretIngredients">;
