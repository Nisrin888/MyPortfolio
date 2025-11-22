import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  listProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../api";

export default function Projects() {
  const { isAdmin, token } = useAuth();
  const [projects, setProjects] = useState([]);
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
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await listProjects();
      if (Array.isArray(data)) {
        setProjects(data);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
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
        data = await updateProject(editingId, formValues, token);
      } else {
        data = await createProject(formValues, token);
      }

      if (data.error) {
        setError(data.error);
      } else {
        setSuccess(editingId ? "Project updated successfully!" : "Project created successfully!");
        resetForm();
        fetchProjects();
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleEdit = (project) => {
    setFormValues({
      title: project.title,
      firstname: project.firstname,
      lastname: project.lastname,
      email: project.email,
      completion: project.completion ? project.completion.split("T")[0] : "",
      description: project.description,
    });
    setEditingId(project._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const data = await deleteProject(id, token);
      if (data.error) {
        setError(data.error);
      } else {
        setSuccess("Project deleted successfully!");
        fetchProjects();
      }
    } catch (err) {
      setError("Failed to delete project.");
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
            My Projects
          </h1>
          <div className="w-24 h-1 bg-purple-500 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Exploring creativity through code - here are some of my recent works
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
              {showForm ? "Cancel" : "Add New Project"}
            </button>
          </div>
        )}

        {showForm && isAdmin() && (
          <div className="mb-12 max-w-2xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-900/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-purple-400 mb-4">
                {editingId ? "Edit Project" : "Add New Project"}
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
                  <label className="block text-sm font-medium text-purple-400 mb-2">Project Title</label>
                  <input
                    type="text"
                    value={formValues.title}
                    onChange={handleChange("title")}
                    placeholder="e.g., Portfolio Website"
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
                  {editingId ? "Update Project" : "Create Project"}
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-12">
              No projects found. {isAdmin() && "Add your first project above!"}
            </div>
          ) : (
            projects.map((project) => (
              <div key={project._id} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-purple-400/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-gray-900/50 backdrop-blur-sm border border-purple-900/30 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-2">
                  <div className="relative h-48 overflow-hidden bg-purple-600/20 flex items-center justify-center">
                    <div className="text-6xl">📁</div>
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-bold text-purple-400 mb-2">
                      {project.title}
                    </h2>
                    <p className="text-gray-400 text-sm mb-2">
                      By: {project.firstname} {project.lastname}
                    </p>
                    <p className="text-purple-300 text-xs mb-3">
                      Completed: {formatDate(project.completion)}
                    </p>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {isAdmin() && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="flex-1 py-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 rounded-lg transition-colors text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="flex-1 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg transition-colors text-sm"
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
