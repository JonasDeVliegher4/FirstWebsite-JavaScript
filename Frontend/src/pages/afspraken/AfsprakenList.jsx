import { useState, useMemo} from "react";
import AsyncData from "../../components/AsyncData";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { getAll, deleteById, getById } from "../../api";
import { useThemeColors } from '../../contexts/Theme.context';
import { Link } from "react-router-dom";
import AfsprakenTable from "../../components/afspraken/AfsprakenTable";


export default function AfsprakenList() {
  const { theme } = useThemeColors();
  const [selectedDate, setSelectedDate] = useState(""); 
  const [text, setText] = useState("");
  const userRol = localStorage.getItem("userRol");
  const isAdmin = userRol.includes("admin");
  const fetchKey = isAdmin ? 'afspraken/admin' : 'afspraken';

  const { 
    data: afspraken = [], 
    error: errorAfspraak,
    isLoading: isLoadingAfspraak, 
  } = useSWR(fetchKey, getAll);

  const { trigger: deleteAfspraken, error: deleteError } = useSWRMutation(
    "afspraken",
    deleteById
  );

  return (
    <>
      <h1 className={`text-bg-${theme}`}>Afspraken</h1>

      <div className="clearfix">
        <Link to="/afspraken/add" className="btn btn-primary float-end">
        Afspraak maken
        </Link>
      </div>
     
      <div className="input-group mb-3 w-50">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="form-control"
          data-cy="afspraken_date_input"
        />
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => setSelectedDate("")}
          data-cy="afspraken_date_btn"
        >
          Toon Datum
        </button>
      </div>

      <div className="mt-4">
        <AsyncData  
          error={errorAfspraak || deleteError} 
          loading={ isLoadingAfspraak}
        >
          <AfsprakenTable
            afspraken={afspraken}
            selectedDate={selectedDate}
            onDelete={deleteAfspraken}
          />
        </AsyncData>
      </div>
    </>
  );
}
