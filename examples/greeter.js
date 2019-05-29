// 类
var User = /** @class */ (function () {
    function User(name, age) {
        this.name = name;
        this.age = age;
        this.total = this.name + this.age;
        console.log(this.total);
    }
    return User;
}());
function greeter(person) {
    return "hello " + person.name + " " + person.age;
}
// 实例化对象
var user = new User('qfh', 24);
console.log(greeter(user));
