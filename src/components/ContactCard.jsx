import React from "react";
import { useNavigate } from "react-router-dom";
import "./ContactCard.css";
import useGlobalReducer from "../hooks/useGlobalReducer";

function ContactCard({ id, name, email, phone, address }) {
  const navigate = useNavigate();
      const { store, dispatch } = useGlobalReducer()
  
  const handleDelete = () => {
    fetch(`https://playground.4geeks.com/contact/agendas/Rikigenda/contacts/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          alert("Contacto eliminado")
          dispatch({
            type:"delete_contact",
            payload:id
          })

          // setContacts(contacts.filter((contact) => contact.id !== id));
        }
      })
      .catch((error) => console.error("Error deleting contact:", error));
  };

  return (
    <div className="card">
      <h3>Name: {name}</h3>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Teléfono:</strong> {phone}</p>
      <p><strong>Dirección:</strong> {address}</p>

      <div className="card-buttons">
        <button className="edit-btn" onClick={() => navigate(`/edit/${id}`)}>✏️ Edit</button>
        <button className="delete-btn" onClick={handleDelete}>🗑️ Delete</button>
      </div>
    </div>
  );
}

export default ContactCard;
