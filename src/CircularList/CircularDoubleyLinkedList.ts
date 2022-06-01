import ICircular from './ICircular';
import { Node } from './Node';

export const EMPTY_LIST = "list is empty";

export default class CircularDoubleyLinkedList <T> implements ICircular <T> {
    
    protected head: Node<T> | null;
    protected current: Node<T> | null;

    constructor() {
        this.head = null;
        this.current = null;
    }

    // O(1)
    public insertAtEnd(data: T): T { 
        if (!this.head) {
            this.head = new Node(data, null, null);
            this.head.next = this.head;
            this.head.prev = this.head;
            this.current = this.head;
        } else {
            const tmp = new Node(data, this.head.prev, this.head);
            this.head!.prev!.next = tmp;
            this.head.prev = tmp;
        }
        return data;
    }

    // O(1)
    public insertAtFront(data: T): T {
        if (!this.head) {
            this.head = new Node(data, null, null);
            this.head.next = this.head;
            this.head.prev = this.head;
            this.current = this.head;
        } else {
            const tmp = new Node(data, this.head.prev, this.head); 
            this.head!.prev!.next = tmp; 
            this.head.prev = tmp;
            this.head = tmp;
        }
        return data;
    }

    // O(1)
    private oneNodeLeft(): boolean {
        return this.head!.next === this.head && this.head!.prev === this.head;
    }

    // O(n)
    public remove(data: T) : T | null{
        if (!this.head) {
            return null;
        }
        let iterator: Node<T> | null = this.head;
        do {
          if (iterator!.data === data) {
              iterator!.prev!.next = iterator!.next;
              iterator!.next!.prev = iterator!.prev;
              if (iterator === this.head) {
                  if (this.oneNodeLeft()) {
                    this.head = null;
                  } else {
                    this.head = iterator.next;
                  } 
              }
              iterator!.cleanUp();
              return data;
          }
          iterator = iterator!.next;
        } while (iterator !== this.head);
        return data;
    }

    // O(1)
    public next(): void {
        this.current = this.current!.next;
    }

    // O(1)
    public prev() : void {
        this.current = this.current!.prev;
    }

    // O(1)
    public getCurrent(): T | string  {
        return this.current ? this.current!.data : EMPTY_LIST;
    }

    // O(1)
    public getHead(): T | string {
        return this.head ? this.head.data : EMPTY_LIST;
    }

    // O(n)
    public numOfItems(): number {
        if (!this.head) {
            console.log('no more items');
            return 0;
        }
        let counter: number = 0;
        let iterator: Node<T> | null = this.head;
        do {
          counter++;
          iterator = iterator!.next;
        } while (iterator !== this.head);
        return counter;
    }

    public updateWithItems(newDataArr: T []) {
        newDataArr.forEach((item: T) => {
            this.insertAtEnd(item);
        });
    }

    public getItems(): T [] {
        let arr : T [] = [];
        if (!this.head) {
            return [];
        }
        let iterator: Node<T> | null = this.head;
        do {
          arr.push(iterator!.data);
          iterator = iterator!.next;
        } while (iterator !== this.head);
        return arr;
    }
    // O(n)
    public toString(): string {
        if (!this.head) {
            return EMPTY_LIST;
        }
        let iterator: Node<T> | null = this.head;
        let result: string = '';
        do {
          result += (iterator!.next !== this.head) ? `${iterator!.data} | ` : `${iterator!.data}`;
          iterator = iterator!.next;
        } while (iterator !== this.head);
        return result;
    }

}