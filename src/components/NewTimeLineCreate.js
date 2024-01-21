import { Button, Card, CardContent, Checkbox, Divider, FormControlLabel, FormGroup, Radio, RadioGroup, TextField, Typography } from "@mui/material";
// import {Typography} from '@mui/material/Typography';
import { useEffect, useRef, useState } from "react";
import { DatePicker, TimePicker } from "antd";
import MyTimeLineItem from "./MyTimeLineItem";
import { DateFormat } from "../settings/config";

export default function NewTimeLineCreate({ onTimeLineAdd ,textAreaRef}) {
 
 
 
  const initialTimeLine = {
    state: "",
    title: "",
    description: "", // add a state for the description
    transaction: {
      amount: 0,
      time: '',
      date: ''
    }
  };

  const [newTimeLine, setNewTimeLine] = useState(initialTimeLine);

  const initialConfig = {
    transaction: false,
    customdate: false
  };

  const [timelineConfig, setTimelineConfig] = useState(initialConfig);

  if (newTimeLine.state !== "credit") {
    newTimeLine.transaction.amount = Math.abs(newTimeLine.transaction.amount) * -1;
  } else {
    newTimeLine.transaction.amount = Math.abs(newTimeLine.transaction.amount);
  }

  useEffect(() => {


    if (newTimeLine.transaction.time == '' || !timelineConfig.customdate) {
      let time = new Date().toLocaleTimeString();
      newTimeLine.transaction.time = time;
    }
    if (newTimeLine.transaction.date == '' || !timelineConfig.customdate) {
      let date = new Date().toLocaleDateString();
      newTimeLine.transaction.date = date;
    }
  }, [newTimeLine]);

  useEffect(() => {

    if(!timelineConfig.customdate){
      setDate('');
      setTime('');
    }

    if(!timelineConfig.transaction){
      setStateValue('');
      setAmount(null);
    }

  }, [timelineConfig]);

  function setStateValue(v){
    setNewTimeLine({ ...newTimeLine, state: v });
  }

  function handleTransactionStateChange(event) {
    setStateValue(event.target.value);
  }

  function handleTitleChange(event) {
    setNewTimeLine({ ...newTimeLine, title: event.target.value });
  }

  function handleDescriptionChange(event) {
    setNewTimeLine({ ...newTimeLine, description: event.target.value });
  }

  function setAmount(v){
    setNewTimeLine((prevNewTimeLine) => ({
      ...prevNewTimeLine,
      transaction: {
        ...prevNewTimeLine.transaction,
        amount: parseInt(v),
      },
    }));
  }

  function handleAmountChange(event) {
    setAmount(event.target.value);
  }


  function setDate(v){
    setNewTimeLine((prevNewTimeLine) => ({
      ...prevNewTimeLine,
      transaction: {
        ...prevNewTimeLine.transaction,
        date: v
      }
    }));
  }

  function handleDateChange(date, dateString) {

    let date_ = new Date(date).toLocaleDateString();
    setDate(date_);
  }

  function setTime(v){
    setNewTimeLine((prevNewTimeLine) => ({
      ...prevNewTimeLine,
      transaction: {
        ...prevNewTimeLine.transaction,
        time: v
      }
    }));
  }

  function handleTimeChange(time, timeString) {

    let time_ = new Date(time).toLocaleTimeString();
    setTime(time_);
  }

  function handleAddTimeLine() {
    setTimelineConfig(initialConfig);
    setNewTimeLine(initialTimeLine);
    onTimeLineAdd(newTimeLine);
  }

  // function to change the configuration
  function handleConfigChange(event){
    setTimelineConfig({
      ...timelineConfig,
      [event.target.name]:event.target.checked
    })
  }

  function showIfExist(t) {
    if (t && t != '') {
      return true;
    }
    return false;
  }

  return (
    <Card>
      {timelineConfig.customdate}
      <CardContent className={'shadow-lg border'}>
        <Typography gutterBottom variant="h5" component="div">
          Enter new timeline
        </Typography>

        <FormGroup className="gap-4">
          <TextField
            id="outlined-multiline-flexible"
            label="Title"
            value={newTimeLine.title}
            onChange={handleTitleChange}
            ref={textAreaRef}
          />
          {showIfExist(newTimeLine.title) &&
            <>
              <TextField
                id="outlined-multiline-flexible"
                label="Description"
                multiline
                value={newTimeLine.description}
                onChange={handleDescriptionChange}
              />
            </>
          }
            {timelineConfig.transaction && <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={newTimeLine.state}
              row={true}
              onChange={handleTransactionStateChange}
            >
              <FormControlLabel
                className="text-green-600"
                value={"credit"}
                control={<Radio color="success" />}
                label="Credit"
              />
              <FormControlLabel
                className="text-red-600"
                value={"debit"}
                control={<Radio color="error" />}
                label="Debit"
              />
            </RadioGroup>}
          {
            newTimeLine.state != '' &&
            <TextField
              id="outlined-multiline-flexible"
              label="Amount"
              type="number"
              value={newTimeLine.transaction.amount}
              onChange={handleAmountChange}
            />
          }
        </FormGroup>
        <FormGroup className="m-5">
          {/* <DateTimePicker /> */}
          {timelineConfig.customdate && <FormGroup className="gap-2 my-4">

            <DatePicker className='p-4 w-100 m-0' format={DateFormat} onChange={handleDateChange} />
            <TimePicker className='p-4 w-100 m-0' onChange={handleTimeChange} />
          </FormGroup>}
          <Button variant="contained" className="my-2" onClick={handleAddTimeLine} disabled={newTimeLine.title == ''}>Add</Button>
        </FormGroup>
        <Divider />
        <FormGroup>
          <span >Preview</span>
          <MyTimeLineItem time={newTimeLine.transaction.time} content={newTimeLine.title} description={newTimeLine.description} transaction={newTimeLine.transaction} />
        </FormGroup>
        {showIfExist(newTimeLine.title) &&
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Custom Date and Time"
              name='customdate'
              onChange={handleConfigChange}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Transaction"
              name='transaction'
              onChange={handleConfigChange}
            />
          </FormGroup>
        }
      </CardContent>
    </Card>
  );
}
