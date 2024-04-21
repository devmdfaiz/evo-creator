"use client";
import { createContext } from "react";
import { useForm } from "react-hook-form";

export const ReactHookFormContext = createContext();

const ReactHookFormProvider = ({ children }) => {
  const {
    register,
    watch,
    handleSubmit,
    formState
  } = useForm();

  return (
    <ReactHookFormContext.Provider
      value={{ register, watch, handleSubmit, formState }}
    >
      {children}
    </ReactHookFormContext.Provider>
  );
};

export default ReactHookFormProvider;
