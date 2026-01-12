import { useState } from "react";

interface AdmissionData {
  name: string;
  age: number | "";
  roll: number | "";
  gender: string;
  isPaid: boolean;
}

const AdmissionForm = () => {
  const [formData, setFormData] = useState<AdmissionData>({
    name: "",
    age: "",
    roll: "",
    gender: "",
    isPaid: false,
  });

  const [submittedData, setSubmittedData] = useState<AdmissionData | null>(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedData(formData);
  };

  return (
    <div className="form-card">
      <h2 className="title">Admission Form</h2>

      <form className="form" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Age */}
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            id="age"
            name="age"
            type="number"
            placeholder="17"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        {/* Roll */}
        <div className="form-group">
          <label htmlFor="roll">Roll Number</label>
          <input
            id="roll"
            name="roll"
            type="number"
            placeholder="101"
            value={formData.roll}
            onChange={handleChange}
            required
          />
        </div>

        {/* Gender */}
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Paid */}
        <div className="checkbox">
          <input
            id="isPaid"
            type="checkbox"
            name="isPaid"
            checked={formData.isPaid}
            onChange={handleChange}
          />
          <label htmlFor="isPaid">Admission Fee Paid</label>
        </div>

        <button type="submit" className="counter-btn">
          Submit
        </button>
      </form>

      {/* Display submitted data */}
      {submittedData && (
        <div className="result-card">
          <h3>Submitted Information</h3>
          <p>
            <strong>Name:</strong> {submittedData.name}
          </p>
          <p>
            <strong>Age:</strong> {submittedData.age}
          </p>
          <p>
            <strong>Roll:</strong> {submittedData.roll}
          </p>
          <p>
            <strong>Gender:</strong> {submittedData.gender}
          </p>
          <p>
            <strong>Fee Status:</strong>{" "}
            {submittedData.isPaid ? "Paid" : "Not Paid"}
          </p>
        </div>
      )}
    </div>
  );
};

export default AdmissionForm;
