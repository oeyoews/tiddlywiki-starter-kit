---
title: 'Ojbect-entries'
tags: ['JavaScript']
created: 'Thu Jun 01 2023 02:01:25 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
type: 'text/vnd.tiddlywiki'
---

# Ojbect-entries

`Object.entries` is a built-in JavaScript method that returns an array of an object's own enumerable property pairs. It provides a convenient way to iterate over the properties of an object and access both the key and value of each property.

The syntax for `Object.entries` is as follows:

```javascript
Object.entries(obj)
```

Here, `obj` represents the object whose enumerable properties you want to retrieve. When called, `Object.entries` returns an array where each element is an array containing a key-value pair from the object. The order of the key-value pairs in the resulting array is the same as the order in which they are returned by a `for...in` loop (although the `for...in` loop does not guarantee the order).

Here's an example to illustrate its usage:

```javascript
const person = {
  name: 'John',
  age: 30,
  city: 'New York'
};

const entries = Object.entries(person);

console.log(entries);
```

Output:

```javascript
[
  ["name", "John"],
  ["age", 30],
  ["city", "New York"]
]
```

In the example above, `Object.entries` returns an array where each element is an array containing a key-value pair from the `person` object. The resulting array can be iterated over using array iteration methods such as `forEach`, `map`, or a `for...of` loop.

Note that `Object.entries` only retrieves the object's own enumerable properties, not inherited properties or properties with non-enumerable flags set. If you need to include inherited properties, you can use `Object.getOwnPropertyNames(obj)` in combination with `Object.entries` or utilize `for...in` loop.
