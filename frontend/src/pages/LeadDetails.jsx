import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";

export default function LeadDetails() {
  const { id } = useParams();

  const [lead, setLead] = useState(null);
  const [notes, setNotes] = useState([]);
  const [noteContent, setNoteContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLead();
    fetchNotes();
  }, [id]);

  // GET LEAD
  const fetchLead = async () => {
    try {
      const res = await API.get(`/leads/${id}`);
      setLead(res.data);
    } catch {
      alert("Failed to load lead");
    } finally {
      setLoading(false);
    }
  };

  // GET NOTES
  const fetchNotes = async () => {
    try {
      const res = await API.get(`/notes/${id}`);
      setNotes(res.data);
    } catch {
      console.log("Failed to load notes");
    }
  };

  // ADD NOTE
  const addNote = async () => {
    if (!noteContent.trim()) return;

    try {
      await API.post("/notes", {
        leadId: id,
        noteContent,
        createdBy: "admin"
      });

      setNoteContent("");
      fetchNotes();
    } catch {
      alert("Failed to add note");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!lead) return <p className="p-6">Lead not found</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lead Details</h1>

        <Link
          to="/leads"
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Back
        </Link>
      </div>

      {/* LEAD INFO */}
      <div className="bg-white p-6 rounded shadow mb-6 space-y-2">
        <p><b>Name:</b> {lead.leadName}</p>
        <p><b>Company:</b> {lead.companyName}</p>
        <p><b>Email:</b> {lead.email}</p>
        <p><b>Phone:</b> {lead.phoneNumber || "N/A"}</p>
        <p><b>Status:</b> {lead.status}</p>
        <p><b>Deal Value:</b> {lead.dealValue}</p>
        <p>
          <b>Created:</b>{" "}
          {new Date(lead.createdAt).toLocaleString()}
        </p>
        <p>
          <b>Last Updated:</b>{" "}
          {new Date(lead.updatedAt).toLocaleString()}
        </p>
      </div>

      {/* NOTES SECTION */}
      <div className="bg-white p-6 rounded shadow">

        <h2 className="text-xl font-bold mb-4">Notes</h2>

        {/* ADD NOTE */}
        <div className="flex gap-2 mb-4">
          <input
            className="border p-2 w-full"
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Add a note..."
          />

          <button
            onClick={addNote}
            className="bg-blue-600 text-white px-4"
          >
            Add
          </button>
        </div>

        {/* NOTES LIST */}
        <div className="space-y-2">

          {notes.length === 0 && (
            <p className="text-gray-500">No notes yet</p>
          )}

          {notes.map((n) => (
            <div
              key={n._id}
              className="border p-3 rounded bg-gray-50"
            >
              {/* NOTE TEXT */}
              <p className="text-gray-800">{n.noteContent}</p>

              {/* META INFO */}
              <p className="text-xs text-gray-500 mt-1">
                By <span className="font-medium">{n.createdBy}</span> •{" "}
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}