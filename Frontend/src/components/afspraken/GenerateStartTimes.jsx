import { useEffect, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { getAll } from '../../api';
import DateToInputString from '../../utils/DateToInputString'; // Zorg ervoor dat het pad correct is
import addTimeSlots from '../../utils/addTimeSlots';

const GenerateStartTimes = (selectedDate, typeAfspraken, afspraken) => {

    const [availableTimes, setAvailableTimes] = useState([]);

    let afsprakenOpDate = [];
    let dateISO = "";

    if (selectedDate) {
      const fullDateISO = DateToInputString(selectedDate);
      dateISO = fullDateISO.split('T')[0];

      afsprakenOpDate = afspraken.filter(a => {
          const afspraakDate = a.date_StartTime.split('T')[0];  
          return afspraakDate === dateISO;
      });
    }

    /*const { 
        trigger: getAfspraken, 
        data: afspraken = [], 
        error: afsprakenError, 
        isLoading: afsprakenLoading 
    } = useSWRMutation( `afspraken/date/${dateISO}` , getAll );

    useEffect(() => {
        const fetchData = async () => {
          if (selectedDate) {
            const isoDate = DateToInputString(selectedDate);
            console.log(isoDate);
            setDateISO(isoDate);
            console.log(dateISO);
            await getAfspraken(); 
          } else {
            setAvailableTimes([]);
            setDateISO(null);
          }
        };
        
        fetchData();
    }, [selectedDate, getAfspraken]);*/

    
  
    useEffect(() => {
  
      if (!selectedDate) {
        setAvailableTimes([]);
        return;
      }
  
      if(afsprakenOpDate.length >= 2 )
      {
        setAvailableTimes(["Je kan geen afspraak maken op deze datum. Kies een andere datum"]);
        return;
      }
  
      if(afsprakenOpDate.length === 0 )
      {
        setAvailableTimes(addTimeSlots(new Date(`${dateISO}T13:00:00`), new Date(`${dateISO}T20:00:00`)));
      } 
  
      else
      {
        const afspraak = afsprakenOpDate[0];
        const typeAfspraak = typeAfspraken.find(ta => ta.id === afspraak.typeAfspraak.id);

        console.log(afspraak);
        console.log(typeAfspraak);


        if (!typeAfspraak) {
            setAvailableTimes([]);
            return;
        }
        
        const afspraakDuration = typeAfspraak.time; 
        const afspraakStartTime = new Date(afspraak.date_StartTime);
        const afspraakEndTime = new Date(afspraakStartTime.getTime() + afspraakDuration * 60000);

  
        const bufferBefore = new Date(afspraakStartTime.getTime() - 30 * 60000);
        const bufferAfter = new Date(afspraakEndTime.getTime() + 30 * 60000);
  
  
        setAvailableTimes([
          ...addTimeSlots(new Date(`${dateISO}T13:00:00`), bufferBefore),
          ...addTimeSlots(bufferAfter, new Date(`${dateISO}T20:00:00`))
        ]);
    }
    },[afspraken, typeAfspraken, selectedDate]);
    
    //return { availableTimes, afsprakenLoading, afsprakenError } ;
    return availableTimes;
};

export default GenerateStartTimes;