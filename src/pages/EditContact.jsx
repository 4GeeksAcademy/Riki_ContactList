import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const EditContact = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });
    const { store, dispatch } = useGlobalReducer()

    useEffect(() => {
        dispatch({
            type: "find_contact",
            payload: parseInt(id)
        })
    }, [id, dispatch]);
    
    useEffect(() => {
        if(store.selectedContact) {
            setFormData({
                name: store.selectedContact.name,
                email: store.selectedContact.email,
                phone: store.selectedContact.phone,
                address: store.selectedContact.address,
            })
        }
    }, [store.selectedContact]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Enviar datos actualizados (PUT)
    const handleUpdate = (e) => {
        e.preventDefault();
        fetch(`https://playground.4geeks.com/contact/agendas/Rikigenda/contacts/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(() => navigate("/")) // Redirigir a la lista de contactos
            .catch(error => console.error("Error al actualizar contacto:", error));
    };

    return (
        <div className="contact-form">
            <h2>Editar Contacto</h2>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nombre"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Teléfono"
                    required
                />
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Dirección"
                    required
                />
                <button type="submit">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default EditContact;
