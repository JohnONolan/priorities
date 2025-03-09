# Priorities App - Implementation Plan

## Overview
This plan outlines the step-by-step implementation of the minimalist Priorities app with a focus on speed, simplicity, and user experience. We will follow the Expo/React Native/TypeScript best practices while maintaining a streamlined development process.

## Technology Stack
- **Framework**: Expo/React Native
- **Language**: TypeScript
- **Styling**: React Native with TailwindCSS (via NativeWind)
- **State Management**: React's useState (local component state only)
- **Storage**: AsyncStorage for persistence
- **UI Components**: Native components, avoiding heavy third-party libraries

## Implementation Phases

### Phase 1: Project Setup [MINOR]
1. Verify Expo SDK version and dependencies
2. Install and configure NativeWind for Tailwind styling
3. Configure TypeScript with appropriate interfaces
4. Set up the root layout file with SafeAreaProvider

### Phase 2: Data Model [MINOR]
1. Define TypeScript interface for Todo items:
```typescript
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}
```

### Phase 3: Core Components [MODERATE]

#### Todo Item Component
1. Create `TodoItem.tsx` with:
   - Checkbox for completion
   - Text display
   - Styling for different states
   - Animation for completion

#### Todo List Component
1. Create `TodoList.tsx` that:
   - Renders list of Todo items
   - Handles empty state
   - Shows appropriate messaging based on todo count

#### Input Component
1. Create `TodoInput.tsx` with:
   - Text input field
   - Add button
   - Logic to show/hide based on todo count

### Phase 4: Main Screen [MODERATE]
1. Create `app/index.tsx` as the single screen application
2. Implement state management:
   - Todo items array
   - Current input text
   - Functions for adding and completing todos
3. Compose the UI with the components created earlier
4. Add basic animations and transitions

### Phase 5: Storage Implementation [MINOR]
1. Implement AsyncStorage for data persistence
2. Create utility functions for saving and loading todos
3. Integrate storage with the main component

### Phase 6: Styling and Polish [MODERATE]
1. Apply consistent TailwindCSS styling
2. Implement animations for adding/completing todos
3. Ensure proper spacing and visual hierarchy
4. Test and adjust for different screen sizes

### Phase 7: Testing and Optimization [MINOR]
1. Manual testing on iOS simulator
2. Performance optimization if needed
3. Address any edge cases or bugs

## Detailed Implementation Steps

### 1. Project Setup
First, we'll set up the NativeWind for Tailwind CSS support:

```bash
npm install nativewind
npm install --save-dev tailwindcss@3.3.2
```

Configure tailwind.config.js:

```js
// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Update babel.config.js to include NativeWind:

```js
// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel"],
  };
};
```

Create a global.d.ts file for NativeWind:

```typescript
// global.d.ts
/// <reference types="nativewind/types" />
```

### 2. Data Model
Define the types in a separate file:

```typescript
// types/index.ts
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}
```

### 3. Components Implementation

#### TodoItem Component
```typescript
// components/TodoItem.tsx
import React, { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onComplete: (id: string) => void;
}

export function TodoItem({ todo, onComplete }: TodoItemProps) {
  return (
    <Pressable 
      onPress={() => onComplete(todo.id)}
      className="flex-row items-center p-4 bg-white rounded-lg shadow-sm mb-2"
    >
      <View className={`w-6 h-6 rounded-full border-2 mr-3 items-center justify-center ${todo.completed ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
        {todo.completed && <Ionicons name="checkmark" size={16} color="white" />}
      </View>
      <Text className={`text-base ${todo.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
        {todo.text}
      </Text>
    </Pressable>
  );
}
```

#### TodoList Component
```typescript
// components/TodoList.tsx
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { TodoItem } from './TodoItem';
import { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
  onComplete: (id: string) => void;
}

export function TodoList({ todos, onComplete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-lg text-gray-500 text-center mb-2">
          What are your top priorities today?
        </Text>
        <Text className="text-base text-gray-400 text-center">
          Tap the input below to add your first priority
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TodoItem 
          todo={item} 
          onComplete={onComplete} 
        />
      )}
      className="flex-1 w-full px-4"
    />
  );
}
```

#### TodoInput Component
```typescript
// components/TodoInput.tsx
import React, { useState } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';

interface TodoInputProps {
  onAdd: (text: string) => void;
  disabled: boolean;
}

export function TodoInput({ onAdd, disabled }: TodoInputProps) {
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  if (disabled) {
    return null; // Hide input when max todos reached
  }

  return (
    <View className="flex-row items-center px-4 py-3 border-t border-gray-200">
      <TextInput
        className="flex-1 p-3 bg-gray-100 rounded-lg text-gray-800"
        placeholder="Add a priority..."
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleAdd}
      />
      <Pressable 
        onPress={handleAdd}
        disabled={!text.trim()}
        className={`ml-2 p-3 rounded-lg ${!text.trim() ? 'bg-gray-300' : 'bg-blue-500'}`}
      >
        <Text className="text-white font-medium">Add</Text>
      </Pressable>
    </View>
  );
}
```

### 4. Main App Screen
```typescript
// app/index.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import { TodoList } from '../components/TodoList';
import { TodoInput } from '../components/TodoInput';
import { Todo } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'priorities_todos';
const MAX_TODOS = 5;

export default function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Load todos from storage on initial render
  useEffect(() => {
    loadTodos();
  }, []);

  // Save todos to storage whenever they change
  useEffect(() => {
    saveTodos();
  }, [todos]);

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (e) {
      console.error('Failed to load todos from storage');
    }
  };

  const saveTodos = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (e) {
      console.error('Failed to save todos to storage');
    }
  };

  const handleAddTodo = (text: string) => {
    if (todos.length >= MAX_TODOS) return;
    
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    
    setTodos([...todos, newTodo]);
  };

  const handleCompleteTodo = (id: string) => {
    // Mark as completed
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );
    
    // Remove after delay
    setTimeout(() => {
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <View className="flex-1">
        <TodoList 
          todos={todos} 
          onComplete={handleCompleteTodo} 
        />
        <TodoInput 
          onAdd={handleAddTodo} 
          disabled={todos.length >= MAX_TODOS} 
        />
      </View>
    </SafeAreaView>
  );
}
```

## Speed Optimizations

To prioritize speed in implementation and performance:

1. **Minimal Dependencies**:
   - Use only essential packages (NativeWind for styling, AsyncStorage for persistence)
   - Avoid heavy third-party component libraries

2. **Simplified Architecture**:
   - Single screen app with no navigation complexity
   - Local component state instead of complex state management solutions
   - AsyncStorage for simple persistence without a database

3. **Performance Considerations**:
   - Use FlatList for efficient rendering
   - Implement memo for pure components if needed
   - Keep animations minimal and performant

4. **Development Speed**:
   - Implement in logical phases with testable checkpoints
   - Focus on core functionality first, then add polish
   - Use TypeScript properly but avoid over-engineering types

## Alternative Approaches

1. **Even More Minimal**:
   - Skip NativeWind and use basic React Native styling
   - Use in-memory state only (no persistence)
   - Remove all animations and transitions

2. **Web-First Approach**:
   - Target web platform first for faster development cycles
   - Test on iOS simulator less frequently
   - Use Expo Web for development

3. **Reduced TypeScript**:
   - Use minimal TypeScript with 'any' types where appropriate
   - Focus on runtime behavior over compile-time type safety

## Next Steps

After implementing the basic app as outlined above:

1. Test on iOS simulator
2. Address any performance issues
3. Add any missing polish or animations
4. Consider implementing deletion gesture if needed

The focus throughout will be on creating a minimal, fast, and user-friendly experience while adhering to the principles outlined in the interface plan. 