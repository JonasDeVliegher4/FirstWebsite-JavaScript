import { memo } from "react";
import { useThemeColors } from "../../contexts/Theme.context";

export default memo(function TypeAfspraken(props) {

    const { theme, oppositeTheme } = useThemeColors();
    const {name, description, price, time} = props;

    
    return (
        <div className={`card bg-${theme} border-${oppositeTheme} mb-4`}>
            <div className="'card-body">
                <h5 className={`card-title text-${oppositeTheme}`} data-cy="typeAfspraak_name">{name}</h5>
                <p className={`card-description text-${oppositeTheme}`} data-cy="typeAfspraak_description">{description}</p>
                <p className={`card-price text-${oppositeTheme}`} data-cy="typeAfspraak_price">{price + "€"}</p>
                <p className={`card-time text-${oppositeTheme}`} data-cy="typeAfspraak_time">{time + " min"}</p>
            </div>
        </div>
    );
});
