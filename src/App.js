import {  Divider, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import MyMenu from './components/MyMenu';
import NewTimeLineCreate from './components/NewTimeLineCreate';
import OppositeContentTimeline from './components/OppositeContentTimeline';
import { fetchAndConvertData, localTimeLineClear, saveTimeLineInDb } from './utils/LocalCache';

export default function App() {
  
  const titleTextArea = useRef(null);

  const [timeLine, setTimeLine] = useState(fetchAndConvertData());
  
  const [isTargetVisible, setIsTargetVisible] = useState(false);
  // const timeLine = fetchAndConvertData(); 

  // Step 1: Create a ref for the target component
  const addElement = useRef(null);

  let isScrollToTargetClicked = false;
  // Step 3: Function to scroll to the target component
  const scrollToTarget = () => {
    isScrollToTargetClicked = true;
    // Check if the ref is available before scrolling
    if (addElement.current) {
      addElement.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      titleTextArea.current.focus();
    }
  };

   // Step 4: Use IntersectionObserver to detect when the target is visible
   useEffect(() => {
      titleTextArea.current.focus();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if(isScrollToTargetClicked){
          setIsTargetVisible(entry.isIntersecting);
          isScrollToTargetClicked = false;
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.5 } // Adjust threshold as needed
    );

    if (addElement.current) {
      observer.observe(addElement.current);
    }

    // Cleanup the observer on component unmount
    return () => observer.disconnect();
  }, []);

  let hasTimeLine = timeLine.length <= 0;
  const handleTimeLineAdd = (newTimeLine) => {
    saveTimeLineInDb(newTimeLine);
    setTimeLine(fetchAndConvertData())
  }


  function handleClearData() {
    localTimeLineClear();
    setTimeLine(fetchAndConvertData());
  }

  return (
    <>
      <main className="flex justify-center flex-col align-middle">
        <MyMenu handleClearData={handleClearData} scrollToTarget={scrollToTarget} />
        {hasTimeLine && <Typography variant='h5' align='center' margin={'4em 0'}>No timelines present. Use below form to add timelines!</Typography>}
        {timeLine.map((item, index) => (
          <OppositeContentTimeline key={index} timeLine={item} />
        ))}

        <Divider />
        {/* <Divider /> */}
        <div ref={addElement} className={`flex justify-center mt-10  bg-gray-300 p-10 ${isTargetVisible ? 'blink' : ''}`}>
          <div className='w-1/2 max-md:w-11/12'>
            <NewTimeLineCreate onTimeLineAdd={handleTimeLineAdd} textAreaRef={titleTextArea}/>
          </div>
        </div>
      </main>
      <footer>
          <Typography textAlign={'center'} margin={'1em 0'}>
            Copyright 2024
          </Typography>
      </footer>
    </>
  )
}