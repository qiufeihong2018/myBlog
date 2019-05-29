// 类
class User {
    name: string
    age: number
    total: string
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
        this.total = this.name + this.age
        console.log(this.total)//qfh24
    }
}
// 接口
interface Person {
    name: string,
        age: number
}

function greeter(person: Person) {
    return `hello ${person.name} ${person.age}`
}

// 实例化对象
const user = new User('qfh', 24)
console.log(greeter(user))//hello qfh 24