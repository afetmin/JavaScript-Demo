// Map自带顺序
class LRUcache {
  constructor(n) {
    this.size = n
    this.data = new Map()
  }

  set(domain, info) {
    if (this.data.size >= this.size) {
      const firstKey = [...this.data.keys()][0]
      this.data.delete(firstKey)
    }
    this.data.set(domain, info)
  }

  get(domain) {
    if (!this.data.has(domain)) {
      return false
    }
    const info = this.data.get(domain)
    this.data.delete(domain)
    this.data.set(domain, info)
    return info
  }
}