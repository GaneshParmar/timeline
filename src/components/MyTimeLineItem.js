
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { Typography } from '@mui/material';

export default function MyTimeLineItem({ time, content = "TimeLine Heading", description = "Timeline descrip...", transaction = {} }) {

    
    const isAmountValid=()=>{
        if(!transaction.amount || isNaN(transaction.amount)){
            return false;
        }
        return true;
    }

    let credited = transaction?.amount > 0 ? true : false;
    return (
        <TimelineItem sx={{ height: '150px', padding: '10px 0' }} className={!isAmountValid()?'bg-gray-100':credited ? 'bg-green-200' : 'bg-red-100'}>
            <TimelineOppositeContent>
                {time}
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot sx={{ background: !isAmountValid()?'gray':credited ? 'green' : 'red' }}>
                    {!isAmountValid()?'':credited? (<i className="fa fa-plus" aria-hidden="true"></i>):(<i className="fa fa-minus" aria-hidden="true"></i>)}
                    
                </TimelineDot>
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography variant="h6" className='truncate'>
                    {content}
                </Typography>
                <Typography variant="h6" component="div">
                    {!isAmountValid()? '' :('Rs ' + transaction?.amount)}
                </Typography>
                <Typography variant='subtitle2'>{description}</Typography>
            </TimelineContent>
        </TimelineItem>
    )
}