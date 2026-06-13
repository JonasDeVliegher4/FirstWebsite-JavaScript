import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import LabelInput from "../components/LabelInput";
import { useAuth } from "../contexts/Auth.context";
import Error from "../components/Error";
import { useThemeColors } from "../contexts/Theme.context";

export default function Register() {
  const { theme, oppositeTheme } = useThemeColors();
  const { error, loading, register } = useAuth();
  const navigate = useNavigate();

  const methods = useForm();
  const { getValues, handleSubmit, reset } = methods;

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  const handleRegister = useCallback(
    async ({ name, email, phoneNr, password }) => {
      const loggedIn = await register({ name, email, phoneNr, password });

      if (loggedIn) {
        navigate({
          pathname: "/",
          replace: true,
        });
      }
    },
    [register, navigate]
  );

  const validationRules = useMemo(
    () => ({
      name: {
        required: "Name is required",
      },
      email: {
        required: "Email is required",
      },
      phoneNr: {
        required: "Selfphone number is required",
      },
      password: {
        required: "Password is required",
      },
      confirmPassword: {
        required: "Password confirmation is required",
        validate: (value) => {
          const password = getValues("password");
          return password === value || "Passwords do not match";
        },
      },
    }),
    []
  );

  return (
    <FormProvider {...methods}>
      <div className={`container bg-${theme} text-${oppositeTheme}`}>
        <form
          className="d-flex flex-column"
          onSubmit={handleSubmit(handleRegister)}
        >
          <h1>Register</h1>

          <Error error={error} />

          <LabelInput
            label="Name"
            type="text"
            name="name"
            placeholder="Your Name"
            validationRules={validationRules.name}
            data-cy="register_name"
          />

          <LabelInput
            label="Email"
            type="text"
            name="email"
            placeholder="your@email.com"
            validationRules={validationRules.email}
            data-cy="register_email"
          />

          <LabelInput
            label="Selfphone Number"
            type="number"
            name="phoneNr"
            placeholder="32400000000"
            validationRules={validationRules.phoneNr}
            data-cy="register_phoneNr"
          />

          <LabelInput
            label="Password"
            type="password"
            name="password"
            validationRules={validationRules.password}
             data-cy="register_password"
          />

          <LabelInput
            label="Confirm password"
            type="password"
            name="confirmPassword"
            validationRules={validationRules.confirmPassword}
            data-cy="register_confirmPassword"
          />

          <div className="clearfix">
            <div className="btn-group float-end">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading} 
                data-cy="register_btn"
              >
                Register
              </button>

              <button
                type="button"
                className="btn btn-light"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
