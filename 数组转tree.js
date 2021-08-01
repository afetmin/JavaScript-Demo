let arr = [
  { id: 1, name: "部门1", pid: 0 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 5, name: "部门5", pid: 4 },
]

let result = [
  {
    id: 1,
    name: "部门1",
    pid: 0,
    children: [
      {
        id: 2,
        name: "部门2",
        pid: 1,
        children: [],
      },
      {
        id: 3,
        name: "部门3",
        pid: 1,
        children: [
          // 结果 ,,,
        ],
      },
    ],
  },
]

function arrToTree(arr) {
  const map = {}
  const result = []
  for (const item of arr) {
    const id = item.id
    const pid = item.pid

    if (!map[id]) {
      map[id] = {
        children: [],
      }
    }
    map[id] = {
      ...item,
      children: map[id]["children"],
    }

    const treeItem = map[id]

    if (pid === 0) {
      result.push(treeItem)
    } else {
      if (!map[pid]) {
        map[pid] = {
          children: [],
        }
      }
      map[pid].children.push(treeItem)
    }
  }
  return result
}

console.log(arrToTree(arr))
