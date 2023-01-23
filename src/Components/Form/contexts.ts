import {createContext} from "react";
import {FormContextInterface, FormDataValue} from "./types";

export const FormContext = createContext<FormContextInterface>({
    setValue: (path: string, value: FormDataValue) => {},
    getValue: (path: string): FormDataValue => {return null;},
    page: 1,
    nextPage: () => {},
    previousPage: () => {},
    setErrorMessages: (path: string, label: string, messages: Array<string>) => {},
    clearErrorMessages: (path: string) => {}
});
