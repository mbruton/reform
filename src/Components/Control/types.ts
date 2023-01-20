
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

export interface ControlProps {
    label: string;
    mandatory: boolean;
    type: ControlTypes;
    name: string;
    helpText?: string;
    value?: string | null;
    validator?: (value: string) => void;
    onChange?: (name: string, value: string) => void;
    errorMessages?: ControlErrorMessaging;
}
