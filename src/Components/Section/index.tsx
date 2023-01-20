import * as React from "react";
import {SectionProps} from "./types";
import {ControlProps} from "../Control/types";
import {Control} from "../Control";

export const Section: React.FC<SectionProps> = (props) => {
    const renderControls = (controls: Array<ControlProps>) => controls.map(
        (controlProps, index) => <Control {...controlProps} key={index} />
    );

    return (
        <div>
            { props.definition.title ? <h3>{props.definition.title}</h3> : null }
            { props.definition.description ? <p>{props.definition.description}</p> : null }
            { renderControls(props.definition.controls) }
        </div>
    );
};
