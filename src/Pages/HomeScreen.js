import React, { useState, useEffect } from "react";
import { 
  View, Text, FlatList, TouchableOpacity, TextInput, 
  StyleSheet, Animated, Easing, useColorScheme, Share 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlusIcon, ShareIcon } from "react-native-heroicons/outline";
import TaskItem from "../Components/TaskItem";
import { useFocusEffect } from "@react-navigation/native";

const categories = ["All", "Work", "Personal", "Shopping", "Health", "Other"];

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const systemTheme = useColorScheme();
  const isDark = systemTheme === "dark";

  const opacityAnim = new Animated.Value(0); // Animation for theme switch
  const scaleAnim = new Animated.Value(1); // Animation for category selection





  useFocusEffect(
    React.useCallback(() => {
      loadTasks(); // Load tasks every time the screen is focused
    }, [])
  );

  useEffect(() => {
    // Animate theme transition
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => opacityAnim.setValue(0));
  }, []);

  const loadTasks = async () => {
    const storedTasks = await AsyncStorage.getItem("tasks");
    if (storedTasks) setTasks(JSON.parse(storedTasks));
  };

  const saveTasks = async (updatedTasks) => {
    setTasks(updatedTasks);
    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const onComplete = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    saveTasks(updatedTasks);
  };

  const onDelete = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    saveTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(task =>
    (selectedCategory === "All" || task.category === selectedCategory) &&
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);

    // Animate category selection
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleShareAllTasks = async () => {
    if (tasks.length === 0) {
      alert("No tasks to share!");
      return;
    }

    const completedTasks = tasks.filter(task => task.completed);
    const pendingTasks = tasks.filter(task => !task.completed);

    let message = "📋 **My To-Do List:**\n\n";

    if (pendingTasks.length > 0) {
      message += "⏳ **Pending Tasks:**\n";
      pendingTasks.forEach((task, index) => {
        message += `${index + 1}. ${task.title} (${task.category || "No Category"})\n`;
      });
      message += "\n";
    }

    if (completedTasks.length > 0) {
      message += "✅ **Completed Tasks:**\n";
      completedTasks.forEach((task, index) => {
        message += `${index + 1}. ${task.title} (${task.category || "No Category"})\n`;
      });
    }

    try {
      await Share.share({ message });
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  return (
    <View 
      style={[
        styles.container, 
        isDark ? styles.darkContainer : styles.lightContainer, 
        
      ]}
    >
      <Text style={[styles.header, isDark && styles.darkText]}>Share To-Do</Text>

      <TextInput
        style={[styles.searchInput, isDark && styles.darkInput]}
        placeholder="Search tasks..."
        placeholderTextColor={isDark ? "#aaa" : "#333"}
        value={search}
        onChangeText={setSearch}
      />

      {/* Share All Tasks Button */}
      <TouchableOpacity style={styles.shareButton} onPress={handleShareAllTasks}>
        <ShareIcon size={22} color="white" />
        <Text style={styles.shareButtonText}>Share All Tasks</Text>
      </TouchableOpacity>

      {/* Category Filter */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCategorySelect(item)}>
            <Animated.View 
              style={[
                styles.categoryButton, 
                selectedCategory === item && styles.selectedCategory, 
                isDark && styles.darkCategory,
                { transform: [{ scale: selectedCategory === item ? scaleAnim : 1 }] }
              ]}
            >
              <Text style={[selectedCategory === item ? styles.selectedText : styles.categoryText, isDark && styles.darkText]}>
                {item}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        )}
      />

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem task={item} onComplete={onComplete} onDelete={onDelete} />
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddTask")}>
        <PlusIcon size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingBottom:50 },
  lightContainer: { backgroundColor: "#f8f9fa", color: "black" },
  darkContainer: { backgroundColor: "#121212", color: "white" },

  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  darkText: { color: "white" },

  searchInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  darkInput: { backgroundColor: "#333", color: "white" },

  shareButton: {
    flexDirection: "row",
    backgroundColor: "#2563eb",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  shareButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },

  categoryButton: {
    padding: 10,
    marginRight: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 40,
    marginBottom: 30,
  },
  selectedCategory: { backgroundColor: "#2563eb", borderColor: "#2563eb" },
  darkCategory: { borderColor: "#555" },

  categoryText: { fontSize: 14 },
  selectedText: { color: "white", fontWeight: "bold" },

  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
