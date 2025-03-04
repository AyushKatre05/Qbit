import { View, Text, StyleSheet, Alert, Pressable, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { TextInput } from "react-native";
import Button from "../../components/Shared/Button";
import { GenerateCourseAIModel, GenerateTopicsAIModel } from "../../config/AiModel";
import Prompt from "../../constant/Prompt";
import Colors from "../../constant/Colors";
import {db} from "./../../config/firebaseConfig"
import {UserDetailContext} from "./../../context/UserDetailContext"
import { useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";

const AddCourse = () => {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [generatedTopic, setGeneratedTopic] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const {userDetail,setUserDetail} = useContext(UserDetailContext)
  const router = useRouter();

  const onGenerateCourse = async () => {
    setLoading(true);
    const PROMPT = selectedTopics+Prompt.COURSE;
    const aiResp = await GenerateCourseAIModel.sendMessage(PROMPT)
    const resp = JSON.parse(aiResp.response.text());
    const courses = resp?.courses;
    console.log(courses);
    courses?.forEach(async(course)=>{
      await setDoc(doc(db,'Courses',Date.now().toString()),{
        ...course,
        createdOn : new Date(),
        createdBy : userDetail?.email
      })
    })
    router.push('/(tabs)/home')
    setLoading(false);
  };

  const onTopicSelect = (topic) => {
    setSelectedTopics((prevTopics) =>
      prevTopics.includes(topic)
        ? prevTopics.filter((item) => item !== topic)
        : [...prevTopics, topic]
    );
  };

  const onGenerateTopic = async () => {
    if (!userInput) {
      Alert.alert("Error", "Please enter a course idea.");
      return;
    }

    try {
      setLoading(true);
      const PROMPT = `${userInput} ${Prompt.IDEA}`;
      console.log("Sending prompt:", PROMPT);

      const aiResponse = await GenerateTopicsAIModel.sendMessage(PROMPT);
      const topicIdeas = JSON.parse(aiResponse.response?.text()) || { course_titles: [] };

      console.log("AI Response:", topicIdeas);
      setGeneratedTopic(topicIdeas.course_titles || []);
    } catch (error) {
      console.error("Error generating topic:", error);
      Alert.alert("Error", "Failed to generate topic. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Course</Text>
      <Text style={styles.subtitle}>
        Fill the Course Form Details to Generate a Topic for your Course
      </Text>

      <TextInput
        onChangeText={setUserInput}
        placeholder="Ex. Learn AI, ML"
        numberOfLines={3}
        multiline
        style={styles.input}
      />

      <Button loading={loading} text="Generate Topic" type="outline" onPress={onGenerateTopic} />

      {generatedTopic.length > 0 && (
  <View style={styles.topicSection}>
    <Text style={styles.topicTitle}>Select topics to add in the course</Text>

    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
      {generatedTopic.map((topic, index) => (
        <Pressable
          key={index}
          onPress={() => onTopicSelect(topic)}
          style={[
            styles.topicItem,
            selectedTopics.includes(topic) && styles.selectedTopic,
          ]}
        >
          <Text style={[styles.topicText, selectedTopics.includes(topic) && styles.selectedText]}>
            {topic}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  </View>
)}

{/* ✅ Show the button only if a topic is selected */}
{selectedTopics.length > 0 && (
  <Button text="Generate Course" onPress={onGenerateCourse} loading={loading} />
)}

    </View>
  );
};

export default AddCourse;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: "white",
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    marginTop: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    color: "gray",
    marginVertical: 10,
    textAlign: "center",
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 10,
    fontSize: 18,
    textAlignVertical: "top",
  },
  topicSection: {
    margin: 15,
    flex: 1,
  },
  topicTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollContainer: {
    maxHeight: 250, // Limit scrolling height
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
    paddingVertical: 10,
  },
  scrollContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    padding: 10,
  },
  topicItem: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#f1f1f1",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
  },
  selectedTopic: {
    backgroundColor: Colors.BLUE,
    borderColor: Colors.BLUE,
  },
  topicText: {
    fontSize: 16,
  },
  selectedText: {
    color: "white",
    fontWeight: "bold",
  },
});
