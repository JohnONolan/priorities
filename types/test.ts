// types/test.ts
import { Todo } from './index';

// Test creating a Todo object with the interface
const testTodo: Todo = {
  id: '1',
  text: 'Test todo',
  completed: false,
  createdAt: Date.now()
};

// This is just a test file to verify TypeScript integration
console.log('Todo interface imported successfully:', testTodo); 