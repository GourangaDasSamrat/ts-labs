// types
type ChaiOrder = {
  type: string;
  sugar: number;
  strong: boolean;
};

function makeChai(order: ChaiOrder) {
  console.log(order);
}

function orderChai(order: ChaiOrder) {
  console.log(order);
}

type TeaRecipe = {
  water: number;
  milk: number;
};

class GingerChai implements TeaRecipe {
  water = 100;
  milk = 300;
}

type CupSize = "small" | "Medium" | "large";

// class KashmiriChai implements CupSize {}  //this line throw an error cause class don't allow to implement custom types

// thats why we need interface

// Interface

interface CupSize2 {
  size: "small" | "medium" | "large";
}

class KashmiriChai implements CupSize2 {
  size: "small" | "medium" | "large" = "large";
}

// other case where we need interface instead of type

type Response = { ok: true } | { ok: false };

// class apiRes implements Response {}   // same issue here , cause if we use | sing we and want to use in class then we must need interface instead of type

// | sign called union

// Intersection

//  Intersection means add two or more things , and its sign is &

type BaseChai = {
  chaiName: string;
  teaLeaves: number;
  milk: number;
};

// ts force us to use all things on type, but here come optional value

// Optional value
type Extra = {
  ginger: number;
  water?: number; //but in this case we use ?,means ts won't force use to use water, means we make water optional
};

type GingerTea = BaseChai & Extra;

// Readonly
// we can't reassign read-only value

type Config = {
  readonly appName: string;
  version: number;
};

const cfg: Config = {
  appName: "facebook",
  version: 1.2,
};

// cfg.appName='YouTube' //this line throw error cause we can't reassign read-only value
