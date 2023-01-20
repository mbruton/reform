import * as React from "react";

export interface SharedBaseInputProps {

}



export type BaseInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & SharedBaseInputProps;
