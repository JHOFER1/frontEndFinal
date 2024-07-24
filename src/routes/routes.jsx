import React, { useState, useEffect } from 'react';
import {
    getContacts,
    createContact,
    updateContact,
    deleteContactById,
} from '../services/api';

export const PublicRoute = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedContact, setSelectedContact] = useState(null);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        fecha_nacimiento: '',
        correo: '',
        telefono: ''
        // Otros campos de formulario si es necesario
    });
    

    const [updateFormData, updateSetFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        telefono: ''
        // Otros campos de formulario si es necesario
    });


    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const contactsData = await getContacts();
            setContacts(contactsData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };



    const handleDelete = async (contactId) => {
        try {
            await deleteContactById(contactId);
            fetchContacts();
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createContact(formData);
            fetchContacts();
            alert('Contacto creado con éxito');
            // Puedes hacer algo más aquí, como limpiar el formulario o redirigir a otra página
        } catch (error) {
            console.error(error);
            alert('Error al crear el contacto. Por favor, inténtalo de nuevo.');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const updateHandleChange = (e) => {
        updateSetFormData({
            ...updateFormData,
            [e.target.name]: e.target.value,
        });
    };


    const handleEdit = (contact) => {
        updateSetFormData(contact)
        setSelectedContact(contact);
        setShowEditPopup(true);
    };

    const handleUpdate = async () => {
        try {
            console.log(updateFormData.id)
            await updateContact(updateFormData.id, updateFormData);
            alert('Contacto actualizado con éxito');
            setShowEditPopup(false);
           fetchContacts();
        } catch (error) {
            console.error('Error updating contact:', error);
            alert('Error al actualizar el contacto. Por favor, inténtalo de nuevo.');
            fetchContacts();
        }
    };

    return (
        <>

            {showEditPopup && selectedContact && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full">
                        <div className="p-8">
                            <h2 className="text-lg font-semibold mb-4">Editar Contacto</h2>
                            <div >
                                <div className="mb-4">
                                    <label htmlFor="nombre" className="block text-gray-700">Nombre:</label>
                                    <input type="text" id="nombre" name="nombre" value={updateFormData.nombre} onChange={updateHandleChange} required className="w-full border border-gray-400 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="apellido" className="block text-gray-700">Apellido:</label>
                                    <input type="text" id="apellido" name="apellido" value={updateFormData.apellido} onChange={updateHandleChange} required className="w-full border border-gray-400 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="correo" className="block text-gray-700">Correo Electrónico:</label>
                                    <input type="email" id="correo" name="correo" value={updateFormData.correo} onChange={updateHandleChange} required className="w-full border border-gray-400 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="telefono" className="block text-gray-700">Teléfono:</label>
                                    <input type="text" id="telefono" name="telefono" value={updateFormData.telefono} onChange={updateHandleChange} className="w-full border border-gray-400 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500" />
                                </div>
                                <div className="flex justify-end">
                                    <button onClick={()=>handleUpdate()} className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                                        Actualizar Contacto 
                                    </button>
                                    <button onClick={() => setShowEditPopup(false)} className="text-gray-600 hover:text-gray-800 font-semibold py-2 px-4 rounded">
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className='flex justify-center'>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>SecondName</th>
                                    <th>birthday</th>
                                    <th>e-mail</th>
                                    <th>phone</th>
                                </tr>
                            </thead>
                            <tbody style={{ borderSpacing: '0 10px' }}>
                                {contacts.map((contact) => (
                                    <tr key={contact.id}>
                                        <td style={{ border: '1px solid black', padding: '5px' }}>{contact.id}</td>
                                        <td style={{ border: '1px solid black', padding: '5px' }}>{contact.nombre}</td>
                                        <td style={{ border: '1px solid black', padding: '5px' }}>{contact.apellido}</td>
                                        <td style={{ border: '1px solid black', padding: '5px' }}>{contact.fecha_nacimiento}</td>
                                        <td style={{ border: '1px solid black', padding: '5px' }}>{contact.correo}</td>
                                        <td style={{ border: '1px solid black', padding: '5px' }}>{contact.telefono}</td>
                                        <td style={{ border: '1px solid black', padding: '5px' }}>
                                            <button
                                                className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                                onClick={() => handleEdit(contact)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                                onClick={() => handleDelete(contact.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <div className='flex justify-center' >
                <div className='flex justify-center w-1/2'>
                    <h2 className='flex justify-center'>Crear Nuevo Contacto</h2>
                    <form onSubmit={handleSubmit} className='flex justify-center space-x-4'>
                        <div className="flex flex-col">
                            <label htmlFor="nombre" className="text-gray-700">Nombre:</label>
                            <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required className="border border-gray-400 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="apellido" className="text-gray-700">Apellido:</label>
                            <input type="text" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} required className="border border-gray-400 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="fecha_nacimiento" className="text-gray-700">Fecha de Nacimiento:</label>
                            <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} required className="border border-gray-400 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="correo" className="text-gray-700">Correo Electrónico:</label>
                            <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange} required className="border border-gray-400 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="telefono" className="text-gray-700">Teléfono:</label>
                            <input type="text" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} className="border border-gray-400 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500" />
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Crear Contacto
                        </button>
                    </form>
                </div>
            </div>

        </>
    )
}








