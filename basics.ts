//--------------TYPES---------------
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ fullName }.

I'll be ${ age + 1 } years old next month.`;
console.log(sentence);

// 1. array
let arr1 : number[] = [1,2,3];
console.log("---------array----------");
console.log(typeof arr1);
console.log(arr1);

let arr2 : Array<number> = [1,2,3];
console.log(typeof arr2);
console.log(arr2);

//2. tuple
console.log("---------tuple----------");
//Here only initialization must be in the same order. 
//Otherwise you can add elements at any index belonging to those specified types
let tup : [number,string] = [0,"Hello"]; //["Hello",0] is error
console.log(typeof tup);
console.log(tup);
tup[3] = 1;
tup[2] = "hieee";
tup[4] = "true";
console.log(tup);

//3. enum
console.log("---------enum----------");
enum Color {Red,Green,Blue};
let c : Color = Color.Red;
console.log(c);
let colorName : string = Color[2];
console.log(colorName);

//4. any
let notSure:any;
console.log("---------any----------");
console.log(typeof notSure);
notSure = 4;
console.log(typeof notSure);
//notSure.ifItExists(); // okay, ifItExists might exist at runtime(no error at compile time)
//notSure.toFixed();

let sure:Object = 4;
//sure.ifItExists(); //This is compile time error

let myarr :any = [1,"hello",false]; //any is useful for creating arrays with mixed types

let myVoid : void = null; //for void type variables only undefined or null can be assigned
console.log(typeof myVoid);

//5. never
//here, inferred return type is never
/*function returnnNever {
    return new Error("Error");
}*/

//type assertions
console.log("---------type assertions----------");
let someValue = "hi";
let len : number = (<string>someValue).length;
console.log("len: "+len);
let len2 : number = (someValue as string).length;
console.log("len2: "+len2);

//Variable declarations using var & let
console.log("---------------variable declarations-------------");
/*function f(input: boolean) {
    let a = 100;

    if (input) {
        // Still okay to reference 'a'
        let b = a + 1;
        return b;
    }

    // Error: 'b' doesn't exist here. //if you declare b using var, it will be accessible
    //var leaks the scope to contained functions.
    return b;
}*/

function foo() {
    // okay to capture 'a'
    return a;
}

// illegal call 'foo' before 'a' is declared
// runtimes should throw an error here(if runtime doesnt throw error, it will print undefined)
console.log(foo());

let a=10;

//here with var re-declaration is allowed without assigning value
//if you write var a=10, var a=20, its an error
//with let, let x, let x will also throw an error
function f(x) {
    var x;
    var x;

    if (true) {
        var x;
    }
}
console.log("--------------shadowing--------------");
//here, varibale is declared in a more nested scope and is allowed
//this is called shadowing
function f2(condition, x) {
    if (condition) {
        let x = 100;
        return x;
    }

    return x;
}

console.log(f2(false, 0)); // returns '0'
console.log(f2(true, 0));  // returns '100'

console.log("--------------const-----------");
const student = {
    "name":"Shweta",
    "city":"Pune"
};
console.log(student);
//not allowed
/*student = {
    "name":"Joshi",
    "city":"Mumbai",
}*/
//allowed
student.name = "Yo";
console.log(student);

console.log("--------------destructuring-----------");
//Array destructuring
let input = [1,2];
//this will create two variables with first=1, second=2
let [first,second] = input;
console.log(first);
console.log(second);

[second,first] = [first,second];
console.log("After swap:"+first);
console.log("After swap:"+second);

let [l1,...rest] = [1,2,3,4];
console.log("list:"+l1);
console.log("rest:"+rest);

//Object destructuring
var o = {
    o1 : 'hi',
    o2 : 'hello',
    o3 : 'wassup'
};

let {o1,o2} = o;
console.log(o1+" "+o2);
//this is surrounded by () bcz { } is interpreted as a block. Here we are just re-assigning the varibale created in destructuring
({o1,o2} = {o1:"heee",o2:"haaa"});
console.log(o1+" "+o2);

//assign o1 to one, o2 to two(renaming the variables)
let {o1:one,o2:two} = o;
console.log(one+", "+two);
//This didn't work
/*let { prop1, ...passthrough } = {
    prop1:'one',
    prop2:'two',
    prop2:'three'
};
let total = passthrough.b + passthrough.c.length;*/

//setting default values during destructuring
let {prop1,prop2=100} = {'prop1':200};
console.log("prop1:"+prop1);
console.log("prop2:"+prop2);

//declaring functions
//here we do not specify default values, 10,20 will be used if no params are given
//if params are given, both a & b will be needed
function testDefault({a,b} = {a:10,b:20}){
    console.log("default a:"+a);
    console.log("default b:"+b);
}

testDefault(); //takes a=10, b=20
//testDefault({}); //error, a,b will be required if giving param
testDefault({a:30,b:40});

//specifying default value
function testDefault1({a,b=30} = {a:10,b:20}){
    console.log("default1 a:"+a);
    console.log("default1 b:"+b);
}

testDefault1(); //takes a=10, b=20
//testDefault1({}); //error, a will be required if giving param
testDefault1({a:30}); //will use default value for b
testDefault1({a:30,b:40});

//Spread
console.log("---------------spread-------------");
//spreading arrays
let first1 = [1, 2];
let second1 = [3, 4];
let bothPlus = [0, ...first1, ...second1, 5];
console.log(bothPlus);

//spreading objects
let obj = {food: "spicy", price: "$$", ambiance: "noisy"};
let search = { ...obj ,food:"rich"};
console.log(search);
let search1 = {food:'rich', ...obj}; //search1 will be  {food: "spicy", price: "$$", ambiance: "noisy"}; food gets overwritten
console.log(search1);

//spreading objects makes you lose functions
class CC {
  p = 12;
  m() {
      console.log("In function m()");
  }
}
let cc = new CC();
let clone = { ...cc };
console.log(clone.p); // ok
//console.log(clone.m()); // error!
