# Priorities App - Interface Plan

## Overview
Priorities is a minimalist todo app that helps users focus on their most important tasks. Unlike typical todo apps that encourage endless lists, Priorities enforces a maximum of 5 items, encouraging users to focus only on what truly matters.

## Core Principles
- **Minimalism**: Clean interface with only essential elements
- **Focus**: Limit of 5 todos to prevent overwhelming the user
- **Clarity**: When a task is completed, it is deleted
- **Ease of Use**: Simple, intuitive interactions with minimal friction

## Interface Components

### Todo List Section
- List of current priorities (0-5 items)
- Each todo item displayed as a card with:
  - Checkbox to mark as complete
  - Todo text with clear typography

### Input Section
- Text input field at the bottom of the screen
- Placeholder text: "Add a priority... (X/5)"
- Add button only enabled when text is entered and count < 5
- Input field and button are hidden when maximum of 5 items is reached

### Empty State
- When no priorities exist, show an encouraging message:
  - "What are your top priorities today?"
  - Simple illustration of checkbox or similar minimalist graphic
  - Clear CTA to add first priority

### Completed Items View
- Completed items are deleted when marked as complete

## Interactions

### Adding a Priority
1. User taps on input field
2. Enters text for the priority
3. Taps "Add" button or presses return
4. New priority appears at the bottom of the uncompleted items list
5. Input field clears, ready for next entry

### Completing a Priority
1. User taps checkbox next to a priority
2. Immediate visual feedback:
   - Checkbox fills
   - Text gets strikethrough
   - Item reduces in opacity
   - After a 1s delay, the item is deleted
3. No confirmation needed - simple tap interaction

### Maximum Limit Behavior
1. When 5 items exist, the UI for adding more items is hidden
2. User must complete or delete an item before adding new ones

## Visual Design

### Color Palette
- Primarily monochromatic with:
  - White/near-white background
  - Dark gray text for high contrast
  - Accent color (suggest: blue) used sparingly for:
    - Add button
    - Checkbox when checked
    - Counter highlight

### Typography
- Sans-serif font family for clean, modern look
- Clear hierarchy:
  - Medium weight for priorities
  - Regular weight for supporting text
  - Strikethrough for completed items

### Spacing
- Generous whitespace between elements
- Consistent padding within cards
- Subtle dividers or spacing between priority items

### Animations
- Subtle animations for improved user experience:
  - Smooth transition when marking items complete
  - Gentle fade when adding/removing items
  - Tactile feedback (slight bounce) when interacting with checkboxes

## Accessibility Considerations
- High contrast text and elements
- Appropriate text sizing
- Touch targets at least 44×44 points
- Support for VoiceOver/screen readers
- Support for dynamic type