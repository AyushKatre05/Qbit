import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constant/Colors';
import { useRouter, useFocusEffect } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

const Chapters = ({ course }) => {
    const router = useRouter();
    const [completedChapters, setCompletedChapters] = useState(course?.completedChapter || []);

    // Function to check if a chapter is completed
    const isChapterCompleted = (index) => completedChapters.includes(index);

    // Function to fetch updated completed chapters from Firestore
    const fetchCompletedChapters = async () => {
        if (!course?.docId) return;

        try {
            const courseRef = doc(db, 'Courses', course.docId);
            const courseSnap = await getDoc(courseRef);

            if (courseSnap.exists()) {
                const updatedData = courseSnap.data();
                setCompletedChapters(updatedData?.completedChapter || []);
            }
        } catch (error) {
            console.error("Error fetching completed chapters:", error);
        }
    };

    // Fetch completed chapters when the component comes into focus
    useFocusEffect(
        React.useCallback(() => {
            fetchCompletedChapters();
        }, [])
    );

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 25 }}>Chapters</Text>
            <FlatList
                data={course?.chapters}
                extraData={completedChapters} // Ensures FlatList updates
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() =>
                            router.push({
                                pathname: '/chapterView',
                                params: {
                                    chapterParams: JSON.stringify(item),
                                    docId: course?.docId,
                                    chapterIndex: index
                                }
                            })
                        }
                        style={styles.chapterContainer}
                    >
                        <View style={styles.chapterInfo}>
                            <Text style={styles.chapterText}>{index + 1}</Text>
                            <Text style={styles.chapterText}>{item?.chapterName}</Text>
                        </View>

                        {/* Show checkmark if completed, else play icon */}
                        {isChapterCompleted(index) ? (
                            <Ionicons name="checkmark-circle" size={24} color="green" />
                        ) : (
                            <Ionicons name="play" size={24} color={Colors.BLUE} />
                        )}
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default Chapters;

const styles = StyleSheet.create({
    chapterContainer: {
        padding: 15,
        borderWidth: 0.5,
        borderRadius: 15,
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    chapterInfo: {
        flexDirection: 'row',
        gap: 10
    },
    chapterText: {
        fontSize: 14
    }
});
