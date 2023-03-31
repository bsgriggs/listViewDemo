import { createElement, ReactElement } from "react";
import Item from "typings/Item";

interface ItemProps{
    item: Item;
    onClick: (()=>void)|undefined;
}

export default function Item({item,onClick}:ItemProps): ReactElement{

    return <div onClick={onClick} className={onClick ? "item clickable" : "item"}>
        {item.content}
    </div>
}