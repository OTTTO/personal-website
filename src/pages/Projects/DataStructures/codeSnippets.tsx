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
    stack: {
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
};
