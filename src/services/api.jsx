import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

// REGISTROS DE USUARIOS

export const postRegister = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.log(error)
    const errorMessage = error.message;
    throw new Error(errorMessage);
  }
};

// LOGIN
export const postLogin = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.log(error)
    const errorMessage = error.message;
    throw new Error(errorMessage);

  }
}

//

export const getUserAll = async (token) => {
  try {

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_BASE_URL}/clients/all`, config);
    return response.data;
  } catch (error) {
    console.log(error)
    const errorMessage = error.message;
    throw new Error(errorMessage);

  }
}


export const deleteUserById = async (token, id) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(`${API_BASE_URL}/users/${id}`, config);
    return response.data;
  } catch (error) {
    console.log(error);
    const errorMessage = error.message;
    throw new Error(errorMessage);
  }
}


// Obtener todos los contactos
export const getContacts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/contacts/all`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error);
    const errorMessage = error.message;
    throw new Error(errorMessage);
  }
};

// Obtener un contacto por su ID
export const getContactById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/contacts/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    const errorMessage = error.message;
    throw new Error(errorMessage);
  }
};

// Crear un nuevo contacto
export const createContact = async (contactData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/contacts`, contactData);
    return response.data;
  } catch (error) {
    console.log(error);
    const errorMessage = error.message;
    throw new Error(errorMessage);
  }
};

// Actualizar un contacto por su ID
export const updateContact = async (id, contactData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/contacts/${id}`, contactData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    const errorMessage = error.message;
    throw new Error(errorMessage);
  }
};

// Eliminar un contacto por su ID
export const deleteContactById = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/contacts/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    const errorMessage = error.message;
    throw new Error(errorMessage);
  }
};