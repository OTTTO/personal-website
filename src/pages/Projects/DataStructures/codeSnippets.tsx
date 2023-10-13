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
    self.head = node
    self.tail = self.head
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
    this.head = node;
    this.tail = this.head;
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
  # if tail is to be removed
  if (idx == 0):
    # set next after tail to be the new tail
    self.tail = self.tail.next
    # decrease size of list
    self.size -= 1
    return True
  # if index out of bounds
  # size starts with 1, idx starts with 0
  # so increase idx by 1 to rectify
  if (idx + 1 > self.size):
    return False
  
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
  // if tail is to be removed
  if (idx === 0) {
    // set next after tail to be the new tail
    this.tail = this.tail.next;
    // decrease size of list
    this.size -= 1;
    return true;
  }
  // if index out of bounds
  // size starts with 1, idx starts with 0
  // so increase idx by 1 to rectify
  if (idx + 1 > this.size) {
    return false
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
};
