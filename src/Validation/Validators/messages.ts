import {ValidatorMessagesInterface} from "./types";

export const validatorMessages: ValidatorMessagesInterface = {
    unknown_validator: {
        any: "Validation failure, unknown validator."
    },
    accepted: {
        any: "Please accept to continue."
    },
    accepted_if: {
        any: "Please accept to continue."
    },
    email: {
        any: "The email address entered is not valid."
    },
    min: {
        string: "Must be at least :0 characters.",
        number: "Must be at least :0.",
    },
    max: {
        string: "Must be a maximum of :0 characters.",
        number: "Must be a maximum of :0.",
    },
    between: {
        string: "Must be a between :0 and :1 characters.",
        number: "Must be a between :0 and :1.",
    },
    required: {
        any: "This field is required."
    }
}
