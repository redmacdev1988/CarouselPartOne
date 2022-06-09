/**
**
Functional programming implementation of Circular array
**
**/

import ICircular from "./ICircular";

let strArrData: readonly string [] = [];
let numCurrent: number = 0;
let numCounter: number = 0;

const _updateWithItems = (newDataArr: string []) => {
    strArrData = [...newDataArr];
    numCounter = newDataArr.length;
}

const _insertAtFront = (newUrl: string): string => {
    numCounter++;
    strArrData = [newUrl, ...strArrData];
    return newUrl;
}

const _insertAtEnd = (newUrl: string): string => {
    numCounter++;
    strArrData = [...strArrData, newUrl];
    return newUrl;
}

const _find = (toDelete: string): number => strArrData.findIndex(item => item === toDelete);

const _shiftDown = (index: number) : string []=> {
    numCounter--;
    return ["", ...strArrData];
}

const _remove = (value: string) : string | null => {
    const index = _find(value);
    if (index!==-1) {
        strArrData = _shiftDown(index);
        return value;
    }
    return null;
}

const _getCurrent = () : string => strArrData[numCounter];
const _next = () => strArrData[++numCounter % numCounter];
const _prev = () => strArrData[--numCounter % numCounter];
const _numOfItems = () => numCounter;
const _getItems = () => [...strArrData];

const _sort = (reverse: boolean) => {
    strArrData = [...strArrData].sort((a, b) => !reverse ? a.localeCompare(b) : b.localeCompare(a));
}

export default function CircularArrayFP() : ICircular <string> {
    return {
        updateWithItems: _updateWithItems,
        insertAtFront: _insertAtFront,
        insertAtEnd: _insertAtEnd,
        remove: _remove,
        next: _next,
        prev: _prev,
        getCurrent: _getCurrent,
        numOfItems: _numOfItems,
        getItems: _getItems,
        sort: _sort
    }
}
