import React, { useState, useRef } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Animated, useColorScheme, 
  ScrollView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ArrowLeftIcon, ChevronDownIcon } from "react-native-heroicons/outline";

const categories = ["Work", "Personal", "Shopping", "Health", "Other"];

const AddTaskScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Work");
  const [showCategories, setShowCategories] = useState(false);
  const systemTheme = useColorScheme();
  const isDark = systemTheme === "dark";

  const dropdownAnim = useRef(new Animated.Value(0)).current; // Animation for category dropdown

  const toggleDropdown = () => {
    Animated.timing(dropdownAnim, {
      toValue: showCategories ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setShowCategories(!showCategories);
  };

  const saveTask = async () => {
    if (!title.trim()) return;

    const newTask = { id: Date.now(), title, category, completed: false };
    const storedTasks = await AsyncStorage.getItem("tasks");
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];

    tasks.push(newTask);
    await AsyncStorage.setItem("tasks", JSON.stringify(tasks));

    navigation.goBack();
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={[styles.container, isDark && styles.darkContainer]}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <ArrowLeftIcon size={28} color={isDark ? "white" : "black"} />
      </TouchableOpacity>

      <Text style={[styles.header, isDark && styles.darkText]}>Add New Task</Text>

      <TextInput
        style={[styles.input, isDark && styles.darkInput]}
        placeholder="Enter task title..."
        placeholderTextColor={isDark ? "#bbb" : "#666"}
        value={title}
        onChangeText={setTitle}
        multiline
      />

      {/* Category Selector */}
      <TouchableOpacity style={[styles.categorySelector, isDark && styles.darkSelector]} onPress={toggleDropdown}>
        <Text style={[styles.categoryText, isDark && styles.darkText]}>{category}</Text>
        <ChevronDownIcon size={20} color={isDark ? "white" : "black"} />
      </TouchableOpacity>

      {/* Animated Category Dropdown */}
      {showCategories && (
        <Animated.View 
          style={[
            styles.dropdownContainer, 
            isDark && styles.darkDropdown, 
            { opacity: dropdownAnim, height: dropdownAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 150] }) }
          ]}
        >
          <FlatList
            data={categories}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={[styles.categoryItem, isDark && styles.darkCategoryItem]} 
                onPress={() => { setCategory(item); toggleDropdown(); }}
              >
                <Text style={[isDark && styles.darkText]}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </Animated.View>
      )}

      {/* Save Button */}
      <TouchableOpacity 
        style={[styles.saveButton, isDark && styles.darkSaveButton]} 
        onPress={saveTask}
        activeOpacity={0.8}
      >
        <Text style={styles.saveText}>Save Task</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  darkContainer: { backgroundColor: "#121212" },

  backButton: { marginBottom: 20 },
  
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  darkText: { color: "white" },

  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    color: "black",
  },
  darkInput: { backgroundColor: "#1e1e1e", color: "white" },

  categorySelector: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  darkSelector: { backgroundColor: "#1e1e1e", borderColor: "#444" },

  categoryText: { fontSize: 16 },

  dropdownContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
  },
  darkDropdown: { backgroundColor: "#1e1e1e" },

  categoryItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  darkCategoryItem: { borderBottomColor: "#444" },

  saveButton: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    elevation: 3, marginBottom:50
  },
  darkSaveButton: { backgroundColor: "#1d4ed8" },

  saveText: { color: "white", fontSize: 18, fontWeight: "bold" },
});
