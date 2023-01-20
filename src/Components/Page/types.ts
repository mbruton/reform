import {FC} from "react";
import {SectionDefinition} from "../Section/types";

export interface PageDefinition {
    title?: string;
    description?: string;
    stepTitle?: string;
    stepIcon?: FC;
    sections: Array<SectionDefinition>
}
export interface PageProps {
    index: number;
    definition: PageDefinition;
}
