import "./App.css";
import { Counter, StudentCard, students } from "./components";

const App = () => {
  return (
    <>
      <StudentCard students={students} />
      <Counter />
    </>
  );
};

export default App;
