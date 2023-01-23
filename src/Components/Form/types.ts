import {PageDefinition} from "../Page/types";

export interface FormDefinition {
    title?: string;
    description?: string;
    showPageSteps?: boolean;
    pages: Array<PageDefinition>;
}

export interface FormProps {
    definition: FormDefinition;
    data?: object;
    onSubmit(data: object): void;
}

export type FormDataValue = Array<any> | object | string | number | boolean | null;

export interface FormContextInterface {
    getValue(path: string): FormDataValue;
    setValue(path: string, value: FormDataValue): void;
    page: number;
    nextPage(): void;
    previousPage(): void;
    setErrorMessages(path: string, label: string, messages: Array<string>): void;
    clearErrorMessages(path: string): void;
}

export interface FormError {
    label: string;
    messages: Array<string>;
}

export interface FormErrors {
    [key: string]: FormError;
}
