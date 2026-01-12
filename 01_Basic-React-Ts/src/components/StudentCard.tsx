import type { Card } from "../types";

interface StudentCardProps {
  students: Card[];
}

const StudentCard = ({ students }: StudentCardProps) => {
  return (
    <div className="container">
      <h2 className="title">Our Students</h2>

      <div className="card-grid">
        {students.map((student) => (
          <div className="card" key={student.roll}>
            <h3>{student.name}</h3>

            <p>
              <strong>Roll:</strong> {student.roll}
            </p>
            <p>
              <strong>Age:</strong> {student.age}
            </p>
            <p>
              <strong>Gender:</strong> {student.gender}
            </p>

            <span
              className={`status ${student.isPresent ? "present" : "absent"}`}
            >
              {student.isPresent ? "Present" : "Absent"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentCard;
