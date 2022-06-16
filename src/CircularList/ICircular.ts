export type CarouselType = {dataArr: string []; numCurrent: number; numCounter: number};

export default interface ICircular <T> {
    insertAtFront(data: T, dataDict?: CarouselType): T;
    insertAtEnd(data: T, dataDict?: CarouselType) : T | undefined;
    remove(data: T, dataDict?: CarouselType) : T | null;
    next(dataDict?: CarouselType) : void;
    prev(dataDict?: CarouselType): void;
    getCurrent(dataDict?: CarouselType): T | string;
    getItems(dataDict?: CarouselType): T [];
    numOfItems(dataDict?: CarouselType): number;
    [key:string]:any;
}