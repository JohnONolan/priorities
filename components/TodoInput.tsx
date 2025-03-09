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
    <View className="flex-row items-center px-5 py-4 border-t border-gray-200 bg-white">
      <TextInput
        className="flex-1 p-3 bg-gray-100 rounded-lg text-gray-800"
        placeholder="Add a priority..."
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleAdd}
        returnKeyType="done"
        maxLength={100}
      />
      <Pressable 
        onPress={handleAdd}
        disabled={!text.trim()}
        className={`ml-3 px-4 py-3 rounded-lg ${!text.trim() ? 'bg-gray-300' : 'bg-blue-500'}`}
      >
        <Text className="text-white font-medium">Add</Text>
      </Pressable>
    </View>
  );
} 