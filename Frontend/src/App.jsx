import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import Axios from 'axios';
import './App.css';

function App() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');

  async function reviewCode() {
    try {
      const res = await Axios.post('http://localhost:3000/ai/get-review', {
        code,
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult('// Error reviewing code.');
    }
  }

  const lineNumbers = code
    .split('\n')
    .map((_, index) => index + 1)
    .join('\n');

  return (
    <div className="app-container">
      <h1>Code Reviewer</h1>
      <div className="dual-container">
        {/* Left Container */}
        <div className="input-container">
          <h2>Code Input</h2>
          <div className="editor-wrapper">
            <div className="editor-container">
              <pre className="line-number">{lineNumbers}</pre>
              <div className="editor-scroll">
                <Editor
                  value={code}
                  onValueChange={setCode}
                  highlight={(code) =>
                    Prism.highlight(code, Prism.languages.javascript, 'javascript')
                  }
                  padding={15}
                  className="code-editor"
                  placeholder="Paste your code here..."
                />
              </div>
            </div>
            <button onClick={reviewCode} className="review-button">
              Review Code
            </button>
          </div>
        </div>

        {/* Right Container */}
        <div className="result-container">
          <h2>Review Result</h2>
          <div className="editor-wrapper">
            <div className="editor-scroll">
              <Editor
                value={result}
                highlight={(code) =>
                  Prism.highlight(code, Prism.languages.javascript, 'javascript')
                }
                padding={15}
                className="result-editor"
                readOnly
                placeholder="// Your AI review will appear here…"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
