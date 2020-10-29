function sum(a, b) {
  return a + b;
}
module.exports = sum;

class Person {}

let person = new Person();

console.log("typeof ", typeof person);

console.log("instanceof ", person instanceof Person);

console.log("constructor ", person.constructor === Person);

let toString = Object.prototype.toString;
console.log(
  "Object.prototype.toString.call ",
  toString.call(person) === "[object Object]"
);
