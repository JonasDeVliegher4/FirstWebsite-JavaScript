import { memo, useCallback } from "react";
import { IoTrashOutline} from 'react-icons/io5'
import useSWR from "swr";
import { getAll } from "../../api";
import DateToInputString from "../../utils/DateToInputString";

const TimeFormat = new Intl.DateTimeFormat('nl-BE', {
  hour: '2-digit', 
  minute: '2-digit',
  timeZone: 'UTC',
});

const DateFormat =  new Intl.DateTimeFormat('nl-BE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'UTC',
})


export default memo(function Afspraken({ id, date_StartTime, user, typeAfspraak, onDelete }) {

  const handleDelete = useCallback(() =>  {
    onDelete(id);
  }, [id, onDelete])

  const {data: typeAfspraken = [] } = useSWR("typeAfspraak", getAll)

  //tijd halen van de typeAfspraak
  const afspraakDuur = typeAfspraken.find(t => t.id === typeAfspraak.id)?.time|| 0;

  // Bereken de eindtijd
  const startDateTime = new Date(date_StartTime);
  const endDateTime = new Date(startDateTime.getTime() + afspraakDuur * 60000);

  return (
    <table data-cy="afspraak" style={{ width: '100%', marginBottom: '1em',  borderCollapse: 'collapse'  }}>
      <tbody>
        <tr>
          <td style={{ textAlign: 'left', padding: '4px' }}><strong>Gebruiker:</strong></td>
          <td style={{ textAlign: 'left', padding: '4px' }} data-cy="afspraak_user">{user.name}</td>
        </tr>
        <tr>
          <td style={{ textAlign: 'left', padding: '4px' }}><strong>Type Afspraak:</strong></td>
          <td style={{ textAlign: 'left', padding: '4px' }} data-cy="afspraak_typeAfspraken">{typeAfspraak.name}</td>
        </tr>
        <tr>
          <td style={{ textAlign: 'left', padding: '4px' }}><strong>Datum:</strong></td>
          <td style={{ textAlign: 'left', padding: '4px' }} data-cy="afspraak_date">{DateFormat.format(new Date(date_StartTime))}</td>
        </tr>
        <tr>
          <td style={{ textAlign: 'left', padding: '4px' }}><strong>Tijd:</strong></td>
          <td style={{ textAlign: 'left', padding: '4px' }} data-cy="afspraak_time">
            {TimeFormat.format(startDateTime)} - {TimeFormat.format(endDateTime)}
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: 'left', padding: '4px' }} colSpan="2">
            <div className="btn-group float-end">
              <button data-cy="afspraak_remove_btn" type="button" className='btn btn-danger' onClick={handleDelete}>
                <IoTrashOutline />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
});   