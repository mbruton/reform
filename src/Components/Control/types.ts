import * as React from "react";

export enum ControlTypes {
    Text = 'text',
    Password = 'password',
    Radio = 'radio',
    Checkbox = 'checkbox',
    Select = 'select',
    Textarea = 'textarea',
}

export interface ControlErrorMessaging {
    requiredMessage?: string;
    invalidMessage?: string;
}

export interface ControlPermissibleValue {
    value: string | number;
    label?: string;
    helpText?: string;
}

export interface ControlProps {
    label: string;
    mandatory: boolean;
    type: ControlTypes;
    name: string;
    helpText?: string;
    allowMultipleSelection?: boolean;
    values?: Array<string | number>;
    permissibleValues?: Array<ControlPermissibleValue>;
    validator?: (value: string) => void;
    onChange?: (name: string, value: string) => void;
    errorMessages?: ControlErrorMessaging;
}

export type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export type SelectProps = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
