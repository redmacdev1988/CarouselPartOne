import CircularArray from './CircularArray';
import CircularArrayFP from './CircularlArrayFP';

describe("FP Circular Array", () => {
    const array = CircularArrayFP();
    test("Circular Instantiation", () => {
        expect(array).toBeDefined();
    });

    test("updateWithItems", () => {
        array.updateWithItems(["jan", "feb", "mar", "apr", "may"]);
        expect(array.numOfItems()).toEqual(5);
    });

    test("remove, numOfItems", () => {
        const value = array.remove("jan");
        expect(value).toEqual("jan");
        expect(array.numOfItems()).toEqual(4);

        const value1 = array.remove("feb");
        expect(value1).toEqual("feb");
        expect(array.numOfItems()).toEqual(3);

        const value2 = array.remove("mar");
        expect(value2).toEqual("mar");
        expect(array.numOfItems()).toEqual(2);

        const value3 = array.remove("may");
        expect(value3).toEqual("may");
        expect(array.numOfItems()).toEqual(1);
    });array

    test("insertAtEnd, numOfItems", () => {
        array.insertAtEnd("oct");
        expect(array.numOfItems()).toEqual(2);
        array.insertAtEnd("nov");
        expect(array.numOfItems()).toEqual(3);
        array.insertAtEnd("dec");
        expect(array.numOfItems()).toEqual(4);
    });
});

describe("OOP Circular Array", () => {
    const myArray = new CircularArray <string>();
    test("Array Instantiation", () => {
        expect(myArray).toBeDefined();
    });

    test("updateWithItems", () => {
        myArray.updateWithItems(["a", "b", "end", "dec"]);
        expect(myArray.numOfItems()).toEqual(4);
    });

    test("remove, numOfItems", () => {
        const value = myArray.remove("dec");
        expect(value).toEqual("dec");
        expect(myArray.numOfItems()).toEqual(3);

        const value1 = myArray.remove("a");
        expect(value1).toEqual("a");
        expect(myArray.numOfItems()).toEqual(2);

        const value2 = myArray.remove("end");
        expect(value2).toEqual("end");
        expect(myArray.numOfItems()).toEqual(1);

        const value3 = myArray.remove("b");
        expect(value3).toEqual("b");
        expect(myArray.numOfItems()).toEqual(0);
    });

    test("insertAtEnd, numOfItems", () => {
        myArray.insertAtEnd("z");
        expect(myArray.numOfItems()).toEqual(1);
        myArray.insertAtEnd("x");
        expect(myArray.numOfItems()).toEqual(2);
        myArray.insertAtEnd("y");
        expect(myArray.numOfItems()).toEqual(3);
    });
});


