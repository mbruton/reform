import * as React from "react";
import {LabelProps} from "./types";
import styled from "styled-components";

const StyledLabel = styled.label`
  display: block;
`;

const StyledSup = styled.sup``;

export const Label: React.FC<LabelProps> = (props) => {
    return (
        <StyledLabel for={props.for}>
            {props.label}
            { props.mandatory ? <StyledSup>*</StyledSup> : null}
        </StyledLabel>
    )
}
