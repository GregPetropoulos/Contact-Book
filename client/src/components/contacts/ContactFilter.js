import React from 'react';
import {useContacts, filterContacts, clearFilter} from '../../context/contact/ContactState';

const ContactFilter = () => {
    //* We just need the contact dispatch without the state
    const contactDispatch= useContacts()[1]


    const onChange = (e) => {
       if(e.target.value !== '' ){
           filterContacts(contactDispatch, e.target.value);
       }else{
           clearFilter(contactDispatch);
       }
    };
    return (
        <form onSubmit ={(e)=> e.preventDefault()}>
            <input type ='text' placeholder='Filter Contacts...' onChange={onChange}/>
        </form>
    )
}

export default ContactFilter
