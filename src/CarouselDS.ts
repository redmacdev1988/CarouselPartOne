
import CircularArray from "./CircularList/CircularArray";
import CircularDoubleyLinkedList from "./CircularList/CircularDoubleyLinkedList";
import MergeSort from './Sorts/MergeSort';
import CircularArrayFP  from "./CircularList/CircularlArrayFP";


// OOP way
export class CarouselDS extends CircularArray<string> {
    constructor(array: string []) {
        super();
        this.updateWithItems(array);
    }

    public sort(reverse: boolean) {
        const a = new MergeSort<string>(this.data);
        this.data = a.run(reverse);
    }
}




export const fpCircularArray = CircularArrayFP();
