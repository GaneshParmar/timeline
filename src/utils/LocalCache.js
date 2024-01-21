import { printError } from "./Logs";

const LocalKey = 'mytimeline';

let localSavedTimeLine;

let timeLineStruct = {
    state: "credit",
    title: "",
    description: "", // add a state for the description
    transaction: {
      amount: 0,
      time: '',
      date: ''
    }
};



export const localTimeLineClear=()=>{
    localStorage.removeItem(LocalKey);
}

// Strucutre of my local storage data

// mytimeline {date1:[{},{}]}

export const saveTimeLineInDb = (newTimeLine) => {
    localSavedTimeLine = getLocalTimeLines();
    const currentDate = newTimeLine.transaction.date;

    // Check if the date key already exists
    if (localSavedTimeLine.hasOwnProperty(currentDate)) {
        // Date key exists, push the new timeline to the existing array
        localSavedTimeLine[currentDate].push(newTimeLine);
    } else {
        // Date key does not exist, create a new key with the specified date
        localSavedTimeLine[currentDate] = [newTimeLine];
    }

    // Sort the timelines within each date key by their transaction time
    Object.keys(localSavedTimeLine).forEach(date => {
        localSavedTimeLine[date].sort((a, b) => a.transaction.time.localeCompare(b.transaction.time));
    });
    // Update the local storage
    saveLocal()
};

export const getLocalTimeLines=()=>{
    if(!localStorage.getItem(LocalKey)){
        localStorage.setItem(LocalKey,JSON.stringify({}));
        return getLocalTimeLines();
    }
    return JSON.parse(localStorage.getItem(LocalKey));
}

function saveLocal(){
        // Update the local storage
        localStorage.setItem(LocalKey, JSON.stringify(localSavedTimeLine));

}

const getDayFromDate = (dateString) => {
    console.log(dateString)
    const dateObject = new Date(dateString);
    const options = { weekday: 'long' }; // You can adjust the options as needed
    return new Intl.DateTimeFormat('en-US', options).format(dateObject);
};

// Assuming you have the getLocalTimeLines function from the previous example

export const fetchAndConvertData = () => {

    let convertedData = [];
    try{
        // Fetch local save data
        const localSavedData = getLocalTimeLines();
    
        // Convert local storage data into the desired structure
        convertedData = Object.entries(localSavedData).map(([date, timelines]) => ({
            day: getDayFromDate(date), // You may need to implement this function to get the day from the date
            date,
            timelines
        }));

        // Sort the array by the 'date' property in ascending order
        convertedData.sort((a, b) => new Date(a.date) - new Date(b.date));


    }catch(e){
        printError(e,"converting the local data to preferred structure.");
    }
    finally{
        return convertedData;
    }

};

// Example usage
const convertedData = fetchAndConvertData();
console.log(convertedData);
