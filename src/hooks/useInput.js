import { useState } from "react";

const useInput = (validationRules) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  let valueIsValid = true;
  validationRules.forEach((rule) => {
    if (!rule(enteredValue)) {
      valueIsValid = false;
    }
  });
  const hasError = !valueIsValid && isTouched;

  const inputChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const inputBlueHandler = (e) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };
  return [
    enteredValue,
    valueIsValid,
    hasError,
    inputChangeHandler,
    inputBlueHandler,
    reset
  ];
};

export default useInput;
