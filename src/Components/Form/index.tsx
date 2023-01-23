import * as React from "react";
import {FormDataValue, FormErrors, FormProps} from "./types";
import {PageDefinition} from "../Page/types";
import {Page} from "../Page";
import {FormContext} from "./contexts";
import {useState} from "react";
import {get, set} from "lodash";
import styled from "styled-components";
import {Label, StyledLabel} from "../Label";

const StyleErrorContainer = styled.div`
    border-left: 4px solid #dc3545;
    padding: 1rem;
  
    ${StyledLabel} {
        font-weight: bold;
    }
`;

const StyledList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;

export const Form: React.FC<FormProps> = (props) => {
    const [data, setData] = useState<object>(props.data);
    const [page, setPage] = useState<number>(1);
    const [errors, setErrors] = useState<FormErrors>({});
    const renderSteps = () => '';
    const renderPages = (pages: Array<PageDefinition>) => pages.map(
        (page, index) => {
            return <Page index={index} definition={page} key={index} />;
        }
    );

    const renderErrors = () => {
        return (
            <StyleErrorContainer>
                {
                    Object.keys(errors).map(
                        (key, index) => {
                            return (
                                <div key={index}>
                                    <Label label={errors[key].label} mandatory={false} for={key} />
                                    <StyledList>
                                        {
                                            errors[key].messages.map(
                                                (message, index) => <li key={index}>{ message }</li>
                                            )
                                        }
                                    </StyledList>
                                </div>
                            )
                        }
                    )
                }
            </StyleErrorContainer>
        );
    }

    const convertPath = (path: string): string => {
        return path.replace('[', '.').replace(']', '');
    };

    const getDataValue = (path: string): FormDataValue => {
        const lodashPath = convertPath(path);
        return get(data, lodashPath);
    };

    const setDataValue = (path: string, value: FormDataValue) => {
        const lodashPath = convertPath(path);
        set(data, lodashPath, value);
        setData(data);
    };

    const submit = () => {
        props.onSubmit(data);
    };

    const nextPage = () => {
        const nextPage = page + 1;
        if (nextPage < props.definition.pages.length) {
            setPage(nextPage);
        } else {
            submit();
        }
    }

    const previousPage = () => {
        const previousPage = page - 1;
        if (previousPage >= 0) {
            setPage(previousPage);
        }
    }

    const setErrorMessages = (path: string, label: string, messages: Array<string>) => {
        let newErrors = Object.assign({}, errors);
        newErrors[path] = {
            label: label,
            messages: messages
        };
        setErrors(newErrors);
    };

    const clearErrorMessages = (path: string) => {
        let newErrors = Object.assign({}, errors);
        delete newErrors[path];
        setErrors(newErrors);
    };

    return (
        <div>
            <FormContext.Provider value={{
                getValue: getDataValue,
                setValue: setDataValue,
                page: page,
                nextPage: nextPage,
                previousPage: previousPage,
                setErrorMessages: setErrorMessages,
                clearErrorMessages: clearErrorMessages
            }}>
                { props.definition.title ? <h1>{ props.definition.title }</h1> : null }
                { props.definition.description ? <p>{ props.definition.description }</p> : null }
                { props.definition.showPageSteps ? renderSteps() : null}
                { Object.keys(errors).length ? renderErrors() : null }
                { renderPages(props.definition.pages) }
            </FormContext.Provider>
        </div>
    );
}
