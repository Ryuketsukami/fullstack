import { createContext} from "react";
import { useForm } from "react-hook-form";


export const FormContext = createContext(null)

// This form provider may seem a bit redundant, the reason for this is that many of its functionality was changed while refactoring.
// I am leaving it like this regardless because I don't want to spam article-body with more lines.
export function FormProvider({children}) {

    const {
        reset ,
        unregister ,
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setFocus,
    } = useForm();

    const value = { unregister, register, handleSubmit, watch, formState: { errors }, reset, setFocus };

    return (
        <FormContext.Provider value={value}>
            {children}
        </FormContext.Provider>
    );
}