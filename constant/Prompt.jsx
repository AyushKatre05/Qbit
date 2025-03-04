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
- Make Sure to add chapter with all learning material course should be related to description
- Add CourseBanner image from {'/banner1.png,'/banner2.png','/banner3.png', '/banner4.png','/banner5.png',  '/banner6.png'},
-Explain the chapter content ass detailed tutorial
-Generate 5 Quiz , 10 Flashcard and 5 questions answer
- Output must be in JSON format only
- "courses":[
  {
    "courseTitle" : "<Intro to python>",
    "description" : '',
    "banner_image" : "/banner1.png",
    "chapters":[
      {
    chapterName : '',
    content : [
      {
        topic : '<Topic Name in 2 to 4 words >',
        explain : '<Code example of required else null>',
        code : '<code example of required else null>',
        example : '<example of required else null>'
      }
    ] 
    }],
    quiz : [
    {
      question : '',
      options : [a,b,c,d],
      correctAns : ''
    }],
    flashcards : [
      {
        front : '',
        back : ''
      }
    ],
    qa : [
    {
    question : '',
    answer : ''
    }
    ]
  }
]`

}