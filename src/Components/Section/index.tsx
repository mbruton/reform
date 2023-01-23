import * as React from "react";
import {SectionProps} from "./types";
import {ControlProps} from "../Control/types";
import {Control} from "../Control";
import {chunk} from "lodash";
import styled from "styled-components";

const StyledRow = styled.div`
  display: flex;
`;

const StyledColumn = styled.div`
  flex-grow: 1;
  margin: 0 .5rem;
`;

export const Section: React.FC<SectionProps> = (props) => {
    const renderControls = (controls: Array<ControlProps>) => controls.map(
        (controlProps, index) => <StyledColumn key={index}><Control {...controlProps} /></StyledColumn>
    );

    const renderColumns = (controls: Array<ControlProps>, columns: number) => {
        const chunkedControls = chunk(controls, columns);
        return chunkedControls.map(
            (controls, index) => {
                return (
                    <StyledRow key={index}>
                        {renderControls(controls)}
                    </StyledRow>
                );
            }
        );
    };

    return (
        <div>
            { props.definition.title ? <h3>{props.definition.title}</h3> : null }
            { props.definition.description ? <p>{props.definition.description}</p> : null }
            { renderColumns(props.definition.controls, props.definition.layout) }
        </div>
    );
};
