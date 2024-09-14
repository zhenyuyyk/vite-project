export default class MapObject {
  constructor(obj) {
    Object.keys(obj).forEach((key) => {
      this[key] = obj[key]
    })
    this.ignoreKey = ['_swap', '_arr']
    this._swap = this.changeKey('value')
    this._arr = this.changeList()
    this._value = this.getValues()
  }

  getReverseMap() {
    let _obj = {}
    Object.keys(this).forEach((key) => {
      if (!this.ignoreKey.includes(key)) {
        _obj[this[key]] = key
      }
    })
    return _obj
  }

  changeKey(param) {
    let _obj = {}
    Object.keys(this).forEach((key) => {
      if (
        !this.ignoreKey.includes(key) &&
        Object.prototype.toString.call(this[key]) === '[object Object]'
      ) {
        let temp = JSON.parse(JSON.stringify(this[key]))
        temp[param] = key
        _obj[this[key][param]] = temp
      }
    })
    return _obj
  }

  getItem(param, value) {
    let arr = []
    Object.keys(this).forEach((key) => {
      if (
        !this.ignoreKey.includes(key) &&
        Object.prototype.toString.call(this[key]) === '[object Object]' &&
        this[key][param] === value
      ) {
        arr.push(this[key])
      }
    })
    return arr
  }

  changeList() {
    let arr = []
    Object.keys(this).forEach((key) => {
      if (
        !this.ignoreKey.includes(key) &&
        Object.prototype.toString.call(this[key]) === '[object Object]'
      ) {
        arr.push(this[key])
      }
    })
    return arr
  }

  getMsg(val) {
    return this._swap[val] || {}
  }

  getKey(val) {
    return this.getMsg(val).value
  }

  getLabel(val) {
    return this.getMsg(val).label
  }

  isInclude(val, keyArr) {
    if (!Array.isArray(keyArr)) {
      keyArr = [keyArr]
    }
    return keyArr.includes(this.getKey(val))
  }

  getValues() {
    const arr = []
    Object.keys(this).forEach((key) => {
      if (
        !this.ignoreKey.includes(key) &&
        Object.prototype.toString.call(this[key]) === '[object Object]'
      ) {
        arr.push(this[key].value)
      }
    })
    return arr
  }
}
