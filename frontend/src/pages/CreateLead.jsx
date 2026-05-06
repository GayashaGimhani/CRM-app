import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import LeadForm from "../components/LeadForm";

export default function CreateLead() {
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      await API.post("/leads", formData);
      alert("Lead created successfully!");
      navigate("/leads");
    } catch (err) {
      console.log(err);
      alert("Failed to create lead");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Create Lead</h1>

      <LeadForm
        onSubmit={handleCreate}
        buttonText="Create Lead"
      />
    </div>
  );
}