import "./App.css";
import {
  AdmissionForm,
  Counter,
  StudentCard,
  students,
  Products
} from "./components";

const App = () => {
  return (
    <>
      <StudentCard students={students} />
      <Counter />
      <AdmissionForm />
      <Products />
    </>
  );
};

export default App;
