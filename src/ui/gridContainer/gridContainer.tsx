import React from "react";
import { joinClassNames, joinStyles } from "library";
import styles from "./gridContainer.module.css";

interface GridContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    rowGap?: number;
    columnGap?: number;
}

// Custom Button Element
function GridContainer(props: GridContainerProps) {
    const joinedClassNames = joinClassNames(styles.container, props.className!);
    const joinedStyles = joinStyles(
        props.xl ? { gridTemplateColumns: " auto".repeat(props.xl) } : {},
        props.columnGap ? { columnGap: props.columnGap + "rem" } : {},
        props.rowGap ? { rowGap: props.rowGap + "rem" } : {},
        props.style!
    );
    return (
        <div {...props} className={joinedClassNames} style={joinedStyles}>
            {props.children}
        </div>
    );
}

export default GridContainer;