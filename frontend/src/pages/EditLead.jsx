import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import LeadForm from "../components/LeadForm";

export default function UpdateLead() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const res = await API.get(`/leads/${id}`);
       setLead({
      ...res.data,
      phoneNumber: res.data.phoneNumber || ""
    });
      } catch (err) {
        console.log(err);
        alert("Failed to load lead");
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      await API.put(`/leads/${id}`, data);
      alert("Lead Updated Successfully!");
      navigate("/leads"); 
    } catch (err) {
      console.log(err);
      alert("Failed to update lead");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!lead) return <p>Lead not found</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Edit Lead</h2>

      <LeadForm
        initialData={lead}
        onSubmit={handleUpdate}
        buttonText="Update Lead"
      />
    </div>
  );
}