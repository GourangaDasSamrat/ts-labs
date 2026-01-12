// oop

class Chai {
  constructor(flavour: string, price: number) {
    this.flavour = flavour;
    this.price = price;
  }
  flavour: string;
  price: number;
}

const GingerChai = new Chai("Ginger", 34);

// access modifier

// public keys
class Menu {
  public flavour: string = "Ginger Chai";
}

// private keys
//  is only available on this class, we can't access this outside this class

class myChai {
  private _secretIngredients = "Cardamon"; // write private values with _ is a good practice
  // #secretIngredients = "Cardamon"; // we can also declare private keys like this,cause end of the day this is javascript

  // here we use the private key
  reveal() {
    return this._secretIngredients;
  }
}

// protected keys
// it's available inside this class and also available if we extend this class

class Shop {
  protected shopName = "Chai corner";
}

class Branch extends Shop {
  getName() {
    return this.shopName; // here we use protected keys
  }
}

// readonly keys
// it's like other readonly values in typescript, means we can declare the readonly values one time, we can use them anywhere but can't modify values.

class Cup {
  readonly cupSize: number = 10;
}

// controlled access

class MyChai {
  private _sugar = 100;

  // getter
  public get sugar(): number {
    //we also can write without public keyword
    return this._sugar;
  }

  // setter
  public set sugar(v: number) {
    if (v > 200) throw new Error("Too much sugar");
    this._sugar = v;
  }
}

// use getter and setter members

const Chai1 = (new MyChai().sugar = 2);

// static members
//static values are accessible in class,not object.

class ApiEndPoint {
  static response: string = "Serving";
}

ApiEndPoint.response; // like here we access response without create new object

// abstract class
// means this class can;t allow to create object like in general class

abstract class Drink {
  abstract make(): void;
}

// implement it
class MyDrink extends Drink {
  make(): void {
    console.log(`i'm from an extends abstract class`);
  }
}

// composition

class Heater {
  heat() {}
}

class MakeChai {
  constructor(private heater: Heater) {}

  make() {
    this.heater.heat;
  }
}
