// Generics

// Generics types

function wrapInArray<T>(item: T): T[] {
  return [item];
}

wrapInArray("Ginger chai");
wrapInArray(34);

function pair<A, B, C>(a: A, b: B, c: C): [A, B, C] {
  return [a, b, c];
}

pair("iMac", "Bluetooth", 12);
pair("iPad", true, 12);
pair({ device: "iMac" }, true, 12);

// Generics interface
interface Box<T> {
  content: T;
}

const numberBox: Box<number> = {
  //we can write here number,string,bool every data type
  content: 10,
};

interface ApiPromise<T> {
  status: number;
  data: T;
}

const resp: ApiPromise<{ imgUrl: string }> = {
  status: 100,
  data: { imgUrl: "www.google.com" },
};
