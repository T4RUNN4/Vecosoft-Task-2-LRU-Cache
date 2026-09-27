const Cache = require("./cache");
const cache = new Cache(2);

cache.put("A", 10);
cache.put("B", 20);

console.log(cache.get("A"));

cache.put("C", 30);

console.log(cache.get("B"));
console.log(cache.get("C"));
console.log(cache.get("A"));
