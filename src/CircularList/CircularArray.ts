import ICircular from "./ICircular";

/*
  OOP implementation of circular array
*/
export const EMPTY_LIST = "list is empty";

export default class CircularArray <T> implements ICircular <T> {
    
    protected data: T [];
    private current: number = 0;
    private counter: number = 0;

    constructor() {
        this.data = [];
        this.counter = 0;
    }

    public updateWithItems(newDataArr: T []) {
        newDataArr.forEach((item: T) => {
            this.insertAtFront(item);
        });
    }

    private shiftUpAssignFirstEle(cbValueForFirstElement: (arr: T[], index: number) => void) {
        for (let i = this.counter ; i > 0 ; i--) {
            this.data[i] = this.data[i-1];
        }
        cbValueForFirstElement(this.data, 0);
    }

    private shiftDown(index: number) {
        for (let i = index; i < this.counter; i++) {
            this.data[i] = this.data[i+1];
        }
        delete this.data[this.counter];
        this.counter--;
    }

    private find(value: T): number {
        for(let i = 0; i < this.counter;i++) {
            if (this.data[i] === value) {
                return i;
            }
        }
        return -1;
    }

    public insertAtFront(data: T) : T {
        this.shiftUpAssignFirstEle((arr: T [], index: number) => {
            arr[index] = data;
        });
        this.counter++;
        return data;
    }

    public insertAtEnd(data: T) : T | undefined {
        if (this.counter < this.data.length) {
            this.data[this.counter++] = data;
            return data;
        }
    }

    public remove(value: T) : T | null {
        const index = this.find(value);
        if (index !== -1) { // found
            this.shiftDown(index);
            return value;
        }
       return null;
    }

    public getCurrent() : T | string {
        if (this.counter === 0) return EMPTY_LIST;
        return this.data[this.current];
    }

    public next() : void{
        this.current = (++this.current)%this.counter;
    }

    public prev() : void{
        this.current = (--this.current)%this.counter;
    }

    public numOfItems(): number {
        return this.counter;
    }

    public getItems(): T [] {
        return this.data;
    }
}