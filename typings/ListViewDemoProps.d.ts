/**
 * This file was generated from ListViewDemo.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ComponentType, CSSProperties } from "react";
import { DynamicValue, ListValue, ListActionValue, ListAttributeValue, ListWidgetValue, WebIcon } from "mendix";

export type DirectionEnum = "VERTICAL" | "HORIZONTAL";

export type PaginationEnum = "OFF" | "SHOWMORE" | "BUTTONS";

export type FilterTypeEnum = "CONTAINS" | "STARTSWITH";

export interface SearchAttributesType {
    searchAttribute?: ListAttributeValue<string>;
}

export interface SearchAttributesPreviewType {
    searchAttribute: string;
}

export interface ListViewDemoContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    showNoResultText: boolean;
    noResultsText?: DynamicValue<string>;
    direction: DirectionEnum;
    pagination: PaginationEnum;
    pageSize: number;
    showMoreText?: DynamicValue<string>;
    data: ListValue;
    content: ListWidgetValue;
    onClick?: ListActionValue;
    enableFiltering: boolean;
    filterType: FilterTypeEnum;
    filterDebounce: number;
    searchAttributes: SearchAttributesType[];
    placeholder?: DynamicValue<string>;
    clearIcon?: DynamicValue<WebIcon>;
}

export interface ListViewDemoPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    showNoResultText: boolean;
    noResultsText: string;
    direction: DirectionEnum;
    pagination: PaginationEnum;
    pageSize: number | null;
    showMoreText: string;
    data: {} | { type: string } | null;
    content: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    onClick: {} | null;
    enableFiltering: boolean;
    filterType: FilterTypeEnum;
    filterDebounce: number | null;
    searchAttributes: SearchAttributesPreviewType[];
    placeholder: string;
    clearIcon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
}
