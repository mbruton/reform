import {ValidatorsInterface} from "./types";
import validator from 'validator';
import {FormDataValue} from "../../Components/Form/types";
import {validatorMessages} from "./messages";

const validatorFunctions: ValidatorsInterface = {
    // Validators must return true if there is no value (except the required validator)
    accepted: (value, params, getValue) => {
        if (typeof value === "boolean") {
            return value;
        }

        if (typeof value === "number") {
            return value != 0;
        }

        if (typeof value === "string") {
            return (value === "yes" || value === "on" || value === "true");
        }

        return false;
    },
    accepted_if: (value, params, getValue) => {
        if (params.length !== 2) {
            return false;
        }

        const dependantValue = getValue(params[0]);
        if (dependantValue !== params[1]) {
            return true;
        }

        return validatorFunctions['accepted'](value, [], getValue);
    },
    date: (value, params, getValue) => {
        return validator.isDate(value);
    },
    email: (value, params, getValue) => value ? validator.isEmail(value) : true,
    required: (value, params, getValue) => Boolean(value),
    min: (value, params, getValue) => {
        if (!value) {
            return true;
        }
        if (params.length !== 1) {
            return false;
        }

        if (typeof value === "number") {
            return value >= Number(params[0]);
        }

        return String(value).length >= Number(params[0]);
    },
    max: (value, params, getValue) => {
        if (!value) {
            return true;
        }
        if (params.length !== 1) {
            return false;
        }

        if (typeof value === "number") {
            return value <= Number(params[0]);
        }

        return String(value).length <= Number(params[0]);
    },
    between: (value, params, getValue) => {
        if (!value) {
            return true;
        }
        if (params.length !== 2) {
            return false;
        }

        if (typeof value === "number") {
            return value >= Number(params[0]) && value <= Number(params[1]);
        }

        return String(value).length >= Number(params[0]) && String(value).length <= Number(params[1]);
    },
    numeric: (value, params, getValue) => /^\d+$/.test(String(value))
};

const getValidatorMessage = (validator: string, value: FormDataValue, params: Array<string>): string | undefined => {
    if (!validatorMessages.hasOwnProperty(validator)) {
        return undefined;
    }

    const messages = validatorMessages[validator];
    const type = typeof value;
    let message = '';

    if (messages.hasOwnProperty(type)) {
        message = messages[type];
    } else if (messages.hasOwnProperty('any')) {
        message = messages['any'];
    } else {
        return undefined;
    }

    params.forEach((param, index) => message = message.replace(':' + index, param));
    return message;
};

export const getValidationErrors = (validatorsString: string | undefined, value: FormDataValue, getValue: (path: string) => FormDataValue): Array<string> => {
    let errors = [];
    if (typeof validatorsString === 'undefined') {
        return errors;
    }

    const validators = validatorsString.split('|');

    for (const validator of validators) {
        const validatorParts = validator.split(':');
        const parameters = validatorParts.length > 1 ? validatorParts[1].split(',') : [];
        const validatorName = validatorParts[0];

        if (!validatorFunctions.hasOwnProperty(validatorName)) {
            errors.push(getValidatorMessage(validatorName, value, parameters));
        }

        if (!validatorFunctions[validatorName](value, parameters, getValue)) {
            errors.push(getValidatorMessage(validatorName, value, parameters));
        }
    }

    return errors;
}
