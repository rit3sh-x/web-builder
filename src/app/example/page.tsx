import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function ExamplesPage() {
  const examples = [
    {
      title: "Task Management App",
      description: "A task manager with categories, due dates, and priority levels",
      prompt:
        "Create a task management app with the ability to add, edit, and delete tasks. Include task categories, due dates, and priority levels. Use a dark theme with purple accents.",
    },
    {
      title: "E-commerce Product Page",
      description: "Product detail page with image gallery, reviews, and add to cart",
      prompt:
        "Build an e-commerce product page with an image gallery, product details, customer reviews, and an add to cart button. Use a clean, modern design with a dark theme.",
    },
    {
      title: "Weather Dashboard",
      description: "Weather app showing current conditions and 5-day forecast",
      prompt:
        "Create a weather dashboard that shows current weather conditions and a 5-day forecast. Include temperature, humidity, wind speed, and weather icons. Use a dark theme with blue accents.",
    },
    {
      title: "Social Media Profile",
      description: "User profile page with posts, followers, and bio",
      prompt:
        "Design a social media profile page that displays user information, bio, posts, and follower count. Include a photo gallery and recent activity. Use a dark theme with gradient accents.",
    },
  ]

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Link href="/" className="text-gray-400 hover:text-gray-200 flex items-center mr-4">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-100">Example Projects</h1>
          </div>

          <p className="text-gray-400 mb-8 text-lg">
            Browse these example prompts to see what our AI code generator can create. Click on any example to use it as
            a starting point.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {examples.map((example, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 hover:border-purple-600 transition-colors">
                <CardHeader>
                  <CardTitle className="text-gray-100">{example.title}</CardTitle>
                  <CardDescription className="text-gray-400">{example.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300 line-clamp-3 mb-4">{example.prompt}</p>
                  <Link
                    href={`/?prompt=${encodeURIComponent(example.prompt)}`}
                    className="text-purple-400 hover:text-purple-300 text-sm flex items-center"
                  >
                    Use this example <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

