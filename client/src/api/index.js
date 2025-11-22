const API_URL = "";

// Auth API
export const signin = async (user) => {
  const response = await fetch(`${API_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const signout = async () => {
  const response = await fetch(`${API_URL}/auth/signout`, {
    method: "GET",
  });
  return response.json();
};

export const signup = async (user) => {
  const response = await fetch(`${API_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

// Contact API
export const createContact = async (contact) => {
  const response = await fetch(`${API_URL}/api/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });
  return response.json();
};

export const listContacts = async () => {
  const response = await fetch(`${API_URL}/api/contacts`, {
    method: "GET",
  });
  return response.json();
};

export const updateContact = async (contactId, contact, token) => {
  const response = await fetch(`${API_URL}/api/contacts/${contactId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(contact),
  });
  return response.json();
};

export const deleteContact = async (contactId, token) => {
  const response = await fetch(`${API_URL}/api/contacts/${contactId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

// Qualification/Education API
export const createQualification = async (qualification, token) => {
  const response = await fetch(`${API_URL}/api/qualifications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(qualification),
  });
  return response.json();
};

export const listQualifications = async () => {
  const response = await fetch(`${API_URL}/api/qualifications`, {
    method: "GET",
  });
  return response.json();
};

export const updateQualification = async (qualificationId, qualification, token) => {
  const response = await fetch(`${API_URL}/api/qualifications/${qualificationId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(qualification),
  });
  return response.json();
};

export const deleteQualification = async (qualificationId, token) => {
  const response = await fetch(`${API_URL}/api/qualifications/${qualificationId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

// Project API
export const createProject = async (project, token) => {
  const response = await fetch(`${API_URL}/api/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(project),
  });
  return response.json();
};

export const listProjects = async () => {
  const response = await fetch(`${API_URL}/api/projects`, {
    method: "GET",
  });
  return response.json();
};

export const updateProject = async (projectId, project, token) => {
  const response = await fetch(`${API_URL}/api/projects/${projectId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(project),
  });
  return response.json();
};

export const deleteProject = async (projectId, token) => {
  const response = await fetch(`${API_URL}/api/projects/${projectId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
