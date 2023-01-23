import * as React from "react";
import {useContext, useId, useState} from "react";
import {
    ControlPermissibleValue,
    ControlProps,
    ControlTypes,
    ControlValueStatus,
    InputProps,
    SelectProps, StyledProps
} from "./types";
import styled from "styled-components";
import {Label, StyledLabel} from "../Label";
import {FormContext} from "../Form/contexts";
import {FormContextInterface, FormDataValue} from "../Form/types";
import {getValidationErrors} from "../../Validation/Validators";

const StyledPreAdornment = styled.span``;
const StyledPostAdornment = styled.span``;

const StyledHelpContainer = styled.div`
  color: #41464b;
  font-size: 0.8rem;
  padding: 8px 0;
`;

const StyledOptionHelpContainer = styled(StyledHelpContainer)`
  padding-top: 0;
  margin-left: 2rem;
`;

const StyledErrorContainer = styled(StyledHelpContainer)`
  color: #842029;
`;

const StyledInput: React.FC<InputProps> = styled.input`
  font-size: 1rem;
  background-color: white;
  width: 100%;
  box-sizing: border-box;
  border-radius: 0.375rem;
  border: 1px solid ${props => props.validity === ControlValueStatus.Invalid ? '#dc3545' : '#c5c5c5'};
  padding: 8px 10px;

  &[type='checkbox'] {
    float: left;
    margin-top: -1.5rem;
    width: 1rem;
    height: 1rem;
    cursor: pointer;
  }
  
  &:focus {
    border: 1px solid #0d6efe;
    outline: none;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  }
`;

const StyledInputGroup = styled.div<StyledProps>`
  font-size: 1rem;
  background-color: white;
  display: flex;
  border: 1px solid ${props => props.validity === ControlValueStatus.Invalid ? '#dc3545' : '#c5c5c5'};
  padding: 8px 10px;
  border-radius: 0.375rem;

  ${StyledPostAdornment} {
    color: ${props => props.validity === ControlValueStatus.Invalid ? '#842029' : 'unset'};
  }

  ${StyledPreAdornment} {
    color: ${props => props.validity === ControlValueStatus.Invalid ? '#842029' : 'unset'};
  }

  &:focus-within {
    outline: none;
    
    border: 1px solid #0d6efe;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
    
    ${StyledPostAdornment} {
      color: #084298;
    }

    ${StyledPreAdornment} {
      color: #084298;
    }
  }
  
  ${StyledInput} {
    font-size: inherit;
    background-color: transparent;
    flex-grow: 1;
    min-width: 0;
    border-style: none;
    padding: 0;
    
    &:focus {
      border: none;
      outline: none;
      box-shadow: none;
    }
  }
  
  
`;

const StyledSelect: React.FC<SelectProps> = styled.select``;


const StyledDiv = styled.div<StyledProps>`
  position: relative;
  
  ${StyledLabel} {
    color: ${props => props.validity === ControlValueStatus.Invalid ? '#842029' : 'unset'};
  }

  ${StyledHelpContainer} {
    color: ${props => props.validity === ControlValueStatus.Invalid ? '#842029' : 'unset'};
  }
  
  &:focus-within ${StyledLabel} {
    color: #084298;
  };
  &:focus-within ${StyledHelpContainer} {
    color: #084298;
  };
`;

export const Control: React.FC<ControlProps> = (props) => {
    const id = useId();
    const context = useContext<FormContextInterface>(FormContext);
    const [value, setValue] = useState<FormDataValue>(context.getValue(props.name));
    const [valid, setValid] = useState<ControlValueStatus>(ControlValueStatus.Unknown);
    const [validationErrors, setValidationErrors] = useState<Array<string>>([]);

    const onBlur = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
        const newValue = e.currentTarget.value;
        const validationErrors = getValidationErrors(props.validators, newValue, context.getValue);
        const isValueValid = validationErrors.length === 0 ? ControlValueStatus.Valid : ControlValueStatus.Invalid;
        setValid(isValueValid);
        setValidationErrors(validationErrors);
        context.setErrorMessages(props.name, props.label, validationErrors)

        if (isValueValid === ControlValueStatus.Valid) {
            setValue(newValue);
            context.setValue(props.name, newValue);
            context.clearErrorMessages(props.name);
        }
    }

    const renderInput = (props: ControlProps) => {
        return <StyledInput
            id={id}
            name={props.name}
            type={props.type}
            validity={valid}
            onBlur={onBlur}
            defaultValue={String(value)}
            placeholder={props.placeholderText}
        />;
    };

    const renderInputGroup = (props: ControlProps) => {
        return <StyledInputGroup validity={valid}>
            { props.adornment.preInput ? <StyledPreAdornment>{ props.adornment.preInput }</StyledPreAdornment> : null }
            { renderInput(props) }
            { props.adornment.postInput ? <StyledPostAdornment>{ props.adornment.postInput }</StyledPostAdornment> : null }
        </StyledInputGroup>;
    };

    const renderSelectOption = (option: ControlPermissibleValue, index: number) => {
        return <option value={option.value} key={index}>
            { option.label ? option.label : option.value }
        </option>;
    };

    const renderSelect = (props: ControlProps) => {
        return (
            <StyledSelect
                id={id}
                name={props.name}
                onBlur={onBlur}
                defaultValue={String(value)}
                validity={valid}
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
                if (props.adornment) {
                    return renderInputGroup(props);
                }
                return renderInput(props);
        }
    }

    const renderHelpText = (props: ControlProps) => {
        if (props.type === ControlTypes.Checkbox || props.type === ControlTypes.Radio) {
            return <StyledOptionHelpContainer>{ props.helpText }</StyledOptionHelpContainer>;
        }
        return <StyledHelpContainer>{ props.helpText }</StyledHelpContainer>;
    }

    const renderValidationErrors = (errors: Array<string>) => {
        return errors.map(
            (error, index) => <StyledErrorContainer key={index}>{ error }</StyledErrorContainer>
        )
    };

    return <StyledDiv validity={valid}>
        <Label
            label={props.label}
            mandatory={props.validators ? props.validators.indexOf('required') !== -1 : false}
            for={id}
            option={props.type === ControlTypes.Checkbox || props.type === ControlTypes.Radio}
        />
        { renderControl(props) }
        { props.helpText && !validationErrors.length ? renderHelpText(props) : null }
        {  renderValidationErrors(validationErrors) }
    </StyledDiv>;
}
