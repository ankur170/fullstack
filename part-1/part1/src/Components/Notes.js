import React from 'react';

const Notes= (props)=>{
    const {note,toggleImportant} = props;
    const label = note.important ? "make non important" : "make important"
    return(
     <li className = 'notes'>
       {note.content}
        <button onClick={toggleImportant} >{label}</button>
     </li>
    )
}

export default Notes;