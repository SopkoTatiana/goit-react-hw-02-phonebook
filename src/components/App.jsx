import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = (name, number) => {
    if (this.state.contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = { name, number };
    newContact.id = nanoid();

    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  deleteContact = id => {
    const { contacts } = this.state;

    this.setState({
      contacts: contacts.filter(contact => contact.id !== id),
    });
  };

  changeFilter = ({ currentTarget: { value } }) => {
    this.setState({
      filter: value,
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const { addContact, changeFilter, deleteContact } = this;

    const filteredContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <>
        <h1>Phone book</h1>
        <ContactForm addContact={addContact} />
        <h2>Contacts</h2>
        <p>Find contacts by name</p>
        <Filter onFilterChange={changeFilter} />
        <ContactList contacts={filteredContacts} onBtnClick={deleteContact} />
      </>
    );
  }
}

export default App;
