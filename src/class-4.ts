// Type Narrowing

function getChai(kind: string | number) {
  if (typeof kind === `string`) {
    return `Making ${kind} chai...`;
  }
  return `Chai order no:${kind}`;
}

function serveChai(msg?: string) {
  // ? means argument is optional
  if (msg) {
    return `Serving ${msg}`;
  }
  return `Serving default chai`;
}

function orderChai(size: "small" | "medium" | "large" | number) {
  if (size === "small") {
    return `Making Chai`;
  }
  if (size === "medium" || size === "large") {
    // || means medium or large
    return `Making extra chai`;
  }
  return `Chai order ${size}`;
}

// Type guards

class MilkChai {
  serve() {
    return `Serving milk chai`;
  }
}

class BlackChai {
  serve() {
    return `Serving black chai`;
  }
}

function serve(chai: MilkChai | BlackChai) {
  if (chai instanceof MilkChai) {
    return chai.serve();
  }
  return chai.serve();
}

// custom Type
type ChaiOrder = {
  name: string;
  sugar: number;
};

function isChaiOrder(obj: any): obj is ChaiOrder {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.name === "string" &&
    typeof obj.sugar === "number"
  );
}

function serveChaiOrder(item: ChaiOrder | string) {
  if (isChaiOrder(item)) {
    return `Serving ${item.name} chai with ${item.sugar}gm sugar.`;
  }
  return `Serving custom chai: ${item}`;
}

// more type narrowing
type GingerChai = {
  type: "ginger";
  amount: number;
};
type DirtyChai = {
  type: "dirty";
  spiceLevel: number;
};
type KashmiriChai = {
  type: "kashmiri";
  color: "pink" | "green";
};

type Chai = GingerChai | DirtyChai | KashmiriChai;

// check type
function MakeChai(order: Chai) {
  switch (order.type) {
    case "ginger":
      return `Ginger chai`;
      break;
    case "dirty":
      return `Dirty chai`;
      break;
    case "kashmiri":
      return `Kashmiri Chai`;
      break;
  }
}

// check property
function brew(order: KashmiriChai | DirtyChai) {
  if ("color" in order) {
  }
}

// unknown
// function isstringArray(arr: unknown): arr is string[] {}
