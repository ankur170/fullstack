import React, { useState,useImperativeHandle } from 'react';
import PropType from 'prop-types';


const Togglable = React.forwardRef((props,ref)=>{

    const [formVisible,setFormVisible] = useState(false);
    const onlyButtonVisible = {display: formVisible?'none':'' }
    const fullFormVisible = {display: formVisible?'':'none' }

    const toggleVisibility = ()=>{
        setFormVisible(!formVisible)
    }

    useImperativeHandle(ref,()=>{
        return({toggleVisibility})
    })

    return(
      <div>
        <div style = {onlyButtonVisible}>
          <button onClick = {toggleVisibility}>{props.buttonLabel}</button>
        </div>
        <div style={fullFormVisible}>
         {props.children}
          <button onClick = {toggleVisibility}>Cancel</button>
        </div>
      </div>
    )
  })

  Togglable.displayName = 'Togglable'

  Togglable.propTypes ={
      buttonLabel: PropType.string.isRequired
  }

  export default Togglable