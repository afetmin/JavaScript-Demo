function red() {
  console.log("red")
}
function yellow() {
  console.log("yellow")
}
function green() {
  console.log("green")
}

const lightMap = {
  red,
  yellow,
  green,
}

function light(light, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      lightMap[light]()
      resolve()
    }, time)
  })
}

async function step() {
  await light("red", 1000)
  await light("yellow", 1000)
  await light("green", 1000)
  step()
}
step()
