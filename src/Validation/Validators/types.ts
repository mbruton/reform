import {FormDataValue} from "../../Components/Form/types";

export interface ValidatorsInterface {
    [key: string]: (value: FormDataValue, params: Array<string>, getValue: (path: string) => FormDataValue) => boolean;
}

export interface ValidatorMessageInterface {
    [type: string]: string;
}

export interface ValidatorMessagesInterface {
    [key: string]: ValidatorMessageInterface;
}
