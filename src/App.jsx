import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as pdfjsLib from 'pdfjs-dist';
import ReactMarkdown from 'react-markdown';
import './App.css';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile?.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please upload a PDF file');
      setFile(null);
    }
  };

  const extractTextFromPDF = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let text = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(item => item.str).join(' ');
      }
      
      return text;
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      throw new Error('Failed to extract text from PDF');
    }
  };

  const analyzeResume = async () => {
    try {
      setLoading(true);
      setError(null);

      const resumeText = await extractTextFromPDF(file);
      
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `Analyze this resume and provide insights in markdown format about the candidate's:

## Key Skills and Expertise
[List the key technical and soft skills]

## Experience Level and Career Progression
[Analyze their career growth and experience level]

## Educational Background
[Summarize their education and qualifications]

## Areas for Improvement
[Suggest potential areas for development]

## Overall Strengths
[Highlight the candidate's main strengths]

Resume text:
${resumeText}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setInsights(response.text());
    } catch (error) {
      setError(error.message || 'Failed to analyze resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Resume Insights Analyzer</h1>
      
      <div className="upload-section">
        <input 
          type="file" 
          accept=".pdf" 
          onChange={handleFileChange}
          className="file-input"
        />
        
        {file && (
          <button 
            onClick={analyzeResume} 
            disabled={loading}
            className="analyze-button"
          >
            {loading ? 'Analyzing...' : 'Analyze Resume'}
          </button>
        )}
        
        {error && <p className="error">{error}</p>}
      </div>

      {insights && (
        <div className="insights-section">
          <h2>Resume Insights</h2>
          <div className="insights-content">
            <ReactMarkdown>{insights}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
