export default class MergeSort <T>{
    private arr: T [];
    private bReverse: boolean;
    private start: number = 0;
    private end: number = 0;

    constructor(strArr: T []) {
        this.arr = strArr;
        this.end = this.arr.length-1;
        this.bReverse = false;
    }

    private merge(leftArr: T [], rightArr: T []) : T[] {
        if (leftArr && !rightArr) return leftArr;
        if (rightArr && !leftArr) return rightArr;
        if (!rightArr && !leftArr) return [];

        let leftIndex = 0;
        let rightIndex = 0;
        const sorted = [];

        while (leftIndex < leftArr!.length && rightIndex < rightArr!.length) {
            const compare = (this.bReverse) ? (leftArr![leftIndex] <= rightArr![rightIndex]) : (leftArr![leftIndex] > rightArr![rightIndex]);
            if (compare) {
                sorted.push(leftArr![leftIndex++]);
            } else {
                sorted.push(rightArr![rightIndex++]);
            }
        }

        if (leftIndex < leftArr!.length) {
            const res = sorted.concat(leftArr!.splice(leftIndex, leftArr!.length));
            return res;
        }

        if (rightIndex < rightArr!.length) {
            const res = sorted.concat(rightArr!.splice(rightIndex, rightArr!.length));
            return res;
        }

        return [];
    }

    private partition(start: number, end: number): T[] {
        if (start < end) {
            const floorMid = Math.floor((start+end)/2);
            const leftArr = this.partition(start, floorMid);
            const rightArr = this.partition(floorMid+1, end);
            const arr = this.merge(leftArr, rightArr);
            return arr;
        } 

        // base
        if (start >= end) {
            return [this.arr[start]];
        }
        return [];
    }

    public run(reverse: boolean): T [] {
        this.bReverse = reverse;
        const result = this.partition(this.start, this.end);
        return result;
    }
}