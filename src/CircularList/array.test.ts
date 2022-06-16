import CircularArray from './CircularArray';
import CircularArrayFP from './CircularlArrayFP';

describe("FP Circular Array", () => {
    const array = CircularArrayFP();
    const data = array.createDataArrFP();
    test("Circular Instantiation", () => {
        expect(array).toBeDefined();
    });

    test("inserts", () => {
        array.insertAtFront("nov", data);
        array.insertAtFront("oct", data);
        array.insertAtFront("mar", data);
        array.insertAtFront("feb", data);
        array.insertAtEnd("dec", data);
        expect(array.numOfItems(data)).toEqual(5);
    });

    test("remove, numOfItems", () => {
        const value = array.remove("jan", data);
        expect(value).toEqual(null);
        expect(array.numOfItems(data)).toEqual(5);

        const value1 = array.remove("feb", data);
        expect(value1).toEqual("feb");
        expect(array.numOfItems(data)).toEqual(4);

        const value2 = array.remove("mar", data);
        expect(value2).toEqual("mar");
        expect(array.numOfItems(data)).toEqual(3);

        const value3 = array.remove("dec", data);
        expect(value3).toEqual("dec");
        expect(array.numOfItems(data)).toEqual(2);
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


