"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import CodeEditor from "@/components/CodeEditor"
import CodePreview from "@/components/CodePreview"
import { Loader2, Code, Play, Download, Copy, RefreshCw } from "lucide-react"

export default function CodeGenerator() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCode, setGeneratedCode] = useState("")
  const [activeTab, setActiveTab] = useState("input")

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setActiveTab("code")

    // Simulate code generation with a delay
    setTimeout(() => {
      const sampleCode = `
import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Counter App</h1>
        <p className="mb-4">Current count: {count}</p>
        <div className="flex gap-2">
          <button 
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
            onClick={() => setCount(count - 1)}
          >
            Decrease
          </button>
          <button 
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
            onClick={() => setCount(count + 1)}
          >
            Increase
          </button>
        </div>
      </div>
    </div>
  );
}
      `.trim()

      setGeneratedCode(sampleCode)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6 bg-gray-800">
          <TabsTrigger value="input" className="data-[state=active]:bg-gray-700">
            Input
          </TabsTrigger>
          <TabsTrigger value="code" className="data-[state=active]:bg-gray-700">
            Code
          </TabsTrigger>
          <TabsTrigger value="preview" className="data-[state=active]:bg-gray-700">
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="mt-0">
          <Card className="bg-gray-900 border-gray-800">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Describe Your App</h2>
              <Textarea
                placeholder="Describe the app you want to build. Be as detailed as possible. For example: 'Create a counter app with increase and decrease buttons, and display the current count.'"
                className="min-h-[200px] bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <div className="flex justify-end mt-4">
                <Button
                  onClick={handleGenerate}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  disabled={isGenerating || !prompt.trim()}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Code className="mr-2 h-4 w-4" />
                      Generate Code
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="mt-0">
          <Card className="bg-gray-900 border-gray-800">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Generated Code</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                    onClick={handleGenerate}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              </div>
              <CodeEditor code={generatedCode}/>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="mt-0">
          <Card className="bg-gray-900 border-gray-800">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Live Preview</h2>
                <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
                  <Play className="h-4 w-4 mr-2" />
                  Run
                </Button>
              </div>
              <CodePreview code={generatedCode} isLoading={isGenerating} />
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}