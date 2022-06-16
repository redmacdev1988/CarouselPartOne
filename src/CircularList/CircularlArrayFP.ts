/**
**
Functional programming implementation of Circular array
**
**/

import { CarouselType } from "./ICircular";
import ICircular from './ICircular';

const createDataArrFP = () => {
    const data: CarouselType =  {
        dataArr: [],
        numCurrent: 0,
        numCounter: 0,
    };
    return data;
}

const insertAtFront = (data:string, dataDict: CarouselType): string => {
    dataDict.dataArr.unshift(data);
    dataDict.numCounter++;
    return data;
}

const insertAtEnd = (data:string, dataDict: CarouselType): string | undefined => {
    dataDict.dataArr.push(data);
    dataDict.numCounter++;
    return data;
}
const find = (dataDict: CarouselType, urlToFind: string): number => dataDict.dataArr.findIndex(url => url === urlToFind);

const remove = (data: string, dataDict: CarouselType): string | null => {
  const index = find(dataDict, data);
  if (index !== -1) {
    dataDict.dataArr.splice(index, 1);
    dataDict.numCounter--;
    return data;
  }
  return null;
}

const getCurrent = (dataDict: CarouselType) : string => dataDict.dataArr[dataDict.numCurrent];

const next = (dataDict: CarouselType) : void => { 
  dataDict.numCurrent = ++dataDict.numCurrent % dataDict.numCounter;
}

const prev = (dataDict: CarouselType) : void => { 
  if (dataDict.numCounter > 0) {
    dataDict.numCurrent = (dataDict.numCurrent === 0) ?  dataDict.numCounter-1 : --dataDict.numCurrent;
  }
}

const numOfItems = (dataDict: CarouselType) : number => {
    return dataDict.numCounter;
}
const getItems = (dataDict: CarouselType) : string [] => {
    return dataDict.dataArr;
}

const sort = (reverse: boolean = false, dataDict: CarouselType): void => {
  dataDict.dataArr = dataDict.dataArr.sort((a, b) => !reverse ? a.localeCompare(b) : b.localeCompare(a));
}

export default function CircularArrayFP() : ICircular <string> {
    return {
        createDataArrFP,
        sort,
        insertAtFront,
        insertAtEnd,
        remove,
        next,
        prev,
        getCurrent,
        getItems,
        numOfItems
    }
}
