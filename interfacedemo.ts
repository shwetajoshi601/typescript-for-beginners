//Interface basic
console.log("--------interface basic----------");
interface labelledValue {
    label : string
}

function printObj(inputObj : labelledValue){
    console.log("--------printing obj---------");
    console.log(inputObj.label);
    //console.log(inputObj.size); //error as labelledValue interface does not specify size attribute
}

let obj = {size:10, label:'Obj of size 10'}; //must have property label
printObj(obj);

//Optional properties in interface
console.log("--------Optional properties----------");
interface squareConfig {
    color ?: string,
    side ?: number
}

function createSquare(config : squareConfig) {
    let newSquare = {color:'black',area:25};
    if(config.color)
        newSquare.color = config.color;

    if(config.side)
        newSquare.area = config.side * config.side;

    return newSquare;
}

//let mySquare = createSquare({color:'blue'}); //will take value 25 for area
let mySquare = createSquare({color:'blue',side:10}); //will calculate area 100
//Here, if you pass any extra property that interface squareConfig does not contain, it'll be an error
//This is allowed in plain JS where the excess property is insignificant
//typeScript has explicit excess property checking & throws an error
console.log("--------square----------");
console.log(mySquare);

//readonly properties
console.log("--------Read-Only properties----------");
interface point{
    readonly x : number,
    readonly y : number,
}

let p1 : point = {x:20,y:20};
console.log("--------point----------");
console.log(p1);
//p1.x = 30;    //Error: Cannot assign to 'x' because it is a constant or a read-only property.
let ro : ReadonlyArray<number> = [1,2,3,4];
console.log("\n--------ReadonlyArray----------");
//ro[5] = 10;   //Error: Index signature in type 'ReadonlyArray<number>' only permits reading.
console.log(ro);
console.log(ro.length);
//ro.push(5);   //Error
//ro.length = 200   //Error
//let a = ro    //Error
let a = ro as number[];   //Allowed using type assertion
console.log(a);

//Note: use const for variables and readonly for object properties


//Function types
console.log("\n--------Function types----------");
interface searchFunc{
    (source : string, substring : string) : boolean //boolean is return type
}

let myFunc : searchFunc = function(src:string, substr: string) {
    let result = src.search(substr);
    return result > -1;
}

console.log("searchFunc");
console.log(myFunc('shweta','ta'));

//Indexable types
console.log("\n--------Indexable types----------");
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
console.log(myStr);

//The index type and property types should match, index:number, so other properties should be number.
/*
interface NumberDictionary {
    [index: string]: number;
    length: number;    // ok, length is a number
    name: string;      // error, the type of 'name' is not a subtype of the indexer
}
*/

//to avoid overwriting the index signature, make it readonly
interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray1: ReadonlyStringArray = ["Alice", "Bob"];
//myArray1[2] = "Mallory"; // Error: Index signature in type 'ReadonlyStringArray' only permits reading.

//Class Types
console.log("\n--------Class types----------");
interface clockInterface {
    currentTime : Date
}

class myClock implements clockInterface {
    currentTime : Date  //must be present as it is defined in interface else error
    setTime() : void {
        this.currentTime = new Date();
    }
    constructor(h: number, m: number) { }
}

let clock = new myClock(5,30);
clock.setTime();
console.log(clock.currentTime);

//Interface extending interface

interface Shape {
    color : string
}

interface Square extends Shape {
    side : number
}

let sq = <Square> {};
sq.color = 'blue';
sq.side = 5;
console.log(sq);

//Hybrid Types
console.log("\n--------Hybrid types----------");

interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
console.log("Hybrid");
console.log(c);

//Interface extending classes
class Control {
    private state : string
}
//an interface extends even the private and protected memebers of the base class
interface SelectableControl extends Control {
   select(): void;
}
//this interface can be implemented only by subclasses of the base class or the class itself
class Button extends Control implements SelectableControl {
    select() : void {
        console.log("In class button select");
    }
}
/*Error, as Image does not extend Control
class Image implements SelectableControl {
    select() : void {

    }
}*/