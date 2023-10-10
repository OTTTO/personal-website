export const codeSnippets = {
  stack: {
    node: {
      javascript: `class Node {
  constructor(data, next) {
    this.data = data;
    this.next = next;
  }
}`,
      python: `class Node:
  def __init__(self, data, next):
    self.data = data
    self.next = next`,
    },
    class: {
      javascript: `class Stack {
  constructor() {
    this.top = null;
  }
}`,
      python: `class Stack:
  def __init__(self):
    self.top = None`,
    },
    push: {
      javascript: `// push an element on the top of the stack
push(data) {
  const node = new Node(data);
  if (this.top) node.next = this.top;
  this.top = node.next;
}`,
      python: `#push an element on the top of the stack
def push(self, data):
  node = new Node(data);
  if (self.top):
    node.next = self.top;
    self.top = node.next;
}`,
    },
    pop: {
      javascript: `// remove and return the top element
pop() {
  if (this.top) {
    const data = this.top.data;
    this.top = this.top.next;
    return data;
  } else {
    return null;
  }
}`,
      python: `#remove and return the top element
def pop(self):
  if (self.top):
    data = self.top.data;
    self.top = self.top.next;
    return data;
  else:
    return None;
`,
    },
    peek: {
      javascript: `// read the top element
peek() {
  this.top.data
}`,
      python: `#read the top element
def peek(self) {
  self.top.data
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
  def __init__(self, data, next, prev):
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
  constructor(self):
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
  node = new Node(data)
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
  if (!self.head):
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
    self.head = null;
    self.tail = self.head;
  return data;`,
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
};
