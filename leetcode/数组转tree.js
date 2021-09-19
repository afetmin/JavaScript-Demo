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

// 转换前：
const source = [
  {
    id: 1,
    pid: 0,
    name: "body",
  },
  {
    id: 2,
    pid: 1,
    name: "title",
  },
  {
    id: 3,
    pid: 2,
    name: "div",
  },
]
// 转换为:
const tree = [
  {
    id: 1,
    pid: 0,
    name: "body",
    children: [
      {
        id: 2,
        pid: 1,
        name: "title",
        children: [
          {
            id: 3,
            pid: 2,
            name: "div",
          },
        ],
      },
    ],
  },
]

function jsonToTree(source) {
  let result = []
  if (!Array.isArray(source)) {
    return result
  }
  const map = {}
  source.forEach((it) => {
    map[it.id] = it
  })

  source.forEach((item) => {
    const parent = map[item.pid]
    if (parent) {
      ;(parent.children || (parent.children = [])).push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

console.log(JSON.stringify(jsonToTree(source)))

// 树的筛选
function filterTreeByFn(tree, fn) {
  if (!Array.isArray(tree) || tree.length === 0) {
    return []
  }
  return tree.filter((item) => {
    item.children = item.children && filterTreeByFn(item.children, fn)
    // 有children也返回true，继续筛选子项里的为true的项
    return fn(item) || (item.children && item.children.length)
  })
}

const fn = (item) => {
  return (item.show = true)
}

// 查找某一项在树中的路径
function getNodePath(tree, id) {
  if (!Array.isArray(tree) || tree.length === 0) {
    return []
  }
  const path = []
  const treeFindPath = (tree, id, path) => {
    // 先找第一层
    for (const item of tree) {
      path.push(item.id)
      if (item.id === id) {
        return path
      }
      // 找第二层及以后
      if (item.children) {
        const findChildren = treeFindPath(item.children, id, path)
        if (findChildren.length) {
          return findChildren
        }
      }
      path.pop()
    }
    return []
  }
  return treeFindPath(tree, id, path)
}

// 模糊查询树
const fuzzyQueryTree = (arr, value) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return []
  }
  let result = []
  arr.forEach((item) => {
    if (item.name.indexOf(value) > -1) {
      const children = fuzzyQueryTree(item.children, value)
      const obj = { ...item, children }
      result.push(obj)
    } else {
      if (item.children && item.children.length > 0) {
        const children = fuzzyQueryTree(item.children, value)
        const obj = { ...item, children }
        if (children && children.length > 0) {
          result.push(obj)
        }
      }
    }
  })
  return result
}

// 删除树中空的children
const removeEmptyChildren = (tree) => {
  tree.forEach((item) => {
    if (item.children && item.children.length === 0) {
      delete item.children
    } else if (item.children && item.children.length > 0) {
      removeEmptyChildren(item.children)
    }
  })
  return tree
}
