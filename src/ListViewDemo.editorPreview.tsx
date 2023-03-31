import { ReactElement, createElement } from "react";
import { ListViewDemoPreviewProps } from "../typings/ListViewDemoProps";

export function preview({  }: ListViewDemoPreviewProps): ReactElement {
    return <div></div>;
}

export function getPreviewCss(): string {
    return require("./ui/ListViewDemo.css");
}
