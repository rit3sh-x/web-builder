import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Code, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
              AI Code Generator
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Transform your ideas into working code with our AI-powered code generator. Describe your app, and we'll
              build it for you.
            </p>
          </div>

          <form action="/code" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-gray-100">Describe Your App</CardTitle>
                <CardDescription className="text-gray-400">
                  Be as detailed as possible about what you want to build
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  name="prompt"
                  placeholder="Example: Create a task management app with the ability to add, edit, and delete tasks. Include task categories, due dates, and priority levels. Use a dark theme with purple accents."
                  className="min-h-[200px] bg-gray-800/50 border-gray-700 text-gray-100 placeholder:text-gray-500 backdrop-blur-sm"
                  required
                />

                <Button type="submit" className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white">
                  <Code className="mr-2 h-4 w-4" />
                  Generate Code
                </Button>
              </CardContent>
            </Card>

            <div className="flex justify-between items-center px-1">
              <p className="text-sm text-gray-400">
                Need inspiration?{" "}
                <Link href="/examples" className="text-purple-400 hover:underline">
                  Browse examples
                </Link>
              </p>
              <Link href="/docs" className="text-sm text-purple-400 hover:underline flex items-center">
                View documentation <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}