import {FC} from "react";
import {SectionDefinition} from "../Section/types";
import * as React from "react";

export interface PageButton {
    label?: string;
    icon?: FC;
    type: "previous-page" | "next-page"
}

export interface PageDefinition {
    title?: string;
    description?: string;
    stepTitle?: string;
    stepIcon?: FC;
    sections: Array<SectionDefinition>;
    buttons: Array<PageButton>;
}
export interface PageProps {
    index: number;
    definition: PageDefinition;
}

export type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
