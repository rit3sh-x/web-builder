"use client"

import { useEffect, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

interface CodeEditorProps {
  code: string
  language?: string
  fileName?: string
}

export default function CodeEditor({ code, language = "javascript", fileName }: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)

  // Scroll to top when file changes
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.scrollTop = 0
    }
  }, [code])

  return (
    <div className="rounded-md overflow-hidden">
      <div className="bg-gray-800/80 px-4 py-2 border-b border-gray-700 flex items-center backdrop-blur-sm">
        {fileName && <span className="text-sm text-gray-300">{fileName}</span>}
      </div>
      <div ref={editorRef} className="overflow-auto h-[600px] bg-gray-900/30 backdrop-blur-sm">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "1rem",
            background: "transparent",
            fontSize: "0.875rem",
          }}
        >
          {code || "// No code to display"}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}