import React from 'react';
import FlatPickr from 'react-flatpickr';
// import "flatpickr/dist/themes/material_green.css";
import "flatpickr/dist/themes/material_orange.css";

const DatePicker = (props) => {
  const data = 0;

  return (
    <div style={{textAlign:'center'}}>
      <FlatPickr
        onChange={props.onChange}
        placeholder='Click and select date&time'
        style={{borderRadius:'10px', textAlign:'center', width:'100%'}}
        options={{
          defaultDate: new Date().getDate(),
          mode:'range',
          maxDate: "today",
          minDate: '2022-11',
          enableTime: true,
      }}
      />  
    </div>
  );
}

export default DatePicker;
