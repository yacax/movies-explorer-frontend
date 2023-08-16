import { useEffect, useState } from 'react';
import { FORM_ERRORS_MESSAGES, REGEXP } from '../utils/constants';

const useForm = (
  initialState,
) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isActiveInput, setIsActiveInput] = useState({});

  const hasErrors = (err) => Object.values(err).some((value) => value !== '');
  const hasValues = (val) => !Object.values(val).some((value) => value === '');

  const handleFocus = (evt) => {
    setIsActiveInput(evt.target);
    const input = evt.target;
    setForm({
      ...form,
      activeInput: input.name,
    });
  };

  const handleBlur = () => {
    setForm({
      ...form,
      activeInput: '',
    });
  };

  const updateFormInput = (data) => {
    setForm((prevForm) => ({
      ...prevForm,
      ...data,
    }));
  };

  const resetForm = () => {
    setForm(initialState);
  };

  const hardChangeIsFormValid = (boolean) => {
    setIsFormValid(boolean);
  };

  const addInputCustomError = (input, errorText) => {
    setErrors((prevState) => ({
      ...prevState,
      [input.name]: errorText,
    }));
  };

  const addExtraEmailErrors = (input) => {
    if (input.name === 'email') {
      if (input.name === 'email' && !(REGEXP.EMAIL).test(input.value)) {
        addInputCustomError(input, FORM_ERRORS_MESSAGES.EMAIL);
      } else {
        addInputCustomError(input, '');
      }
    }
  };

  const addExtraPasswordsErrors = (input) => {
    if ((input.name === 'confirmPassword' && input.value !== form.password)
      || (input.name === 'password' && form.confirmPassword.length > 0 && input.value !== form.confirmPassword)) {
      addInputCustomError(input, FORM_ERRORS_MESSAGES.CONFIRM_PASSWORD);
    }
  };
  const checkInitial = () => !Object.keys(form).every((key) => form[key] === initialState[key]);

  const handleChange = (evt) => {
    const input = evt.target;

    setForm((prevState) => ({
      ...prevState,
      [input.name]: input.value,
    }));

    setErrors((prevState) => ({
      ...prevState,
      [input.name]: input.validationMessage,
    }));

    if (form.email || form.email === '') {
      addExtraEmailErrors(input);
    }

    if (form.confirmPassword || form.confirmPassword === '') {
      addExtraPasswordsErrors(input);
    }
  };

  useEffect(() => {
    setIsFormValid(
      !hasErrors(errors)
      && hasValues(form)
      && checkInitial(),
    );
  }, [form, errors]);

  return {
    form,
    setForm,
    errors,
    isFormValid,
    handleChange,
    resetForm,
    hardChangeIsFormValid,
    handleFocus,
    handleBlur,
    updateFormInput,
    isActiveInput,
  };
};

export default useForm;
