import * as React from "react";
import {LabelProps} from "./types";
import styled from "styled-components";

export const StyledLabel = styled.label`
  display: block;
  cursor: pointer;
  padding: 8px 0;
`;

export const StyledOptionLabel = styled(StyledLabel)`
    margin-left: 2rem;
`;

const StyledSup = styled.sup`
  margin-left: 0.3rem;
  color: #dc3545;
  font-size: 1rem;
`;

export const Label: React.FC<LabelProps> = (props) => {
    const renderLabel = (props: LabelProps) => {
        return <React.Fragment>
            {props.label}
            { props.mandatory ? <StyledSup>*</StyledSup> : null}
        </React.Fragment>;
    }

    if (props.option) {
        return (
            <StyledOptionLabel htmlFor={props.for}>
                { renderLabel(props) }
            </StyledOptionLabel>
        );
    }

    return (
        <StyledLabel htmlFor={props.for}>
            { renderLabel(props) }
        </StyledLabel>
    );
}
