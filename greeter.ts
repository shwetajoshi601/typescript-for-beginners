class Greeting{
    name:string;
    greet() : void {
        console.log("Hello!! "+this.name);
    }
}

let obj=new Greeting();
var str = '1';
var str2:number = <number> <any> str;  //str is now of type number
console.log(typeof str2);
console.log(str2);

/*var numobj:string = <string> <any> 1234;
console.log(typeof numobj);
console.log(numobj);*/ 
obj.name="Shweta";
obj.greet();
console.log(obj instanceof Greeting);

enum Direction{
    up,
    down
};
console.log(Direction.up);