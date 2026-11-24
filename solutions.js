// ===================== 5.1 FUNCTIONS =====================

// A1
function greetUser(name) {
  console.log(`Hello, ${name}!`);
}
greetUser("Aida");

// A2
function isEven(number) {
  return number % 2 === 0;
}
console.log(isEven(4), isEven(7)); // true false

// A3
function maxOfThree(a, b, c) {
  return Math.max(a, b, c);
}
console.log(maxOfThree(1, 5, 3), maxOfThree(10, 2, 7)); // 5 10

// A4
function formatStudent(name, group, gpa) {
  return `Student ${name} from ${group} has GPA ${gpa}`;
}
console.log(formatStudent("Aida", "SE-101", 3.8));

// B1
const multiply = function (a, b) {
  return a * b;
};
console.log(multiply(3, 4)); // 12

// B2
const squareExpr = function (x) {
  return x * x;
};
const squareArrow = (x) => x * x;
console.log(squareExpr(5), squareArrow(5)); // 25 25

// B3
const toUpper = (str) => str.toUpperCase();
console.log(toUpper("hello"), toUpper("college"));

// C1
function calculatePrice(basePrice, taxRate = 0.12) {
  return basePrice + basePrice * taxRate;
}
console.log(calculatePrice(100), calculatePrice(100, 0.2)); // 112 120

// C2
function sumAll(...nums) {
  return nums.reduce((acc, n) => acc + n, 0); // sumAll() -> 0
}
console.log(sumAll(1, 2), sumAll(1, 2, 3, 4, 5), sumAll()); // 3 15 0

// C3
function average(...nums) {
  if (nums.length === 0) return null;
  return sumAll(...nums) / nums.length;
}
console.log(average(10, 20, 30), average()); // 20 null

// D1
function repeat(times, action) {
  for (let i = 0; i < times; i++) {
    action(i);
  }
}
repeat(3, function (i) {
  console.log("Hello", i);
});

// D2
function applyToArray(arr, fn) {
  const result = [];
  for (const item of arr) {
    result.push(fn(item));
  }
  return result;
}
console.log(applyToArray([1, 2, 3], (x) => x * 2)); // [2, 4, 6]

// D3
function filterPassing(scores, isPassing) {
  const result = [];
  for (const score of scores) {
    if (isPassing(score)) result.push(score);
  }
  return result;
}
console.log(filterPassing([95, 40, 76, 88, 55], (s) => s >= 60)); // [95, 76, 88]

// E1
// 1. addToTotal is impure: it modifies the external variable `total` (side effect),
//    and its result depends on outside state, not only on its input.
// 2. Pure version:
function addValues(a, b) {
  return a + b;
}
console.log(addValues(2, 3)); // 5

// E2
// 1. `x * 2` is pure (depends only on input).
//    `console.log(...)` is a side effect (writes to the console).
// 2. Split:
function double(x) {
  return x * 2;
}
function logDouble(x) {
  const result = double(x);
  console.log("Input is:", x, "Output is:", result);
  return result;
}
logDouble(4);

// F1
function makeMultiplier(n) {
  // The inner function "remembers" n through a closure: it keeps a reference
  // to the scope where it was created, even after makeMultiplier has finished.
  return function (x) {
    return x * n;
  };
}
const dbl = makeMultiplier(2);
const triple = makeMultiplier(3);
console.log(dbl(5), triple(5)); // 10 15

// F2
function createCounter() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  };
}
const counterA = createCounter();
counterA(); // 1
counterA(); // 2
const counterB = createCounter();
counterB(); // 1

// F3
function createIdGenerator(prefix) {
  let current = 1;
  return function () {
    return `${prefix}-${current++}`;
  };
}
const genStudentId = createIdGenerator("STU");
console.log(genStudentId(), genStudentId()); // STU-1 STU-2
const genCourseId = createIdGenerator("CRS");
console.log(genCourseId()); // CRS-1

// ===================== 5.2 OOP =====================

// A1
class StudentA1 {
  constructor(firstName, lastName, group) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.group = group;
  }
  greet() {
    console.log(`Hi, I'm ${this.firstName} from ${this.group}`);
  }
}
new StudentA1("Aida", "Uulu", "SE-101").greet();
new StudentA1("Nurlan", "Bek", "SE-102").greet();

// A2
class Course {
  constructor(title, hours) {
    this.title = title;
    this.hours = hours;
  }
  describe() {
    console.log(`${this.title} – ${this.hours} hours`);
  }
  isLong() {
    return this.hours >= 60;
  }
}
const course = new Course("Web Programming", 72);
course.describe();
console.log(course.isLong()); // true

// A3
class BankAccount {
  #balance = 0;
  constructor(owner) {
    this.owner = owner;
  }
  deposit(amount) {
    if (amount > 0) this.#balance += amount;
  }
  withdraw(amount) {
    if (amount <= 0) return;
    if (amount > this.#balance) {
      console.log("Insufficient funds");
      return;
    }
    this.#balance -= amount;
  }
  getBalance() {
    return this.#balance;
  }
}
const acc = new BankAccount("Nurlan");
acc.deposit(100);
acc.withdraw(30);
console.log(acc.getBalance()); // 70
acc.withdraw(1000); // Insufficient funds

// A4
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  introduce() {
    console.log(`Hi, I'm ${this.name}, ${this.age} years old.`);
  }
}
class Student extends Person {
  constructor(name, age, group) {
    super(name, age);
    this.group = group;
  }
  introduce() {
    console.log(`Hi, I'm ${this.name}, I study in group ${this.group}.`);
  }
}
class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }
  introduce() {
    console.log(`Hi, I'm ${this.name}, I teach ${this.subject}.`);
  }
}
new Student("Aida", 20, "SE-101").introduce();
new Teacher("Nurlan", 35, "JavaScript").introduce();

// A5
class Shape {
  area() {
    throw new Error("Not implemented");
  }
}
class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  area() {
    return this.width * this.height;
  }
}
class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  area() {
    return Math.PI * this.radius ** 2;
  }
}
const shapes = [new Rectangle(3, 4), new Circle(2), new Rectangle(5, 6)];
for (const shape of shapes) console.log(shape.area());

// A6
class TodoItem {
  constructor(title) {
    this.title = title;
    this.completed = false;
  }
  toggle() {
    this.completed = !this.completed;
  }
}
class TodoList {
  constructor(name) {
    this.name = name;
    this.items = [];
  }
  addItem(title) {
    const item = new TodoItem(title);
    this.items.push(item);
    return item;
  }
  getCompleted() {
    return this.items.filter((i) => i.completed);
  }
  getPending() {
    return this.items.filter((i) => !i.completed);
  }
  removeCompleted() { // bonus
    this.items = this.getPending();
  }
  // A7 (browser only): render(containerElement)
  render(containerElement) {
    containerElement.innerHTML = "";
    const ul = document.createElement("ul");
    for (const item of this.items) {
      const li = document.createElement("li");
      li.textContent = `${item.completed ? "[x]" : "[ ]"} ${item.title}`;
      ul.appendChild(li);
    }
    containerElement.appendChild(ul);
  }
}
const list = new TodoList("Daily Tasks");
list.addItem("Study JS").toggle();
list.addItem("Do homework");
console.log(list.getCompleted().map((t) => t.title)); // ["Study JS"]
console.log(list.getPending().map((t) => t.title));   // ["Do homework"]
list.removeCompleted();
console.log(list.items.length); // 1

// ===================== 5.4 SPREAD & REST =====================

// C1
const frontEnd = ["HTML", "CSS", "JavaScript"];
const backEnd = ["Node.js", "Express"];
const fullStack = [...frontEnd, ...backEnd];
const withReact = ["React", ...frontEnd];
console.log(fullStack, withReact);

// C2
const baseUser = { name: "Aida", role: "student" };
const extra = { group: "SE-101", active: true };
const userProfile = { ...baseUser, ...extra };
const promotedUser = { ...userProfile, role: "class_rep" };
console.log(userProfile, promotedUser);

// C3
function sum(...nums) {
  return nums.reduce((acc, n) => acc + n, 0);
}
function avg(...nums) {
  return sum(...nums) / nums.length; // 0 / 0 -> NaN for no arguments
}
console.log(sum(1, 2, 3), avg(10, 20, 30, 40)); // 6 25

// C4
const marks = [98, 87, 76, 65, 54];
const [top1, top2, ...others] = marks;
console.log(`Top students: ${top1}, ${top2}. Others: ${others}.`);

// C5
const courseObj = {
  code: "SE101",
  title: "Intro to Software Engineering",
  credits: 6,
  semester: "Fall",
  instructor: "Nurlan Shaidullaev",
};
const { code, title, ...details } = courseObj;
console.log(code, title, details);

// C6
const student = { id: 1, name: "Aida", group: "SE-101", gpa: 3.8 };
const updatedStudent = { ...student, gpa: 3.9 };
console.log(student.gpa, updatedStudent.gpa); // 3.8 3.9

// C7
const groups = ["SE-101", "SE-102"];
const addedEnd = [...groups, "SE-103"];
const addedStart = ["SE-001", ...groups];
console.log(groups, addedEnd, addedStart);

// C8
function maxScore(first, ...rest) {
  if (first === undefined) return null;
  return Math.max(first, ...rest);
}
console.log(maxScore(10, 50, 30), maxScore()); // 50 null
