import * as React from "react";
import {FC} from "react";

export enum ControlValueStatus {
    Unknown = 'unknown',
    Valid = 'valid',
    Invalid = 'invalid'
}

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

export interface ControlInputAdornment {
    preInput?: string | FC;
    postInput?: string | FC;
}

export interface ControlProps {
    label: string;
    type: ControlTypes;
    name: string;
    helpText?: string;
    placeholderText?: string;
    adornment?: ControlInputAdornment;
    allowMultipleSelection?: boolean;
    values?: Array<string | number>;
    permissibleValues?: Array<ControlPermissibleValue>;
    validators?: string;
    onChange?: (name: string, value: string) => void;
    errorMessages?: ControlErrorMessaging;
}

export interface StyledProps {
    validity: ControlValueStatus;
}

export type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & StyledProps;
export type SelectProps = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & StyledProps;

