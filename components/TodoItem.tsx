import React, { useEffect } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onComplete: (id: string) => void;
}

export function TodoItem({ todo, onComplete }: TodoItemProps) {
  const opacity = new Animated.Value(1);

  useEffect(() => {
    if (todo.completed) {
      Animated.timing(opacity, {
        toValue: 0.5,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [todo.completed]);

  return (
    <Animated.View style={{ opacity }}>
      <Pressable 
        onPress={() => onComplete(todo.id)}
        className="flex-row items-center p-4 bg-white rounded-lg shadow-sm mb-3 border border-gray-100"
      >
        <View 
          className={`w-6 h-6 rounded-full border-2 mr-4 items-center justify-center ${todo.completed ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}
        >
          {todo.completed && <Ionicons name="checkmark" size={16} color="white" />}
        </View>
        <Text 
          className={`text-base flex-1 ${todo.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}
        >
          {todo.text}
        </Text>
      </Pressable>
    </Animated.View>
  );
} 