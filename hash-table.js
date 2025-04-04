const Node = require("./node");

// This implementation using open addressing.
class HashTable {
  /**
   * @param {number} capacity
   */
  constructor(capacity) {
    this.capacity = capacity <= 1 ? 2 : capacity;
    this.size = 0;
    this.table = new Array(this.capacity).fill(null);
  }

  /**
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  insert(key, value) {
    let idx = this.hash(key);

    while (this.table[idx] !== null && this.table[idx].key !== key) {
      idx = (idx + 1) % this.capacity;
    }
    this.size += 1;
    this.table[idx] = new Node(key, value);

    // resize when when size is half of the capacity
    if (this.size / this.capacity >= 0.5) {
      this.resize();
    }
  }

  /**
   * @param {number} key
   * @returns {number}
   */
  get(key) {
    let idx = this.hash(key);

    while (this.table[idx] !== null) {
      if (this.table[idx].key === key) {
        return this.table.at(idx).value;
      }
      idx = (idx + 1) % this.capacity;
    }

    return -1;
  }

  /**
   * @param {number} key
   * @returns {boolean}
   */
  remove(key) {
    let idx = this.hash(key);
    while (this.table[idx] !== null) {
      if (this.table[idx].key === key) {
        this.table[idx] = null;
        this.size -= 1;
        return true;
      }
      idx = (idx + 1) % this.capacity;
    }

    return false;
  }

  /**
   * @returns {number}
   */
  getSize() {
    return this.size;
  }

  /**
   * @returns {number}
   */
  getCapacity() {
    return this.capacity;
  }

  /**
   * @return {void}
   */
  resize() {
    // TODO: make resizing use prime numbers

    this.capacity *= 2;

    let resizedTable = new Array(this.capacity).fill(null);
    for (let i = 0; i < this.table.length; i++) {
      let el = this.table[i];

      if (el !== null) {
        let idx = this.hash(el.key);
        resizedTable[idx] = el;
      }
    }

    this.table = resizedTable;
  }

  /**
   * @param {number} key
   * @returns {number}
   */
  hash(key) {
    return key % this.capacity;
  }
}

module.exports = HashTable;
