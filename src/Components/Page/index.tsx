import * as React from "react";
import {PageProps} from "./types";
import {SectionDefinition} from "../Section/types";
import {Section} from "../Section";

export const Page: React.FC<PageProps> = (props) => {
    const renderSections = (sections: Array<SectionDefinition>) => sections.map(
        (section, index) => <Section definition={section} key={index} />
    );

    return (
        <div>
            { props.definition.title ? <h2>{props.definition.title}</h2> : null }
            { props.definition.description ? <p>{props.definition.description}</p> : null }
            { renderSections(props.definition.sections) }
        </div>
    );
}
