export const stack = {
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
};
