const HashTable = require("./hash-table"); // Import the HashTable class

test("get value from empty hashmap", () => {
  let ht = new HashTable(1);

  expect(ht.get(17)).toBe(-1);
});

test("insert and retrieve the value from hashmap", () => {
  let ht = new HashTable(1);
  ht.insert(1, 5);
  expect(ht.get(1)).toBe(5);

  ht.insert(0, 2);
  expect(ht.get(0)).toBe(2);

  ht.insert(1, 7);
  expect(ht.get(1)).toBe(7);

  ht.insert(5, 11);
  expect(ht.get(1)).toBe(7);
  expect(ht.get(5)).toBe(11);

  expect(ht.get(2)).toBe(-1);
});

test("hashmap automatically resizes", () => {
  let ht = new HashTable(2);

  ht.insert(0, 3);
  expect(ht.getSize()).toBe(1);
  expect(ht.getCapacity()).toBe(4);
  expect(ht.get(0)).toBe(3);

  ht.insert(1, 5);
  expect(ht.getSize()).toBe(2);
  expect(ht.getCapacity()).toBe(8);
  expect(ht.get(1)).toBe(5);

  ht.insert(2, 7);
  expect(ht.getSize()).toBe(3);
  expect(ht.getCapacity()).toBe(8);
  expect(ht.get(2)).toBe(7);

  ht.insert(2, 11);
  expect(ht.getSize()).toBe(4);
  expect(ht.getCapacity()).toBe(16);
  expect(ht.get(2)).toBe(11);

  ht.insert(3, 13);
  expect(ht.getSize()).toBe(5);
  expect(ht.getCapacity()).toBe(16);
  expect(ht.get(3)).toBe(13);
});

test("hashmap removes single element", () => {
  let ht = new HashTable(4);
  expect(ht.getSize()).toBe(0);

  ht.insert(0, 3);
  expect(ht.getSize()).toBe(1);
  expect(ht.remove(0)).toBe(true);
  expect(ht.getSize()).toBe(0);

  ht.insert(0, 3);
  expect(ht.remove(0)).toBe(true);
  expect(ht.remove(0)).toBe(false);
  expect(ht.get(0)).toBe(-1);
  expect(ht.getSize()).toBe(0);

  expect(ht.remove(10)).toBe(false);
});

test("neetcode case3", () => {
  let ht = new HashTable(8);
  ht.insert(8, 0);
  ht.insert(16, 0);
  ht.insert(24, 0);
  expect(ht.get(8)).toBe(0);
  expect(ht.get(16)).toBe(0);
  expect(ht.get(24)).toBe(0);
});
