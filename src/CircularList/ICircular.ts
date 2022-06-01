
export default interface ICircular <T>{
    insertAtFront(data: T): T;
    insertAtEnd(data: T) : T | undefined;
    remove(data: T) : T | null;
    next() : void;
    prev(): void;
    getCurrent(): T | string;
    getItems(): T [];
    numOfItems(): number;
    [key:string]:any;
}