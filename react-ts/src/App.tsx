import "./App.css";
import { AdmissionForm, Counter, StudentCard, students } from "./components";

const App = () => {
  return (
    <>
      <StudentCard students={students} />
      <Counter />
      <AdmissionForm />
    </>
  );
};

export default App;
