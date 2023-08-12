import { useEffect, useState } from 'react';

const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isActiveInput, setIsActiveInput] = useState({});

  const hasErrors = (err) => Object.values(err).some((value) => value !== '');

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

  useEffect(() => {
    const isInitialName = form.profileName === initialState.profileName;
    const isInitialEmail = form.profileEmail === initialState.profileEmail;

    if (Object.values(form).every((x) => x !== '')) {
      setIsFormValid(!hasErrors(errors) && !isInitialName && !isInitialEmail);
    }

    if (Object.values(form).every((x) => x !== '')) {
      setIsFormValid(!hasErrors(errors));
    }
  }, [form]);

  // useEffect(() => {
  //   if (Object.values(form).every((x) => x !== '')) {
  //     setIsFormValid(!hasErrors(errors));
  //   }
  // }, [form]);

  const resetForm = () => {
    setForm(initialState);
  };

  const hardChangeIsFormValid = (boolean) => {
    setIsFormValid(boolean);
  };

  useEffect(() => {
    setIsFormValid(!hasErrors(errors));
  }, [errors]);

  const setCustomError = (inputName, customErrorText) => {
    setErrors((prevErrors) => {
      const newErrors = {
        ...prevErrors,
        [inputName]: customErrorText,
      };
      return newErrors;
    });
  };

  const handleChange = (evt) => {
    const input = evt.target;

    setForm({
      ...form,
      [input.name]: input.value,
    });

    setErrors((prevErrors) => {
      const newErrors = {
        ...prevErrors,
        [input.name]: input.validationMessage,
      };
      const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*).{8,}$/;

      if (input.name === 'confirmPassword') {
        const currentPassword = input.name === 'password' ? input.value : form.password;
        const currentConfirmPassword = input.name === 'confirmPassword' ? input.value : form.confirmPassword;

        if (currentPassword !== currentConfirmPassword || !PASSWORD_REGEX.test(currentPassword)) {
          newErrors.password = input.validationMessage;
          newErrors.confirmPassword = 'Пароли не совпадают или слишком простые. Пожалуйста используйте заглавные и строчные буквы при создании пароля.';
        } else {
          newErrors.password = '';
          newErrors.confirmPassword = '';
        }
      }

      setIsFormValid(!hasErrors(newErrors));

      return newErrors;
    });
  };

  return {
    form,
    setForm,
    errors,
    isFormValid,
    handleChange,
    setCustomError,
    resetForm,
    hardChangeIsFormValid,
    handleFocus,
    handleBlur,
    updateFormInput,
    isActiveInput,
  };
};

export default useForm;
