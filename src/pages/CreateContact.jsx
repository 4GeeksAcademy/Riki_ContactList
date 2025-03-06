import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import "./CreateContact.css";


function CreateContact() {
    const { dispatch } = useGlobalReducer();
    const navigate = useNavigate()

    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });
    const handleChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        });
    };

    const addContact = async (e) => {
        e.preventDefault()
		try {
			const response = await fetch('https://playground.4geeks.com/contact/agendas/Rikigenda/contacts',
				{
					method: 'POST', // 👈 Especificamos que es POST
					headers: {
						'Content-Type': 'application/json', // 👈 Indicamos que enviamos JSON
					},
					// 👉 Convertimos nuestro objeto a string JSON
					body: JSON.stringify(contact),
				}
			);

			if (!response.ok) {
				throw new Error('Error al crear el contacto');
			}

			alert("Contacto creado correctamente")
            navigate("/")

		} catch (error) {
			console.log(error)
		}
	}

    return (
        <>
        <button onClick={() => navigate("/")}> volver a contactos </button>
        <div className="form-container">
            <h2>Crear Contacto</h2>
            <form onSubmit={
                addContact
            }>
                <div className="form-group">
                    <label>Nombre:</label>
                    <input type="text" name="name" value={contact.name} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={contact.email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Teléfono:</label>
                    <input type="tel" name="phone" value={contact.phone} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Dirección:</label>
                    <input type="text" name="address" value={contact.address} onChange={handleChange} required />
                </div>

                <button type="submit" className="form-button">Guardar Contacto</button>
            </form>
        </div>
        
        </>
    )

}

export default CreateContact