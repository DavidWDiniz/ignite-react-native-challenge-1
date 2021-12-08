import {Image, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import React, {useEffect, useRef, useState} from "react";
import trashIcon from "../assets/icons/trash/trash.png";
import penIcon from "../assets/icons/pen/pen.png";
import {Task} from "./TasksList";

interface TaskItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, title: string) => void;

}

export function TaskItem({task, toggleTaskDone, removeTask, editTask}: TaskItemProps) {
  const [isEditingText, setIsEditingText] = useState(false);
  const [editedTask, setEditedTask] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {if (textInputRef.current) {
    if (isEditingText) {
      textInputRef.current.focus();
    } else {
      textInputRef.current.blur();
    }
  }
  }, [isEditingText]);

  function handleStartEditing() {
    setIsEditingText(true);
  }

  function handleCancelEditing() {
    setEditedTask(task.title);
    setIsEditingText(false);
  }

  function handleSubmitEditing() {
    editTask(task.id, editedTask);
    setIsEditingText(false);
  }

  return (
    <>
      <View>
        <TouchableOpacity
          // testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            // testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { task.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            style={task.done ? styles.taskTextDone : styles.taskText}
            value={editedTask}
            onChangeText={setEditedTask}
            editable={isEditingText}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{flexDirection: 'row'}}
      >
        {isEditingText ? (
          <TouchableOpacity
            style={{ paddingHorizontal: 24 }}
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ paddingHorizontal: 24 }}
            onPress={handleStartEditing}
          >
            <Image source={penIcon} />
          </TouchableOpacity>
        ) }

        <View style={styles.divider} />

        <TouchableOpacity
          // testID={`trash-${index}`}
          style={{ paddingHorizontal: 24 }}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  divider: {
    height: 25,
    borderLeftWidth: 0.5,
    borderColor: "#b2b2b2"
  }
})
