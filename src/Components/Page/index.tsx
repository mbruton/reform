import * as React from "react";
import {ButtonProps, PageButton, PageProps} from "./types";
import {SectionDefinition} from "../Section/types";
import {Section} from "../Section";
import styled from "styled-components";
import {useContext} from "react";
import {FormContextInterface} from "../Form/types";
import {FormContext} from "../Form/contexts";

const StyledButtonContainer = styled.div``;
const StyledNextButton: React.FC<ButtonProps> = styled.button``;
const StyledPreviousButton: React.FC<ButtonProps> = styled.button``;

export const Page: React.FC<PageProps> = (props) => {
    const context = useContext<FormContextInterface>(FormContext);
    const renderSections = (sections: Array<SectionDefinition>) => sections.map(
        (section, index) => <Section definition={section} key={index} />
    );

    const renderButton = (button: PageButton, index: number) => {
        switch (button.type) {
            case "previous-page":
                return <StyledPreviousButton key={index} onClick={context.previousPage}>{button.label}</StyledPreviousButton>;
            case "next-page":
            default:
                return <StyledNextButton key={index} onClick={context.nextPage}>{button.label}</StyledNextButton>;
        }
    }

    return (
        <div>
            { props.definition.title ? <h2>{props.definition.title}</h2> : null }
            { props.definition.description ? <p>{props.definition.description}</p> : null }
            { renderSections(props.definition.sections) }
            <StyledButtonContainer>
                { props.definition.buttons.map(renderButton) }
            </StyledButtonContainer>
        </div>
    );
}
