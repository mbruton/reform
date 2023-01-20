import * as React from "react";
import {FormProps} from "./types";
import {PageDefinition} from "../Page/types";
import {Page} from "../Page";

export const Form: React.FC<FormProps> = (props) => {
    const renderSteps = () => '';
    const renderPages = (pages: Array<PageDefinition>) => pages.map(
        (page, index) => {
            return <Page index={index} definition={page} key={index} />;
        }
    );

    return (
        <div>
            { props.definition.title ? <h1>{ props.definition.title }</h1> : null }
            { props.definition.description ? <p>{ props.definition.description }</p> : null }
            { props.definition.showPageSteps ? renderSteps() : null}
            { renderPages(props.definition.pages) }
        </div>
    );
}
