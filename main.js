class Student {
  constructor(name, gender, age) {
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.sayName1 = function () {
      console.log(this.name);
    };
  }
  sayName() {
    console.log(this.name);
  }
}

const tom = new Student('tom');
const tom2 = new Student('tom2');
console.log(tom.sayName1 === tom2.sayName1);
console.log(tom.sayName === tom2.sayName);
