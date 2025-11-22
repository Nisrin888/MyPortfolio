import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  listQualifications,
  createQualification,
  updateQualification,
  deleteQualification,
} from "../api";

export default function Education() {
  const { isAdmin, token } = useAuth();
  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formValues, setFormValues] = useState({
    title: "",
    firstname: "",
    lastname: "",
    email: "",
    completion: "",
    description: "",
  });

  useEffect(() => {
    fetchQualifications();
  }, []);

  const fetchQualifications = async () => {
    try {
      const data = await listQualifications();
      if (Array.isArray(data)) {
        setQualifications(data);
      }
    } catch (err) {
      console.error("Error fetching qualifications:", err);
    }
    setLoading(false);
  };

  const handleChange = (name) => (event) => {
    setFormValues({ ...formValues, [name]: event.target.value });
    setError("");
  };

  const resetForm = () => {
    setFormValues({
      title: "",
      firstname: "",
      lastname: "",
      email: "",
      completion: "",
      description: "",
    });
    setEditingId(null);
    setShowForm(false);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      let data;
      if (editingId) {
        data = await updateQualification(editingId, formValues, token);
      } else {
        data = await createQualification(formValues, token);
      }

      if (data.error) {
        setError(data.error);
      } else {
        setSuccess(editingId ? "Qualification updated successfully!" : "Qualification created successfully!");
        resetForm();
        fetchQualifications();
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleEdit = (qualification) => {
    setFormValues({
      title: qualification.title,
      firstname: qualification.firstname,
      lastname: qualification.lastname,
      email: qualification.email,
      completion: qualification.completion ? qualification.completion.split("T")[0] : "",
      description: qualification.description,
    });
    setEditingId(qualification._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this qualification?")) return;

    try {
      const data = await deleteQualification(id, token);
      if (data.error) {
        setError(data.error);
      } else {
        setSuccess("Qualification deleted successfully!");
        fetchQualifications();
      }
    } catch (err) {
      setError("Failed to delete qualification.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  if (loading) {
    return (
      <div className="min-h-screen py-20 px-6 flex items-center justify-center">
        <div className="text-purple-400 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent mb-4">
            Education
          </h1>
          <div className="w-24 h-1 bg-purple-500 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My academic journey and the knowledge that shapes my development skills
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm max-w-2xl mx-auto">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm max-w-2xl mx-auto">
            {success}
          </div>
        )}

        {isAdmin() && (
          <div className="mb-8 text-center">
            <button
              onClick={() => {
                resetForm();
                setShowForm(!showForm);
              }}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 font-medium"
            >
              {showForm ? "Cancel" : "Add New Qualification"}
            </button>
          </div>
        )}

        {showForm && isAdmin() && (
          <div className="mb-12 max-w-2xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-900/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-purple-400 mb-4">
                {editingId ? "Edit Qualification" : "Add New Qualification"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-purple-400 mb-2">First Name</label>
                    <input
                      type="text"
                      value={formValues.firstname}
                      onChange={handleChange("firstname")}
                      required
                      className="w-full bg-gray-900/50 border border-purple-900/30 rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-400 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={formValues.lastname}
                      onChange={handleChange("lastname")}
                      required
                      className="w-full bg-gray-900/50 border border-purple-900/30 rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-400 mb-2">Title/Degree</label>
                  <input
                    type="text"
                    value={formValues.title}
                    onChange={handleChange("title")}
                    placeholder="e.g., Software Engineering Technician"
                    required
                    className="w-full bg-gray-900/50 border border-purple-900/30 rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-400 mb-2">Email</label>
                  <input
                    type="email"
                    value={formValues.email}
                    onChange={handleChange("email")}
                    required
                    className="w-full bg-gray-900/50 border border-purple-900/30 rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-400 mb-2">Completion Date</label>
                  <input
                    type="date"
                    value={formValues.completion}
                    onChange={handleChange("completion")}
                    required
                    className="w-full bg-gray-900/50 border border-purple-900/30 rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-400 mb-2">Description</label>
                  <textarea
                    value={formValues.description}
                    onChange={handleChange("description")}
                    rows={4}
                    required
                    className="w-full bg-gray-900/50 border border-purple-900/30 rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 font-medium"
                >
                  {editingId ? "Update Qualification" : "Create Qualification"}
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="space-y-8">
          {qualifications.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              No qualifications found. {isAdmin() && "Add your first qualification above!"}
            </div>
          ) : (
            qualifications.map((qualification) => (
              <div key={qualification._id} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-purple-400/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-gray-900/50 backdrop-blur-sm border border-purple-900/30 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-6 flex-1">
                      <div className="text-4xl p-3 rounded-xl bg-purple-600/20">
                        🎓
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-purple-400 mb-2">
                          {qualification.title}
                        </h2>
                        <h3 className="text-xl text-gray-300 mb-2">
                          {qualification.firstname} {qualification.lastname}
                        </h3>
                        <p className="text-purple-300 font-medium mb-3">
                          Completed: {formatDate(qualification.completion)}
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                          {qualification.description}
                        </p>
                      </div>
                    </div>
                    {isAdmin() && (
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => handleEdit(qualification)}
                          className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 rounded-lg transition-colors text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(qualification._id)}
                          className="px-4 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg transition-colors text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
