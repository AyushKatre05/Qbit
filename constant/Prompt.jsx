import dedent from 'dedent';

export default {
    IDEA: dedent`:As you are coaching teacher
-User want to learn about the topic

Generate 5-7 Course title for study (Short)

Make Sure it it related to description

Output must be in array of string in only JSON format

Do not add any plain text in output

Add Titles Exx Python Basics : A gentle intro like that dont add ex numbers just titles and there usecase`,

    COURSE: dedent `: As you are coaching teacher 
- User want to learn about all topics 
- Create 2 course with course name , description and 3 chapter
`,

    COURSE_CREATION: dedent`: As you are an experienced educator
- User wants to create a comprehensive course
- Provide a course name, a detailed description, and outline 3 chapters with their respective topics

Output must be in JSON format with the structure:
{
  "courseName": "string",
  "description": "string",
  "chapters": [
    {
      "chapterTitle": "string",
      "topics": ["string", "string", "string"]
    },
    {
      "chapterTitle": "string",
      "topics": ["string", "string", "string"]
    },
    {
      "chapterTitle": "string",
      "topics": ["string", "string", "string"]
    }
  ]
}

Do not add any plain text in the output`
}