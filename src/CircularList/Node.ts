
export class Node <T>{
    constructor(public data: T,  public prev: Node<T> | null, public next: Node<T> | null) {
        this.data = data;
        this.next = next;
        this.prev = prev;
    }

    cleanUp() {
        this.next = null;
        this.prev = null; 
    }

    logData() {
        console.log("|" + this.data + "|");
    }
}