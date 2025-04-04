import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, BookOpen, Code, FileQuestion, Lightbulb } from "lucide-react"

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Link href="/" className="text-gray-400 hover:text-gray-200 flex items-center mr-4">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-100">Documentation</h1>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-gray-400 text-lg">
              Learn how to use our AI code generator effectively to create the applications you need.
            </p>

            <div className="grid gap-6 md:grid-cols-2 mt-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                  <BookOpen className="h-5 w-5 text-purple-400 mr-2" />
                  <div>
                    <CardTitle className="text-gray-100">Getting Started</CardTitle>
                    <CardDescription className="text-gray-400">Learn the basics</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-gray-300">
                    <li className="text-sm">• Writing effective prompts</li>
                    <li className="text-sm">• Choosing project types</li>
                    <li className="text-sm">• Understanding generated code</li>
                    <li className="text-sm">• Downloading and using your code</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                  <Code className="h-5 w-5 text-purple-400 mr-2" />
                  <div>
                    <CardTitle className="text-gray-100">Advanced Features</CardTitle>
                    <CardDescription className="text-gray-400">Power user techniques</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-gray-300">
                    <li className="text-sm">• Customizing generated code</li>
                    <li className="text-sm">• Using specific libraries or frameworks</li>
                    <li className="text-sm">• Regenerating with modifications</li>
                    <li className="text-sm">• Integrating with your workflow</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                  <Lightbulb className="h-5 w-5 text-purple-400 mr-2" />
                  <div>
                    <CardTitle className="text-gray-100">Tips & Best Practices</CardTitle>
                    <CardDescription className="text-gray-400">Get better results</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-gray-300">
                    <li className="text-sm">• Being specific in your descriptions</li>
                    <li className="text-sm">• Breaking complex apps into components</li>
                    <li className="text-sm">• Iterative development approach</li>
                    <li className="text-sm">• Common pitfalls to avoid</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                  <FileQuestion className="h-5 w-5 text-purple-400 mr-2" />
                  <div>
                    <CardTitle className="text-gray-100">FAQ</CardTitle>
                    <CardDescription className="text-gray-400">Common questions</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-gray-300">
                    <li className="text-sm">• What frameworks are supported?</li>
                    <li className="text-sm">• How complex can my app be?</li>
                    <li className="text-sm">• Can I modify the generated code?</li>
                    <li className="text-sm">• What about API integrations?</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Writing Effective Prompts</h2>

            <p>
              The quality of the code generated depends significantly on the clarity and specificity of your prompt.
              Here are some tips for writing effective prompts:
            </p>

            <ul className="mt-4 space-y-2">
              <li>
                <strong>Be specific about functionality</strong> - Clearly describe what your app should do
              </li>
              <li>
                <strong>Mention design preferences</strong> - Colors, layout, and styling details help
              </li>
              <li>
                <strong>Include user interactions</strong> - Describe how users will interact with your app
              </li>
              <li>
                <strong>Specify data requirements</strong> - What data will your app use and how
              </li>
              <li>
                <strong>Reference familiar patterns</strong> - "Like Twitter but for..." can be helpful
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}