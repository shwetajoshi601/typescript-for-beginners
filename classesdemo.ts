//Classes

console.log("\n-----------Basic Class-----------");
class Greeter {
    name : string;
    greet() : string {
        return "Hello "+this.name;
    }
    constructor(name:string) {
        this.name = name;
    }
}

let obj = new Greeter("Shweta");
console.log(obj.greet());

//Inheritance

console.log("\n-----------Inheritance-----------");
class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name); } //calling parent constructor
    move(distanceInMeters = 5) {            //overriding method move()
        console.log("Slithering...");
        super.move(distanceInMeters);   //calling parent method
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino"); //parent class can hold reference of subclass object

sam.move();
tom.move(34);

//Access Modifiers, public, private, protected

console.log("\n-----------Access Modifiers-----------");
//Private
class Animal1 {
    private name:string;
    constructor(name:string){ this.name = name;};
}

class Rhino extends Animal1{
    constructor() { super("Rhino");}
}

class Employee {
    private name : string;
    constructor(name : string) {this.name = name;}
}

let dog = new Animal1("Dog");
//console.log(dog.name);    //Error Property name is private and only accessible within class Animal1
let rhino = new Rhino();
//console.log(rhino.name);  //Error: Property name is private and only accessible within class Animal1
let emp = new Employee("Shweta");
//dog = emp;                //Error: Employee is not assignable to Animal1
dog = rhino;                //Allowed, both are compatible

//Protected
class Person {
    protected name: string;
    constructor(name){this.name = name;}
}

class Emp extends Person {
    private department : string;
    constructor(name,department){
        super(name);
        this.department = department;
    }
    public getElevatorPitch(){
        return `Hello my name is ${this.name}. I work in ${this.department}.`;
    }
}

let shweta = new Emp('Shweta','IBM');
//console.log(shweta.name); //Error, accessible only within class n sub class
console.log(shweta.getElevatorPitch());


