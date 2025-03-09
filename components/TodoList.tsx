import React from 'react';
import { View, Text, FlatList, Animated } from 'react-native';
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
        <Text className="text-xl text-gray-500 text-center mb-3 font-medium">
          What are your top priorities today?
        </Text>
        <Text className="text-base text-gray-400 text-center">
          Tap the input below to add your first priority
        </Text>
      </View>
    );
  }

  const renderItem = ({ item, index }: { item: Todo, index: number }) => {
    return (
      <Animated.View
        style={{
          transform: [{ 
            translateY: new Animated.Value(0).interpolate({
              inputRange: [0, 1],
              outputRange: [50, 0]
            })
          }],
          opacity: new Animated.Value(1)
        }}
      >
        <TodoItem 
          todo={item} 
          onComplete={onComplete} 
        />
      </Animated.View>
    );
  };

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      className="flex-1 w-full px-5 pt-4"
      contentContainerStyle={{ paddingBottom: 16 }}
      showsVerticalScrollIndicator={false}
    />
  );
} 