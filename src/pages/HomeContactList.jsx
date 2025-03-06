import React, { useEffect } from "react";
import ContactCard from "../components/ContactCard";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

function HomeContactList() {
    const { store, dispatch } = useGlobalReducer()
    const navigate = useNavigate()

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await fetch(
                "https://playground.4geeks.com/contact/agendas/Rikigenda"
            );

            // 👉 Verificamos si la petición fue exitosa
            if (!response.ok) {
                throw new Error("¡Vaya! No hemos podido obtener los contactos");
            }

            // 👉 Convertimos la respuesta a JSON
            const data = await response.json();
            dispatch({
                type: "set_contacts",
                payload: data.contacts
            })

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h1> Riki Contact List </h1>
            <button onClick={() => navigate("/create")}> Crear contacto </button>
            {store.contacts.map(contact => {
                return (
                    <div key={contact.id}>
                        <ContactCard 
                            id={contact.id}
                            name={contact.name}
                            email={contact.email}
                            phone={contact.phone}
                            address={contact.address}
                        />
                    </div>
                )
            })}
        </>
    )
}

export default HomeContactList