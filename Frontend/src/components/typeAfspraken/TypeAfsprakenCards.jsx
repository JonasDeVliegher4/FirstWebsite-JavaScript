import TypeAfspraken from "./TypeAfspraken";
import { useThemeColors } from '../../contexts/Theme.context';

const TypeAfsprakenCards = ({typeAfspraken, categories}) => {
    const { theme } = useThemeColors();

    return (
        <div>
            {categories.map((category) => (
                <div className="grid mt-3" key={category.id}>
                    <div>
                        <h2 className={`text-bg-${theme}`} data-cy="category_name">{category.nameCategory}</h2>
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 g-3">
                            {typeAfspraken.map((typeAfspraak) => (
                                typeAfspraak.category.id === category.id ? (
                                    <div className="col" key={typeAfspraak.id}>
                                        <TypeAfspraken {...typeAfspraak} />
                                    </div>
                                ) : null
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TypeAfsprakenCards;