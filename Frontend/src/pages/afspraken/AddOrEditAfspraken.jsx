import { useParams } from "react-router";
import useSWR from "swr";
import { getAll, getById  } from "../../api";
import AsyncData from "../../components/AsyncData";
import AfsprakenForm from "../../components/afspraken/AfsprakenFrom";
import { useThemeColors } from '../../contexts/Theme.context';

export default function AddOrEditAfspraken() {
  const { id } = useParams();
  const { theme } = useThemeColors();

  const {
    data: gekozenAfspraak,
    error: gekozenAfspraakError,
    isLoading: gekozenAfspraakLoading,
  } = useSWR(id ? `afspraken/${id}` : null, getById);

  const {
    data: afspraken = [], 
    error: afsprakenError,
    isLoading: afsprakenLoading,
  } = useSWR('afspraken/admin', getAll);

  const {
    data: typeAfspraak = [],
    error: typeAfspraakError,
    isLoading: typeAfspraakLoading,
  } = useSWR("typeAfspraak", getAll);

  return(
    <>
       <h1 className={`text-bg-${theme}`}>
          Afspraken maken
        </h1> 

        <AsyncData 
            error={gekozenAfspraakError || typeAfspraakError || afsprakenError}
            loading={gekozenAfspraakLoading || typeAfspraakLoading || afsprakenLoading}
        >
            <AfsprakenForm
                typeAfspraak={typeAfspraak}
                gekozenAfspraak={gekozenAfspraak}
                afspraken={afspraken}
            />
        </AsyncData>
    </>
  );
}
