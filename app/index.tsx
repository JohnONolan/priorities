import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StatusBar, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TodoList } from '../components/TodoList';
import { TodoInput } from '../components/TodoInput';
import { Todo } from '../types';

const MAX_TODOS = 5;
const STORAGE_KEY = 'priorities_todos';

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

  const handleAddTodo = (text: string) => {
    if (todos.length >= MAX_TODOS) return;
    
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: Date.now()
    };
    
    setTodos([...todos, newTodo]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <View className="pt-4 pb-2 px-5 border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-800">Priorities</Text>
        <Text className="text-sm text-gray-500 mt-1">{todos.length}/5 priorities</Text>
      </View>
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