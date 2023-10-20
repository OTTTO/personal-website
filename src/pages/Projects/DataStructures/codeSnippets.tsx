export const codeSnippets = {
  stack: {
    node: {
      python: `class Node:
  def __init__(self, data, next = None):
    self.data = data
    self.next = next`,
      javascript: `class Node {
  constructor(data, next) {
    this.data = data;
    this.next = next;
  }
}`,
    },
    class: {
      python: `class Stack:
  def __init__(self):
    self.top = None`,
      javascript: `class Stack {
  constructor() {
    this.top = null;
  }
}`,
    },
    push: {
      python: `#push an element on the top of the stack
def push(self, data):
  node = Node(data)
  # if the stack is not empty
  if (self.top):
    # point the new node to the top of the stack
    node.next = self.top
  # set the top of the stack to be the new node
  self.top = node`,
      javascript: `// push an element on the top of the stack
push(data) {
  const node = new Node(data);
  // if the stack is not empty
  if (this.top)
    // point the new node to the top of the stack
    node.next = this.top;
  // set the top of the stack to be the new node
  this.top = node;
}`,
    },
    pop: {
      python: `#remove and return the top element
def pop(self):
  # if the stack is not empty
  if (self.top):
    # store the top's data
    # since we will be changing the reference to top 
    data = self.top.data
    # set top to be next node down the stack
    self.top = self.top.next
    return data
  # if stack is empty return None
  else:
          return None`,
      javascript: `// remove and return the top element
pop() {
  // if the stack is not empty
  if (this.top) {
    // store the top's data
    // since we will be changing the reference to top 
    const data = this.top.data;
    // set top to be next node down the stack
    this.top = this.top.next;
    return data;
  // if stack is empty return null
  } else {
    return null;
  }
}`,
    },
    peek: {
      python: `#read the top element
def peek(self):
  # if stack is not empty, return top data
  if (self.top):
    return self.top.data
  # if stack is empty return None
  else:
    return None`,
      javascript: `// read the top element
peek() {
  // if stack is not empty, return top data
  if (this.top) return this.top.data;
  // if stack is empty, return null
  else return null;
}`,
    },
    builtIn: {
      javascript: `const stack = []
stack.push(1)
stack.push(2)
stack.push(3)
console.log(stack) // [1, 2, 3]
let top = stack.pop()
console.log(top) // 3
console.log(stack) // [1, 2]
stack.slice(-1)[0] // 2 (peek)
console.log(stack) // [1,2]`,
      python: `const stack = []
stack.append(1)
stack.append(2)
stack.append(3)
print(stack) # [1, 2, 3]
let top = stack.pop()
print(top) # 3
print(stack) # [1, 2]
stack[-1] # 2 (peek)
print(stack) # [1,2]`,
    },
    reverseString: {
      python: `# reverse string with a stack and join list
def reverseString(string):
  stack = []
  
  # push chars onto stack 
  for char in string:
    stack.append(char)

  reversed = []
  # pop chars from stack and put them in a list
  # this is where the reversal takes place
  while(stack):
    reversed.append(stack.pop())
  return(''.join(reversed))
  
  #ippississiM
  print(reverseString('Mississippi'))`,
      javascript: `// reverse string with a stack and join list
reverseString = (string) => {
  stack = []
  // push chars onto stack 
  for (char of string)
    stack.push(char)

  reversedList = []
  // pop chars from stack and put them in a list
  // this is where the reversal takes place
  while(stack.length > 0)
    reversedList.push(stack.pop())
  return(reversedList.join(''))
}

//ippississiM
console.log(reverseString('Mississippi'));`,
    },
  },
  queue: {
    node: {
      python: `class Node:
  def __init__(self, data, next = None, prev = None):
    self.data = data
    self.next = next
    self.prev = prev`,
      javascript: `class Node { 
  constructor(data, next, prev) {
    this.data = data;
    this.next = next;
    this.prev = prev;
  }
}`,
    },
    class: {
      python: `class Queue:
  def __init_(self):
    self.tail = None
    self.head = None`,
      javascript: `class Queue {
  constructor() {
    this.tail = null;
    this.head = null;
  }
}`,
    },
    enqueue: {
      python: `# add a node to the tail
def enqueue(self, data):
  node = Node(data)
  # if queue is empty
  if (self.head is None):
    # point both head and tail to the new node
    self.head = self.tail = node
  else:
    # point the new node to the tail
    node.next = self.tail
    # point the tail back to the new node
    # this completes the linkage
    self.tail.prev = node
    # set the node to be the new tail
    self.tail = node`,
      javascript: `// add a node to the tail
enqueue(data) {
  const node = new Node(data);
  // if queue is empty
  if (!this.head) {
    // point both head and tail to the new node
    this.head = this.tail = node;
  } else {
    // point the new node to the tail
    node.next = this.tail;
    // point the tail back to the new node
    // this completes the linkage
    this.tail.prev = node;
    // set the node to be the new tail
    this.tail = node;
  }
}`,
    },
    deque: {
      python: `# remove a node from the head
def deque(self):
  # if queue is empty
  if (self.head is None):
    return None
  # save data on head node
  # since we will be changing the reference to head
  data = self.head.data
  # if there is more than one node in the queue
  if (self.head.prev):
    # reference to head moves back one node
    self.head = self.head.prev
  # if we are dequing the last node
  else:
    # reset the queue
    self.head = None
    self.tail = self.head
  return data`,
      javascript: `// remove a node from the head
deque() {
  // if queue is empty
  if (!this.head)
    return null;
  // save data on head node
  // since we will be changing the reference to head
  const data = this.head.data;
  // if there is more than one node in the queue  
  if (this.head.prev)
    // reference to head moves back one node
    this.head = this.head.prev;
  // if we are dequing the last node
  else { 
    // reset the queue
    this.head = null;
    this.tail = this.head;
  }
  return data;
}`,
    },
    builtIn: {
      python: `queue = []
# insert value at the 0th index (the rear)
queue.insert(0, 1)
queue.insert(0, 2)
queue.insert(0, 3)
print(queue) # [3, 2, 1]
front = queue.pop()
print(front) # 1
print(queue) # [3, 2]`,
      javascript: `const queue = []
queue.unshift(1)
queue.unshift(2)
queue.unshift(3)
console.log(queue) // [3, 2, 1]
const front = queue.pop()
console.log(front) // 1
console.log(queue) // [3, 2]`,
    },
  },
  sll: {
    node: {
      python: `class Node:
  def __init__ (self, data, next = None):
    self.data = data
    self.next = next`,
      javascript: `class Node {
  constructor(data, next) {
    this.data = data;
    this.next = next;
  }
}`,
    },
    class: {
      python: `class SinglyLinkedList:
  def __init__(self):
    self.tail = None
    self.head = None
    self.size = 0`,
      javascript: `class SinglyLinkedList {
  constructor() {
    this.tail = null;
    this.head = null;
    this.size = 0;
  }
}`,
    },
    append: {
      python: `# add node to end of list 
def append(self, data):
  node = Node(data);
  # add node to empty list
  if (self.tail is None):
    self.tail = node
  else:
    # start at tail of list
    curr = self.tail
    # iterate until end of list
    while (curr.next):
      curr = curr.next
    # add node to end of list
    curr.next = node
  # increase size of list
  self.size = self.size + 1`,
      javascript: `// add node to end of list 
append(data) {
  const node = new Node(data);
  // add node to empty list
  if (!this.tail)
    this.tail = node;
  else {
    // start at tail of list
    let curr = this.tail;
    // iterate until end of list
    while (curr.next) 
      curr = curr.next;
    // add node to end of list
    curr.next = node;
  }
  // increase size of list
  this.size += 1
}`,
    },
    remove: {
      python: ` # remove a node by index
def remove(self, idx):
  # empty list, nothing to remove
  if (self.tail is None):
    return False
  # if index out of bounds
  # size starts with 1, idx starts with 0
  # so increase idx by 1 to rectify
  if (idx + 1 > self.size):
    return False
  # if tail is to be removed
  if (idx == 0):
    # set next after tail to be the new tail
    self.tail = self.tail.next
    # decrease size of list
    self.size -= 1
    return True
  # start at tail of list
  curr = self.tail
  # iterate list
  # curr needs to be the node before the deletion (idx - 1)
  for _ in range(idx - 1):
    curr = curr.next
  # set next reference to be the following node
  curr.next = curr.next.next
  # decrease size of list
  self.size -= 1
  return True`,
      javascript: `// remove a node by index
remove(idx) {
  // empty list, nothing to remove
  if (!this.tail)
    return false;
  // if index out of bounds
  // size starts with 1, idx starts with 0
  // so increase idx by 1 to rectify
  if (idx + 1 > this.size) {
    return false
  }
  // if tail is to be removed
  if (idx === 0) {
    // set next after tail to be the new tail
    this.tail = this.tail.next;
    // decrease size of list
    this.size -= 1;
    return true;
  }
  // start at tail of list
  let curr = this.tail;
  // iterate list
  // curr needs to be the node before the deletion (idx - 1)
  for (let i = 0; i < idx - 1; i++) {
    curr = curr.next;
  }
  // set next reference to be the following node
  curr.next = curr.next.next;
  // decrease size of list
  this.size -= 1;
  return true;
} `,
    },
    get: {
      python: `# get the data of a node by index
def get(self, idx):
  if (self.size == 0):
    raise Exception('Empty List')
  if (self.size < idx + 1):
    raise Exception('Index out of bounds')
  curr = self.tail
  # iterate over the list until index is reached
  # we have found the node
  for _ in range(idx):
    curr = curr.next
  return curr.data`,
      javascript: `// get the data of a node by index
get(idx) {
  if (this.size === 0)
    throw new Error('Empty List')
  if (this.size < idx + 1)
    throw new Error('Index out of bounds')
  let curr = this.tail
  // iterate over the list until index is reached
  // we have found the node
  for (let i = 0; i < idx; i++) {
    curr = curr.next;
  }
  return curr.data;
}`,
    },
    length: {
      python: `#get the size of the list
def length(self):
  return self.size;`,
      javascript: `// get the size of the list
length() {
    return this.size;
}`,
    },
  },
  dll: {
    node: {
      python: `class Node:
  def __init__ (self, data, next = None, prev = None):
    self.data = data
    self.next = next
    self.prev = prev `,
      javascript: `class Node {
  constructor(data, next, prev) {
    this.data = data
    this.next = next
    this.prev = prev 
  }
}`,
    },
    class: {
      python: `class DoublyLinkedList:
  def __init__(self):
    self.tail = None
    self.head = None
    self.size = 0`,
      javascript: `class DoublyLinkedList {
  constructor() {
    this.tail = null
    this.head = null
    this.size = 0
  }
}`,
    },
    getNode: {
      python: `# PRIVATE HELPER METHOD
# get a node by index
def __getNode(self, idx):
  if (self.size == 0):
    raise Exception('Empty List')
  if (self.size < idx + 1):
    raise Exception('Index out of bounds')
  curr = self.tail
  for _ in range(idx):
    curr = curr.next
  return curr`,
      javascript: `// PRIVATE HELPER METHOD
// get a node by index
#getNode(idx) {
  if (this.size == 0)
    throw new Error('Empty List')
  if (this.size < idx + 1)
    throw new Error('Index out of bounds')
  let curr = this.tail
  for (let i = 0; i < idx; i++)
    curr = curr.next
  return curr
}`,
    },

    insertBefore: {
      python: `# insert Node before Node at index
def insertBefore(self, idx, data):
  # get node to insert before
  node = self.__getNode(idx)
  # new node pointing forward to that node
  newNode = Node(data, node)
  # if we are inserting at the beginning 
  if (node.prev is None):
    self.tail = newNode
  else:
    #connect the nodes
    newNode.prev = node.prev
    node.prev.next = newNode
    node.prev = newNode
  self.size = self.size + 1`,
      javascript: `// insert Node before Node at index
insertBefore(idx, data) {
  // get node to insert before
  const node = this.#getNode(idx)
  // new node pointing forward to that node
  const newNode = new Node(data, node)
  // if we are inserting at the beginning 
  if (!node.prev) {
    this.tail = newNode
  } else {
    // connect the nodes
    newNode.prev = node.prev
    node.prev.next = newNode
    node.prev = newNode
  }
  this.size += 1
}`,
    },
    prepend: {
      python: `# insert Node at beginning of list
def prepend(self, data):
# if list is empty
if (self.tail is None):
  self.tail = self.head = Node(data)
  size.size = self.size + 1
else:
  self.insertBefore(0, data)`,
      javascript: `// insert Node at beginning of list
prepend(data) {
  // if list is empty
  if (!this.tail) {
    this.tail = this.head = new Node(data)
    this.size += 1
  } else {
    this.insertBefore(0, data)
  }
}`,
    },
    insertAfter: {
      python: `# insert Node after Node at index
def insertAfter(self, idx, data):
  # get node to insert after
  node = self.__getNode(idx)
  # new node pointing back to that node
  newNode = Node(data, None, node)
  # if we are inserting at the end
  if (node.next is None):
    self.head = newNode
  else:
    # connect the nodes
    newNode.next = node.next
    node.next.prev = newNode
    node.next = newNode
  self.size = self.size + 1`,
      javascript: `// insert Node after Node at index
insertAfter(idx, data) {
  // get node to insert after
  const node = this.#getNode(idx)
  // new node pointing back to that node
  const newNode = new Node(data, null, node)
  // if we are inserting at the end
  if (!node.next){
    this.head = newNode
  } else {
    // connect the nodes
    newNode.next = node.next
    node.next.prev = newNode
    node.next = newNode
  }
  this.size += 1
}`,
    },
    append: {
      python: `# insert Node at end of list
def append(self, data):
  # if list is empty
  if (self.tail is None):
    self.tail = self.head = Node(data)
    self.size = self.size + 1
  else:
    endIndex = self.size - 1
    self.insertAfter(endIndex, data)`,
      javascript: `// insert Node at end of list
append(data) {
  // if list is empty
  if (!this.tail) {
    this.tail = this.head = new Node(data)
    this.size += 1
  } else {
    const endIndex = this.size - 1
    this.insertAfter(endIndex, data)
  }
}`,
    },
    get: {
      python: `# get by index
def get(self, idx):
  node = self.__getNode(idx)
  return node.data`,
      javascript: `// get by index
get(idx) {
  const node = this.#getNode(idx)
  return node.data
}`,
    },
    remove: {
      python: `# remove by index
def remove(self, idx):
  # get node at this index
  node = self.__getNode(idx)
  # if node is at the beginning
  if (node.prev is None):
    # adjust tail to be the next node
    self.tail = node.next
  # if node is somewhere in the middle
  elif (node.next):
    node.prev.next = node.next
  # if node is at the end
  else: 
    self.head = self.head.prev
  self.size = self.size - 1`,
      javascript: `// remove by index
remove(idx) {
  // get node at this index
  const node = this.#getNode(idx)
  // if node is at the beginning
  if (!node.prev)
    // adjust tail to be the next node
    this.tail = node.next
  // if node is somewhere in the middle
  else if (node.next)
    node.prev.next = node.next
  // if node is at the end
  else
    this.head = this.head.prev
  this.size -= 1
}`,
    },
    length: {
      python: `# get length of list
def length(self):
  return self.size`,
      javascript: `// get length of list
length() {
  return this.size
}`,
    },
  },
  bst: {
    class: {
      python: `class BST:
  def __init__(self, key = None, data = None):
    self.key = key
    self.data = data
    self.left = None
    self.right = None`,
      javascript: `class BST {
  constructor(data) {
    this.key = key
    this.data = data
    this.left = null
    this.right = null
}`,
    },
    insert: {
      python: `# insert a node into the bst
  def insert(self, key, data):
    node = BST(key, data)
    # tree is empty
    if (self.key is None):
      self.key = key
      self.data = data
      return 
    # key already exists in tree
    if (self.key == key):
      return
    # key is less than this node
    if (key < self.key):
      # node doesn't have a left child
      if (self.left is None):
        self.left = node
      # else recurse left
      else:
        self.left.insert(key, data)
    # key is greater than this node
    elif (key > self.key):
      # node doesn't have a right child
      if (self.right is None):
        self.right = node
      # else recurse right
      else:
        self.right.insert(key, data)`,
      javascript: `// insert a node into the bst
      insert(key, data) {
        const node = new BST(key)
        // tree is empty
        if (!this.key) {
          this.key = key
          this.data = data
          return 
        }
        // key already exists in tree
        if (this.key === key) return
        // key is less than this node
        if (key < this.key) {
          // node doesn't have a left child
          if (!this.left)
            this.left = node
          // else recurse left
          else
            this.left.insert(key, data)
        }
        // key is greater than this node
        else if (key > this.key) {
          // node doesn't have a right child
          if (!this.right)
            this.right = node
          // else recurse right
          else
            this.right.insert(key, data)
        }
      }`,
    },
    exists: {
      python: `# check if an element exists
def exists(self, key):
  if (self.key == key):
    return True
  elif (self.key > key and self.left):
    return self.left.exists(key)
  elif (self.key < key and self.right):
    return self.right.exists(key)
  else:
    return False`,
      javascript: `// check if an element exists
exists(key) {
  if (this.key == key)
    return true
  else if (this.key > key && this.left)
    this.left.exists(key)
  else if (this.key < key && this.right)
    this.right.exists(key)
  else
    return false
}`,
    },
    min: {
      python: `# get the smallest node from the current node
# used as a helper method
# to get the succesor when deleting a node
def __min__(self):
  node = self
  while (node.left):
    node = node.left
  return node`,
      javascript: `// get the smallest node from the current node
// used as a helper method
// to get the succesor when deleting a node
#min() {
  let node = this
  while (node.left)
    node = node.left
  return node
}`,
    },
    get: {
      python: `# get data of node given by key
def get(self, key):
  print(self.key, key)
  if (self.key == key):
    return self.data
  elif (self.key > key and self.left):
    return self.left.get(key)
  elif (self.key < key and self.right):
    return self.right.get(key)
  else:
    return None`,
      javascript: `// get data of node given by key
get(key) {
  if (this.key === key)
    return this.data
  else if (this.key > key && this.left)
    return this.left.get(key)
  else if (this.key < key && this.right)
    return this.right.get(key)
  else
    return null
}`,
    },
    replaceRoot: {
      python: `# helper method to replace root
def __replaceRoot__(self, replace):
    self.key = replace.key
    self.data = replace.data
    self.left = replace.left
    self.right = replace.right`,
      javascript: `// helper method to replace root
#replaceRoot(replace) {
    this.key = replace.key
    this.data = replace.data      
    this.left = replace.left
    this.right = replace.right
}`,
    },
    delete: {
      python: `# to delete a node in the tree
def delete(self, key, isRoot = True):
  if (self is None):
    return null
  if (key < self.key):
    # recurse left, set returned subtree equal to left child
    self.left = self.left.delete(key, False)
    return self
  if (key > self.key):
    # recurse right, set returned subtree equal to right child
    self.right = self.right.delete(key, False)      
    return self

  # logic to replace the root node
  if (isRoot):
    if (self.left is None and self.right is None):
      self.key = None
      self.data = None
    elif (self.left is None):
      self.__replaceRoot__(self.right)
    elif (self.right is None):
      self.__replaceRoot__(self.left)
  

  elif (self.left is None):
    return self.right
  elif (self.right is None):
    return self.left

  # if node has both children
  # select successor as 
  # smallest node of right child
  successor = self.right.__min__()
  # replace node with successor
  self.key = successor.key
  self.data = successor.data
  # delete successor
  self.right = self.right.delete(successor.key, False)
  return self`,
      javascript: `// to delete a node in the tree
delete(key, isRoot = true) {
  if (!this) {
    return null
  }
  if (key < this.key) {
    // recurse left, set returned subtree equal to left child
    this.left = this.left.delete(key, false)
    return this
  }
  if (key > this.key) {
    // recurse right, set returned subtree equal to right child
    this.right = this.right.delete(key, false)      
    return this
  }

  // logic to replace the root node
  if (isRoot) {
    if (!this.left && !this.right) 
      this.key = null
      this.data = null
    else if (!this.left)
      this.#replaceRoot(this.right)
    else if (!this.right)
      this.#replaceRoot(this.left)
  } 
  
  if (!this.left)
    return this.right
  if (!this.right)
    return this.left

  // if node has both children
  // select successor as 
  // smallest node of right child
  const successor = this.right.#min()
  // replace node with successor
  this.key = successor.key
  this.data = successor.data
  // delete successor
  this.right = this.right.delete(successor.key, false)
  return this
}`,
    },
  },
};
