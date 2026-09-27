class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class Cache {
  constructor(capacity) {
    if (capacity <= 0) {
      throw new Error("Capacity must be positive");
    }

    this.capacity = capacity;
    this.map = new Map();

    // Dummy nodes
    this.head = new Node(null, null);
    this.tail = new Node(null, null);

    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  // Add node immediately after head
  addToFront(node) {
    node.prev = this.head;
    node.next = this.head.next;

    this.head.next.prev = node;
    this.head.next = node;
  }

  // Remove a node from the linked list
  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  // Move an existing node to the front
  moveToFront(node) {
    this.removeNode(node);
    this.addToFront(node);
  }

  // Remove the least recently used node
  removeLRU() {
    const lruNode = this.tail.prev;

    if (lruNode === this.head) {
      return null;
    }

    this.removeNode(lruNode);
    this.map.delete(lruNode.key);

    return lruNode;
  }

  get(key) {
    // Key does not exist
    if (!this.map.has(key)) {
      return -1;
    }

    const node = this.map.get(key);

    // Successful get makes it most recently used
    this.moveToFront(node);

    return node.value;
  }

  put(key, value) {
    // Key already exists
    if (this.map.has(key)) {
      const node = this.map.get(key);

      node.value = value;
      this.moveToFront(node);

      return;
    }

    // Create new node
    const newNode = new Node(key, value);

    this.map.set(key, newNode);
    this.addToFront(newNode);

    // Remove LRU if capacity is exceeded
    if (this.map.size > this.capacity) {
      this.removeLRU();
    }
  }
}

module.exports = Cache;