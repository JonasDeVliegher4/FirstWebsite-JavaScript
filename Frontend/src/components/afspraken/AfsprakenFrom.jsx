import { useCallback, useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { save } from "../../api";
import Error from "../Error";
import { useNavigate } from "react-router-dom";
import { useThemeColors } from "../../contexts/Theme.context";
import LabelInput from "../LabelInput";
import AsyncData from "../AsyncData";
import DateToInputString from "../../utils/DateToInputString";
import GenerateStartTimes from "./GenerateStartTimes";

const validationRules = {
  typeAfspraken: {
    required: "Type afspraak kiezen is required",
  },
  date: {
    required: "Date is required",
  },
  time: {
    required: "Time is required",
  },
};

function TypeAfsprakenSelect({ name, typeAfspraken, ...rest }) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();
  const { theme } = useThemeColors();
  const hasError = name in errors;

  return (
    <div className="mb-3">
      <label htmlFor={name} className={`form-label label${theme}`}>
        Soort Afspraken
      </label>
      <select
        {...register(name)}
        id={name}
        className="form-select"
        disabled={isSubmitting}
        {...rest}
      >
        <option defaultChecked value="">
          -- Maak een keuze voor soort afspraak
        </option>
        {typeAfspraken.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
      {hasError ? (
        <div
          className="form-text text-danger"
          data-cy="typeAfspraak_select_error"
        >
          {errors[name]}
        </div>
      ) : null}
    </div>
  );
}

export default function AfsprakenForm({
  typeAfspraak,
  gekozenAfspraak,
  afspraken,
}) {
  const methods = useForm();
  const { handleSubmit, reset, watch, setValue, register, isSubmitting } =
    methods;
  const { theme } = useThemeColors();
  const navigate = useNavigate();
  const { trigger: saveAfspraken, error: saveError } = useSWRMutation(
    "afspraken",
    save
  );
  const watchDate = watch("date");

  const availableTimes = GenerateStartTimes(watchDate, typeAfspraak, afspraken);
  
  const onSubmit = useCallback(
    async (data) => {
      const { typeAfspraken, date, time } = data;
      
      let date_StartTime = new Date(date);
      date_StartTime.setUTCHours(
        time.substring(0, 2),
        time.substring(3, 5),
        0,  // Seconds
        0   // Milliseconds
      );

      const isoDateTime = date_StartTime.toISOString();
      
      try {
        await saveAfspraken({
          date_StartTime: isoDateTime,
          typeAfspraakId: typeAfspraken,
          id: gekozenAfspraak?.id,
        });
        navigate("/afspraken");
      } catch (error) {
        console.error("Error saving afspraak:", error);
      }
    },
    [reset, saveAfspraken, navigate, gekozenAfspraak]
  );

  useEffect(() => {
    if (
      gekozenAfspraak &&
      (Object.keys(gekozenAfspraak).length !== 0 ||
        gekozenAfspraak.constructor !== Object)
    ) {
      const dateAsString = DateToInputString(gekozenAfspraak.date_StartTime);
      setValue("date_StartTime", dateAsString);
      setValue("typeAfspraak", gekozenAfspraak.typeAfspraak.id);
    } else {
      reset();
    }
  }, [gekozenAfspraak, setValue, reset]);

  return (
    <>
      <Error error={saveError} />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="m-5">
          <TypeAfsprakenSelect
            name="typeAfspraken"
            typeAfspraken={typeAfspraak}
            data-cy="typeAfspraak_input"
          />

          <LabelInput
            label="Date"
            name="date"
            type="date"
            validationRules={validationRules.date}
            data-cy="date_input"
          />

          <div className="mb-3">
            <label htmlFor="startTime" className={`form-label label${theme}`}>
              Starttijd
            </label>
            <select
              {...register("time", validationRules.time)}
              id="startTime"
              className="form-select"
              required
              data-cy="time_input"
            >
              <option defaultChecked value="">
                -- Selecteer starttijd
              </option>
              {availableTimes.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div className="clearfix">
            <div className="btn-group float-end">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
                data-cy="submit_afspraken"
              >
                {gekozenAfspraak?.id ? "Save Afspraak" : "Add Afspraak"}
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
