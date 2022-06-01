/**
**
Functional programming implementation of Circular array
**
**/

import ICircular from "./ICircular";

let _data: readonly string [] = [];
let _current: number = 0;
let _counter: number = 0;

const _updateWithItems = (newDataArr: string []) => {
    _data = [...newDataArr];
    _counter = newDataArr.length;
}

const _insertAtFront = (data: string): string => {
    _counter++;
    _data = [data, ..._data];
    return data;
}

const _insertAtEnd = (data: string): string => {
    _counter++;
    _data = [..._data, data];
    return data;
}

const _find = (toDelete: string): number => _data.findIndex(item => item === toDelete);

const _shiftDown = (index: number) : string []=> {
    _counter--;
    return ["", ..._data];
}

const _remove = (value: string) : string | null => {
    const index = _find(value);
    if (index!==-1) {
        _data = _shiftDown(index);
        return value;
    }
    return null;
}

const _getCurrent = () : string => _data[_current];
const _next = () => _data[++_current % _counter];
const _prev = () => _data[--_current % _counter];
const _numOfItems = () => _counter;
const _getItems = () => [..._data];

const _sort = (reverse: boolean) => {
    _data = [..._data].sort((a, b) => !reverse ? a.localeCompare(b) : b.localeCompare(a));
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
