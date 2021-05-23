import useInput from "../hooks/useInput";

const isRequired = (value) => value.trim() !== "";
const isEmail = (value) => {
  let isValid = true;
  const emailReg = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  if (value.trim() === "" || !emailReg.test(value)) {
    isValid = false;
  }
  return isValid;
};

const BasicForm = (props) => {
  const [
    firstName,
    firstNameIsValid,
    firstNameHasError,
    firstNameChangeHandler,
    firstNameBlurHandler,
    resetFirstName
  ] = useInput([isRequired]);

  const [
    lastName,
    lastNameIsValid,
    lastNameHasError,
    lastNameChangeHandler,
    lastNameBlurHandler,
    resetLastName
  ] = useInput([isRequired]);

  const [
    email,
    emailIsValid,
    emailHasError,
    emailChangeHandler,
    emailBlurHandler,
    resetEmail
  ] = useInput([isRequired, isEmail]);

  let formIsValid = false;
  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    resetFirstName();
    resetLastName();
    resetEmail();
  };

  const firstNameControlClasses = firstNameHasError
    ? "form-control invalid"
    : "form-control";
  const lastNameControlClasses = lastNameHasError
    ? "form-control invalid"
    : "form-control";
  const emailControlClasses = emailHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={firstNameControlClasses}>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            value={firstName}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameHasError && (
            <p className="error-text">First Name must not be Empty</p>
          )}
        </div>
        <div className={lastNameControlClasses}>
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            value={lastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameHasError && (
            <p className="error-text">Last Name must not be Empty</p>
          )}
        </div>
      </div>
      <div className={emailControlClasses}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError && (
          <p className="error-text">Please enter a valid email</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
