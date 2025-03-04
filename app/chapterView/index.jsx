import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

const ChapterView = () => {
    const { chapterParams, docId, chapterIndex } = useLocalSearchParams();
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const chapters = chapterParams ? JSON.parse(chapterParams) : null;

    // Debugging: Check if values are correctly passed
    useEffect(() => {
        console.log("docId:", docId, "chapterIndex:", chapterIndex);
    }, []);

    const GetProgress = (currentPage) => {
        const perc = ((currentPage + 1) / (chapters?.content?.length || 1)) * 100;
        return perc;
    };

    const onChapterComplete = async () => {
        if (!docId || chapterIndex === undefined || chapterIndex === null) {
            console.error("Invalid document ID or chapter index");
            return;
        }

        try {
            setLoading(true);
            await updateDoc(doc(db, 'Courses', docId), {
                completedChapter: arrayUnion(Number(chapterIndex)) // Ensure it's stored as a number
            });
            setLoading(false);
            router.back();
        } catch (error) {
            console.error("Error updating chapter completion:", error);
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
                    {chapters?.title}
                </Text>

                <View style={{ height: 10, width: '100%', backgroundColor: '#e0e0e0', borderRadius: 5, overflow: 'hidden', marginBottom: 15 }}>
                    <View style={{
                        height: '100%',
                        width: `${GetProgress(currentPage)}%`,
                        backgroundColor: '#4CAF50',
                        borderRadius: 5,
                    }} />
                </View>

                <View style={{ marginBottom: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Topic:</Text>
                    <Text>{chapters?.content[currentPage]?.topic}</Text>

                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Explanation:</Text>
                    <Text>{chapters?.content[currentPage]?.explain}</Text>

                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Example:</Text>
                    <Text>{chapters?.content[currentPage]?.example}</Text>

                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Code:</Text>
                    <Text style={{ backgroundColor: '#eee', padding: 5, fontFamily: 'monospace' }}>
                        {chapters?.content[currentPage]?.code}
                    </Text>
                </View>
            </ScrollView>

            {/* Navigation Buttons - Placed Outside ScrollView to Stay Fixed */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
                <TouchableOpacity
                    disabled={currentPage === 0}
                    onPress={() => setCurrentPage(currentPage - 1)}
                    style={{
                        padding: 10,
                        backgroundColor: currentPage === 0 ? '#ccc' : '#2196F3',
                        borderRadius: 5,
                    }}>
                    <Text style={{ color: 'white' }}>Previous</Text>
                </TouchableOpacity>

                {currentPage === (chapters?.content?.length || 1) - 1 ? (
                    <TouchableOpacity
                        onPress={onChapterComplete}
                        style={{
                            padding: 10,
                            backgroundColor: loading ? '#ccc' : '#28a745',
                            borderRadius: 5,
                        }}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={{ color: 'white' }}>Complete Chapter</Text>
                        )}
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={() => setCurrentPage(currentPage + 1)}
                        style={{
                            padding: 10,
                            backgroundColor: '#2196F3',
                            borderRadius: 5,
                        }}>
                        <Text style={{ color: 'white' }}>Next</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default ChapterView;
