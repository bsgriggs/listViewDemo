import { ReactNode } from "react";
import {ObjectItem} from "mendix";

export default interface IItem {
    index: number;
    objectItem: ObjectItem
    content: ReactNode;
    
}