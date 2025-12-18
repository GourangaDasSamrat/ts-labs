import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState<number>(0);

  const handleAddStudent = () => setCount((prev) => prev + 1);

  return (
    <div className="counter-card">
      <h2 className="counter-title">Student Counter</h2>

      <p className="counter-value">{count}</p>

      <button type="button" className="counter-btn" onClick={handleAddStudent}>
        Add Student
      </button>
    </div>
  );
};

export default Counter;
