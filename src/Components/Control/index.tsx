import * as React from "react";
import {ControlProps} from "./types";
import styled from "styled-components";
import {useId} from "react";
import {Label} from "../Label";

const StyledDiv = styled.div`
  position: relative;
`;

export const Control: React.FC<ControlProps> = (props) => {
    const id = useId()

    const renderControl = (props: ControlProps) => {
        switch (props.type) {

        }
    }

    return <StyledDiv>
        <Label label={props.label} mandatory={props.mandatory} for={id} />
    </StyledDiv>;
}
