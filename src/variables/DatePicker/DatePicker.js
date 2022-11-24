import React from 'react';
import FlatPickr from 'react-flatpickr';
// import "flatpickr/dist/themes/material_green.css";
import "flatpickr/dist/themes/material_orange.css";
import { Button } from 'reactstrap';
import { useRef } from 'react';

import classes from './DatePicker.module.css';

const DatePicker = (props) => {
  const data = 0;
  const picker = useRef(null);

  const erasePicker = () => {
    picker.current.flatpickr.clear();
  }

  return (
    <div style={{textAlign:'center'}}>
      <FlatPickr
        onChange={props.onChange}
        placeholder='Click and select date&time'
        style={{borderRadius:'10px', textAlign:'center', width:'89%', height:'40px'}}
        options={{
          defaultDate: new Date().getDate(),
          mode:'range',
          maxDate: "today",
          minDate: '2022-11',
          enableTime: true,
        }}
        ref={picker}
      />  
        <div style={{textAlign:'center', margin:'10px'}}>
          <Button
            onClick={()=>{props.onErase(); erasePicker()}}
            placeholder='Click and select date&time'
            className={classes.buttonRefresh}
            type="button">
            <i data-clear className={"nc-icon nc-refresh-69"} style={{width:'20px'}}/>
          </Button>
        </div>
    </div>
  );
}

export default DatePicker;
