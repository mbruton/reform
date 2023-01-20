import * as React from "react";
import {useId} from "react";
import {ControlPermissibleValue, ControlProps, ControlTypes, InputProps, SelectProps} from "./types";
import styled from "styled-components";
import {Label} from "../Label";

const StyledDiv = styled.div`
  position: relative;
`;

const StyledInput: React.FC<InputProps> = styled.input``;
const StyledSelect: React.FC<SelectProps> = styled.select``;

const StyledHelpContainer = styled.div``;

export const Control: React.FC<ControlProps> = (props) => {
    const id = useId()

    const renderInput = (props: ControlProps) => {
        return <StyledInput
            id={id}
            name={props.name}
            type={props.type}
        />;
    };

    const renderSelectOption = (value: ControlPermissibleValue, index: number) => {
        return <option value={value.value} key={index}>
            { value.label ? value.label : value.value }
        </option>;
    };

    const renderSelect = (props: ControlProps) => {
        return (
            <StyledSelect
                id={id}
                name={props.name}
            >
                {
                    props.permissibleValues?.map(
                        (value, index) => renderSelectOption(value, index)
                    )
                }
            </StyledSelect>
        );
    };

    const renderControl = (props: ControlProps) => {
        switch (props.type) {
            case ControlTypes.Select:
                return renderSelect(props);

            case ControlTypes.Text:
            case ControlTypes.Password:
            default:
                return renderInput(props);
        }
    }

    return <StyledDiv>
        <Label label={props.label} mandatory={props.mandatory} for={id} />
        { renderControl(props) }
        { props.helpText ? <StyledHelpContainer>{ props.helpText }</StyledHelpContainer> : null }
    </StyledDiv>;
}
