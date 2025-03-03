const {
    GoogleGenerativeAI,
  } = require("@google/generative-ai");
  
  import { GEMINI_API_KEY } from "@env";

  const apiKey = GEMINI_API_KEY;
  
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
    export const GenerateTopicsAIModel = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Learn Python :: As you are coaching teacher\n-User want to learn about the topic \n- Generate 5-7 Course title for study (Short) \n- Make Sure it it related to description \n- Output must be in array of string in only JSON format\n- Do not add any plain text in output\n- Add Titles Exx Python Basics : A gentle intro like that dont add ex numbers just titles and there usecase"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"course_titles\": [\n    \"Python Basics: A Gentle Introduction\",\n    \"Python Data Structures: Lists, Dictionaries, and More\",\n    \"Python Control Flow: Mastering Loops and Conditionals\",\n    \"Python Functions: Building Reusable Code Blocks\",\n    \"Python Modules and Packages: Organizing Your Projects\",\n    \"Python File Handling: Reading and Writing Data\",\n    \"Python Error Handling: Debugging Your Code\"\n  ]\n}\n```"},
          ],
        },
      ],
    });
  