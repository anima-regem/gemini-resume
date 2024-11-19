# Welcome to Gemini Resume

Gemini Resume is a web application that allows you to upload your resume in PDF format and get insights on your resume in markdown format.

## The Beginning

** To Do: **

- Install Codeium Windsurf IDE
- Install nodejs
- Create a ai.google.dev account
- Create a ai.google.dev project from console.cloud.google.com

** Setup Project: **

- Run the following command to setup a vite project:
```
npm create vite
```

You can give your project any name you want. I gave mine the name "gemini-resume".

- Change the directory to the gemini-resume directory:
```
cd gemini-resume
```

- Run the following command to install dependencies:
```
npm install
```

- Run the following command to start the project:
```
npm run dev
```

- I gave Windsurf the following prompt:
```
I need to create a React application that analyzes resumes using the Gemini API. Here are the requirements:

1. Project Setup:
- Create a new Vite + React project named "gemini-resume"
- Install required dependencies:
  * @google/generative-ai (for Gemini API)
  * pdfjs-dist@3.11.174 (specific version for PDF processing)
  * react-markdown (for formatting AI responses)

2. Environment Setup:
- Create .env file with VITE_GEMINI_API_KEY for Gemini API
- Add .env to .gitignore

3. Core Features:
- PDF resume upload functionality
- Text extraction from PDF
- Analysis using Gemini API
- Markdown-formatted insights display

4. Technical Requirements:
- Use pdfjs-dist directly (not react-pdf) to avoid version conflicts
- Configure PDF.js worker correctly
- Handle all potential errors (PDF parsing, API calls)
- Ensure proper CORS handling for PDF worker

5. UI/UX Requirements:
- Clean, modern interface
- Clear feedback for loading states
- Error messages for invalid files
- Properly formatted and styled markdown output
- Good contrast for text visibility

6. Styling:
- Professional color scheme
- Responsive design
- Clear typography
- Proper spacing and layout
- Styled markdown elements

The application should be production-ready and handle all edge cases gracefully.
```

- Create a .env file with the following content:
```
VITE_GEMINI_API_KEY=YOUR_API_KEY
```

- Hopefully the project will be done by the end of the day in `http://localhost:5173`

## The End

I hope you enjoy using Gemini Resume!