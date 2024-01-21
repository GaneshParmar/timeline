import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import MyTimeLineItem from './MyTimeLineItem';
// time 
// WHAT IT DID

function GetTimeLines(timelines){
  console.log(timelines)
  let timesLines =  timelines.map((timeline,i) => {
    return <MyTimeLineItem key={i}  time={timeline.transaction.time} description={timeline.description} content={timeline.title} transaction={timeline.transaction}/>
  });

  console.log(timesLines)
  return timesLines;
}

export default function OppositeContentTimeline({timeLine}) {
  return (
    <>
        <div class='flex flex-col my-2'>
          <span className="text-xl text-center font-light">
            {timeLine.date}
          </span>
          <span className='text-center'>{timeLine.day}</span>
        </div>
      <Timeline>
        
        {GetTimeLines(timeLine.timelines)}

      </Timeline>
    </>
  );
}