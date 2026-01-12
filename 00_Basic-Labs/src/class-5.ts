// Type Assertion

let response: any = "300";

let numericLength: number = (response as string).length;

type Book = {
  name: string;
};

let bookString = `{'name':'You know JavaScript'}`;
let bookObject = JSON.parse(bookString) as Book;

let inputElement = document.getElementById("username") as HTMLInputElement;

// Type Unknown

// problem of any
let anyValue: any;

anyValue = "hello";
anyValue = 200;
anyValue = [23, 34, 22];
anyValue.toUpperCase(); //there should be an error but typescript not throw any error cause its data type is any, but after run these code its throw an error

// benefits of unknown
let unKnownValue: unknown;

unKnownValue = "hello";
unKnownValue = 200;
// unKnownValue.toUpperCase; //this line throw an error and said that `unKnownValue` has type unknown ,means typescript don't know its type
if (typeof unKnownValue === "string") {
  unKnownValue.toUpperCase();
}

// Type guard in error handling
try {
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
  console.error("Error", error);
}

// Type never

type Role = "admin" | "user";

function redirectBasedOnRole(role: Role): void {
  //void means i don't care about which thing i return,or if this function don't return anything i also don't care

  if (role === "admin") {
    console.log("Redirecting to admin dashboard");
    return;
  }
  if (role === "user") {
    console.log("Redirecting to user page");
    return;
  }
  role; // if all value's of role applied up, then the value of role is never, but if any value of role not used in up, then the value of role is that value.
}

function neverReturn(): never {
  while (true) {} //this function never return anything
}
