import type { Card } from "../types";
import Counter from "./Counter";
import StudentCard from "./StudentCard";

const students: Card[] = [
  { name: "John Smith", roll: 101, age: 17, gender: "Male", isPresent: true },
  {
    name: "Emily Johnson",
    roll: 102,
    age: 16,
    gender: "Female",
    isPresent: false,
  },
  {
    name: "Michael Brown",
    roll: 103,
    age: 18,
    gender: "Male",
    isPresent: true,
  },
  {
    name: "Sophia Williams",
    roll: 104,
    age: 17,
    gender: "Female",
    isPresent: true,
  },
  {
    name: "Daniel Jones",
    roll: 105,
    age: 16,
    gender: "Male",
    isPresent: false,
  },
  {
    name: "Olivia Garcia",
    roll: 106,
    age: 17,
    gender: "Female",
    isPresent: true,
  },
  { name: "James Miller", roll: 107, age: 18, gender: "Male", isPresent: true },
  { name: "Ava Davis", roll: 108, age: 16, gender: "Female", isPresent: false },
  {
    name: "William Rodriguez",
    roll: 109,
    age: 17,
    gender: "Male",
    isPresent: true,
  },
  {
    name: "Isabella Martinez",
    roll: 110,
    age: 16,
    gender: "Female",
    isPresent: true,
  },
  {
    name: "Ethan Hernandez",
    roll: 111,
    age: 18,
    gender: "Male",
    isPresent: false,
  },
  { name: "Mia Lopez", roll: 112, age: 17, gender: "Female", isPresent: true },
  {
    name: "Alexander Gonzalez",
    roll: 113,
    age: 18,
    gender: "Male",
    isPresent: true,
  },
  {
    name: "Charlotte Wilson",
    roll: 114,
    age: 16,
    gender: "Female",
    isPresent: false,
  },
  {
    name: "Benjamin Anderson",
    roll: 115,
    age: 17,
    gender: "Male",
    isPresent: true,
  },
  {
    name: "Amelia Thomas",
    roll: 116,
    age: 16,
    gender: "Female",
    isPresent: true,
  },
  {
    name: "Henry Taylor",
    roll: 117,
    age: 18,
    gender: "Male",
    isPresent: false,
  },
  {
    name: "Harper Moore",
    roll: 118,
    age: 17,
    gender: "Female",
    isPresent: true,
  },
  {
    name: "Lucas Jackson",
    roll: 119,
    age: 16,
    gender: "Male",
    isPresent: true,
  },
  {
    name: "Ella Martin",
    roll: 120,
    age: 17,
    gender: "Female",
    isPresent: false,
  },
];

export { Counter, StudentCard, students };
