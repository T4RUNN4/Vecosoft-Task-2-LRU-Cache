# What happens internally?

After:

```
cache.put("A", 10);
cache.put("B", 20);
```

The order is:

```
B → A
```

B is most recently used.

Then:

```
cache.get("A");
```

Since A was accessed, it becomes most recently used:

```
A → B
```

Now:

```
cache.put("C", 30);
```

Capacity is 2, so we need to remove the least recently used item.

That's B:

```
A → C
```

Therefore:
```
cache.get("B"); // -1
cache.get("C"); // 30
cache.get("A"); // 10
```

Complexity

```
Operation	      Time
get(key)	      O(1) average
put(key, value)	  O(1) average
Remove LRU	      O(1)
Lookup key	      O(1) average
```

Space complexity:

```
O(capacity)
```
</br>
</br>


# Why do we need both Map and Linked List?

The Map alone can find an item quickly:

```
this.map.get(key);
```

But it doesn't efficiently tell us which item was least recently used.

The linked list maintains the order:

```
HEAD
 ↓
Most Recent
 ↓
 ...
 ↓
Least Recent
 ↓
TAIL
```

And because each Map entry points directly to its linked-list node, we can remove or move that node without searching through the list.

That's the key idea behind an LRU cache.