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
}
