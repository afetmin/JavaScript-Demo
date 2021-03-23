
class Create {
  constructor(name) {
    this.name = name
  }
  getName() {
    return this.name
  }
}
function Singleton() {
  let instance
  return (name) => {
    if(!instance) instance = new Create(name)
    return instance
  }
}
let single = Singleton()
console.log(single('jack').getName())
console.log(single('tom').getName())
