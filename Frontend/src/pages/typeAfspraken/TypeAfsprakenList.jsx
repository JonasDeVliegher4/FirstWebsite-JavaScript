import useSWR from "swr";
import { getAll } from "../../api";
import AsyncData from "../../components/AsyncData";
import TypeAfsprakenCards from "../../components/typeAfspraken/TypeAfsprakenCards";
import { useThemeColors } from '../../contexts/Theme.context';

export default function TypeAfsprakenList() {
  const {data: typeAfspraken = [],  error: errorTypeAfspraken, isLoading: isLoadingTypeAfspraken } = useSWR("typeAfspraak", getAll);
  const {data: categories = [], error: errorCategories, isLoading: isLoadingCategories } = useSWR("category", getAll);
  const { theme } = useThemeColors();

  return(
    <>
         <h1 className={`text-bg-${theme}`}>Alle Soorten Afspraken</h1>

        <AsyncData 
          loading={isLoadingTypeAfspraken || isLoadingCategories} 
          error={errorTypeAfspraken || errorCategories}>
          <TypeAfsprakenCards 
            typeAfspraken={typeAfspraken}
            categories={categories}
          />
        </AsyncData>

    </>
  );
};

