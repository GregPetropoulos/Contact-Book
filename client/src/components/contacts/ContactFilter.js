import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
    const contactContext= useContext(ContactContext)

    //* Allow for use of useRef a hook that allows to directly create a reference to the DOM element in the functional component. 
    const text = useRef('');

    const {filterContacts, clearFilter, filtered} = contactContext

    
    useEffect(()=> {
        if(filtered === null){
           text.current.value = '' 
        }
    },[filtered])


    const onChange = (e) => {
        //* using the useRef have access to the text to check it if there is something in the text value run the filterContacts 
       if(text.current.value !== '' ){
           filterContacts(e.target.value);
       }else{
           clearFilter();
       }
    }
    return (
        <form>
            <input ref= {text} type ='text' placeholder='Filter Contacts...' onChange={onChange}>
            </input>
        </form>
    )
}

export default ContactFilter
