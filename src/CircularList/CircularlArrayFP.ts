/**
**
Functional programming implementation of Circular array
**
**/

import ICircular from "./ICircular";

let strArrData: readonly string [] = [];
let numCurrent: number = 0;
let numCounter: number = 0;

const updateWithItems = (newDataArr: string []) => {
    strArrData = [...newDataArr];
    numCounter = newDataArr.length;
}

const insertAtFront = (newUrl: string): string => {
    numCounter++;
    strArrData = [newUrl, ...strArrData];
    return newUrl;
}

const insertAtEnd = (newUrl: string): string => {
    numCounter++;
    strArrData = [...strArrData, newUrl];
    return newUrl;
}

const find = (toDelete: string): number => strArrData.findIndex(item => item === toDelete);

const shiftDown = (index: number) : string []=> {
    numCounter--;
    return ["", ...strArrData];
}

const remove = (value: string) : string | null => {
    const index = find(value);
    if (index!==-1) {
        strArrData = shiftDown(index);
        return value;
    }
    return null;
}

const getCurrent = () : string => strArrData[numCounter];
const next = () => strArrData[++numCounter % numCounter];
const prev = () => strArrData[--numCounter % numCounter];
const numOfItems = () => numCounter;
const getItems = () => [...strArrData];

const sort = (reverse: boolean) => {
    strArrData = [...strArrData].sort((a, b) => !reverse ? a.localeCompare(b) : b.localeCompare(a));
}

export default function CircularArrayFP() : ICircular <string> {
    return {
        updateWithItems,
        insertAtFront,
        insertAtEnd,
        remove,
        next,
        prev,
        getCurrent,
        numOfItems,
        getItems,
        sort
    }
}
