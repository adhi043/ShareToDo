import React, { useRef } from "react";
import { 
  View, Text, TouchableOpacity, StyleSheet, Animated, useColorScheme, Share 
} from "react-native";
import { CheckIcon, TrashIcon, ShareIcon } from "react-native-heroicons/solid";

const TaskItem = ({ task, onDelete, onComplete }) => {
  const systemTheme = useColorScheme();
  const isDark = systemTheme === "dark";

  const fadeAnim = useRef(new Animated.Value(1)).current; // Animation for delete
  const scaleAnim = useRef(new Animated.Value(1)).current; // Animation for complete

  const handleComplete = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onComplete(task.id);
  };

  const handleDelete = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onDelete(task.id));
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `📝 Task: ${task.title}\n📌 Category: ${task.category || "No Category"}\n${task.completed ? "✅ Completed" : "⏳ Pending"}`,
      });
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  return (
    <Animated.View 
      style={[
        styles.taskContainer,
        isDark ? styles.darkContainer : styles.lightContainer,
        { opacity: fadeAnim }
      ]}
    >
      <Text style={[
        styles.taskText, 
        task.completed && styles.completed,
        isDark && styles.darkText
      ]}>
        {task.title}
      </Text>

      <View style={styles.actions}>
        {/* Complete Button */}
        <TouchableOpacity onPress={handleComplete}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <CheckIcon size={24} color={task.completed ? "green" : "gray"} />
          </Animated.View>
        </TouchableOpacity>

        {/* Share Button */}
        <TouchableOpacity onPress={handleShare}>
          <ShareIcon size={24} color="blue" />
        </TouchableOpacity>

        {/* Delete Button */}
        <TouchableOpacity onPress={handleDelete}>
          <TrashIcon size={24} color="red" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    elevation: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  lightContainer: { backgroundColor: "#fff" },
  darkContainer: { backgroundColor: "#1e1e1e" },

  taskText: { fontSize: 16, width: "65%" },
  darkText: { color: "white" },
  completed: { textDecorationLine: "line-through", color: "gray" },

  actions: { flexDirection: "row", gap: 10 },
});
