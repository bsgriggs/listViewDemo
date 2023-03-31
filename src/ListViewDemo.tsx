import { ReactElement, createElement, useState, useEffect, ChangeEvent } from "react";
import IItem from "typings/Item";
import Item from "./components/Item";
import MxIcon from "./components/MxIcon";
import { ValueStatus, ActionValue, ObjectItem, ListActionValue, ListWidgetValue } from "mendix";
import { attribute, literal, contains, startsWith, or, equals } from "mendix/filters/builders";
import { ListViewDemoContainerProps } from "../typings/ListViewDemoProps";

import "./ui/ListViewDemo.css";

function callMxAction(mxAction: ActionValue | undefined) {
    if (mxAction && mxAction.canExecute) {
        mxAction.execute();
    }
}

function handleOnClick(onClick: ListActionValue | undefined, objectItem: ObjectItem) {
    if (onClick) {
        callMxAction(onClick.get(objectItem));
    }
}

function mapItems(objectItems: ObjectItem[], content: ListWidgetValue): IItem[] {
    return objectItems.map((item, index) => {
        return {
            index: index,
            objectItem: item,
            content: content.get(item)
        };
    });
}

export function ListViewDemo({
    class: className,
    content,
    data,
    direction,
    enableFiltering,
    filterDebounce,
    filterType,
    placeholder,
    name,
    noResultsText,
    pageSize,
    pagination,
    searchAttributes,
    showMoreText,
    showNoResultText,
    clearIcon,
    onClick,
    style,
    tabIndex
}: ListViewDemoContainerProps): ReactElement {
    // useMemo(() => data.setLimit(0), []);
    const [items, setItems] = useState<IItem[]>([]);
    const [mxFilter, setMxFilter] = useState<string>("");
    const [limit, setLimit] = useState<number>(pageSize);
    const [offset, setOffset] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);

    //apply pagination
    if (pagination === "SHOWMORE") {
        useEffect(() => {
            data.setLimit(limit);
        }, [limit]);
    } else if (pagination === "BUTTONS") {
        useEffect(() => {
            data.setLimit(limit);
            data.setOffset(offset);
        }, [limit, offset]);
    }

    //Load data
    useEffect(() => {
        if (data.status !== ValueStatus.Loading) {
            if (data.items) {
                setItems(mapItems(data.items, content));
                setTotalPages(Math.ceil((data.totalCount || 1) / pageSize));
            } else {
                setItems([]);
            }
        } else {
            data.requestTotalCount(true);
        }
    }, [data.items]);

    //Apply filtering
    if (enableFiltering) {
        useEffect(() => {
            const debounce = setTimeout(() => {
                if (searchAttributes && searchAttributes.every(value => value.searchAttribute?.filterable)) {
                    const filterFunction = searchAttributes.map(item => {
                        if (item.searchAttribute) {
                            if (filterType === "CONTAINS") {
                                return contains(attribute(item.searchAttribute.id), literal(mxFilter));
                            } else {
                                return startsWith(attribute(item.searchAttribute.id), literal(mxFilter));
                            }
                        }
                        return equals(literal("1"), literal("1"));
                    });
                    if (filterFunction !== undefined) {
                        if (filterFunction.length > 1) {
                            data.setFilter(or(...filterFunction));
                        } else {
                            data.setFilter(filterFunction[0]);
                        }
                    }
                } else {
                    if (mxFilter.trim().length > 0 && data.items) {
                        setItems(
                            mapItems(
                                data.items.filter(item => {
                                    let match = false;
                                    for (let searchItem of searchAttributes) {
                                        const text = searchItem.searchAttribute?.get(item).displayValue as string;
                                        match =
                                            filterType === "CONTAINS"
                                                ? text !== undefined &&
                                                  text.toLocaleLowerCase().includes(mxFilter.trim().toLocaleLowerCase())
                                                : text !== undefined &&
                                                  text
                                                      .toLocaleLowerCase()
                                                      .startsWith(mxFilter.trim().toLocaleLowerCase());
                                        if (match) {
                                            break;
                                        }
                                    }
                                    return match;
                                }),
                                content
                            )
                        );
                    }
                }
            }, filterDebounce);
            return () => clearTimeout(debounce);
        }, [mxFilter]);
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setMxFilter(event.target.value);
    };

    return (
        <div id={name} className={"list-view-demo " + className}>
            {enableFiltering && (
                <div className="mx-listview-searchbar">
                    <input
                        name={name}
                        className="form-control"
                        type="text"
                        tabIndex={tabIndex}
                        placeholder={placeholder ? (placeholder.value as string) : ""}
                        onChange={handleInputChange}
                        value={mxFilter}
                        autoComplete="off"
                    ></input>
                    <button className="btn mx-button" onClick={() => setMxFilter("")}>
                        <MxIcon defaultClassName="remove" mxIconOverride={clearIcon?.value} title="Clear" />
                    </button>
                </div>
            )}
            <div className="list" style={{ ...style, flexDirection: direction === "HORIZONTAL" ? "row" : "column" }}>
                {items.length > 0
                    ? items.map(item => (
                          <Item
                              item={item}
                              onClick={onClick ? () => handleOnClick(onClick, item.objectItem) : undefined}
                          />
                      ))
                    : showNoResultText && noResultsText && <span>{noResultsText.value}</span>}
            </div>
            {pagination === "SHOWMORE" && data.hasMoreItems && (
                <button type="button" className="btn mx-button btn-block" onClick={() => setLimit(limit + pageSize)}>
                    {showMoreText?.value}
                </button>
            )}
            {pagination === "BUTTONS" && data.status === ValueStatus.Available && (
                <div className="buttons">
                    <button
                        type="button"
                        className="btn mx-button"
                        onClick={() => {
                            if (offset !== 0) {
                                setOffset(0);
                            }
                        }}
                    >
                        <MxIcon defaultClassName="step-backward" />
                    </button>
                    <button
                        type="button"
                        className="btn mx-button"
                        onClick={() => {
                            if (offset !== 0) {
                                setOffset(offset - 1);
                            }
                        }}
                    >
                        <MxIcon defaultClassName="backward" />
                    </button>
                    <span className="mx-text">{`Page ${offset + 1} of ${totalPages}`}</span>
                    <button
                        type="button"
                        className="btn mx-button"
                        onClick={() => {
                            if (offset != totalPages - 1) {
                                setOffset(offset + 1);
                            }
                        }}
                    >
                        <MxIcon defaultClassName="forward" />
                    </button>
                    <button
                        type="button"
                        className="btn mx-button"
                        onClick={() => {
                            if (offset != totalPages - 1) {
                                setOffset(totalPages - 1);
                            }
                        }}
                    >
                        <MxIcon defaultClassName="step-forward" />
                    </button>
                </div>
            )}
        </div>
    );
}
