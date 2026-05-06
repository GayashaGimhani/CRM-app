import { useState } from "react";

export default function LeadForm({ initialData = {}, onSubmit, buttonText }) {

  const salespersons = [
    "John Silva",
    "Nimal Perera",
    "Kamal Fernando",
    "Saman Jayasinghe",
    "Ravi Gunawardena"
  ];

  const [form, setForm] = useState({
    leadName: initialData.leadName || "",
    companyName: initialData.companyName || "",
    email: initialData.email || "",
    phoneNumber: initialData.phoneNumber || "",
    leadSource: initialData.leadSource || "",
    assignedSalesperson: initialData.assignedSalesperson || "",
    status: initialData.status || "New",
    dealValue: initialData.dealValue || ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // ✅ VALIDATION
  const validate = () => {
    let newErrors = {};

    if (!form.leadName) newErrors.leadName = "Lead Name is required";
    if (!form.companyName) newErrors.companyName = "Company Name is required";

    if (!form.email.match(/^\S+@\S+\.\S+$/)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.phoneNumber.match(/^[0-9]{10}$/)) {
      newErrors.phoneNumber = "Phone must be 10 digits";
    }

    if (!form.assignedSalesperson) {
      newErrors.assignedSalesperson = "Select a salesperson";
    }

    if (!form.dealValue) {
      newErrors.dealValue = "Deal value required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <div className="bg-white p-6 shadow rounded space-y-3">

      {/* LEAD NAME */}
      <input
        name="leadName"
        value={form.leadName}
        onChange={handleChange}
        placeholder="Lead Name"
        className="border p-2 w-full"
      />
      {errors.leadName && <p className="text-red-500 text-sm">{errors.leadName}</p>}

      {/* COMPANY */}
      <input
        name="companyName"
        value={form.companyName}
        onChange={handleChange}
        placeholder="Company Name"
        className="border p-2 w-full"
      />
      {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}

      {/* EMAIL */}
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="border p-2 w-full"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      {/* PHONE */}
      <input
        name="phoneNumber"
        value={form.phoneNumber}
        onChange={handleChange}
        placeholder="Phone (10 digits)"
        className="border p-2 w-full"
      />
      {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}

      {/* LEAD SOURCE */}
      <input
        name="leadSource"
        value={form.leadSource}
        onChange={handleChange}
        placeholder="Lead Source"
        className="border p-2 w-full"
      />

      {/* SALES PERSON DROPDOWN */}
      <select
        name="assignedSalesperson"
        value={form.assignedSalesperson}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="">Select Salesperson</option>
        {salespersons.map((person) => (
          <option key={person} value={person}>
            {person}
          </option>
        ))}
      </select>
      {errors.assignedSalesperson && (
        <p className="text-red-500 text-sm">{errors.assignedSalesperson}</p>
      )}

      {/* STATUS */}
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option>New</option>
        <option>Contacted</option>
        <option>Qualified</option>
        <option>Proposal Sent</option>
        <option>Won</option>
        <option>Lost</option>
      </select>

      {/* DEAL VALUE */}
      <input
        name="dealValue"
        value={form.dealValue}
        onChange={handleChange}
        placeholder="Deal Value"
        className="border p-2 w-full"
      />
      {errors.dealValue && <p className="text-red-500 text-sm">{errors.dealValue}</p>}

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white w-full py-2"
      >
        {buttonText}
      </button>

    </div>
  );
}