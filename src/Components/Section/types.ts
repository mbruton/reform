import {ControlProps} from "../Control/types";

export enum SectionLayout {
    Row,
    TwoColumns,
    ThreeColumns,
    FourColumns,
}

export interface SectionDefinition {
    title?: string;
    description?: string;
    layout: SectionLayout;
    controls: Array<ControlProps>;
}
export interface SectionProps {
    definition: SectionDefinition;
}
