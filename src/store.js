export const initialStore = () => {
  return {
    message: null,
    contacts: [],
    selectedContact:{},
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_contacts":
      return {
        ...store,
        contacts: action.payload  // Guardamos los contactos en el store
      };

    case "delete_contact":
      return {
        ...store,
        contacts: store.contacts.filter((contact) => contact.id !== action.payload)   // Guardamos los contactos en el store
      };

      case "find_contact":
        return {
          ...store,
          selectedContact: store.contacts.find((contact) => contact.id === action.payload)   // Guardamos los contactos en el store
        };
  

    default:
      return store;
  }
}

