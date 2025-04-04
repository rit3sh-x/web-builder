"use client"

import { Skeleton } from "@/components/ui/skeleton"

interface CodePreviewProps {
  code: string
  isLoading: boolean
}

export default function CodePreview({ code, isLoading }: CodePreviewProps) {
  if (isLoading) {
    return (
      <div className="rounded-md overflow-hidden">
        <Skeleton className="h-[400px] w-full bg-gray-800" />
      </div>
    )
  }

  if (!code) {
    return (
      <div className="flex items-center justify-center h-[400px] border border-gray-800 rounded-md bg-gray-800 text-gray-400">
        Generate code first to see a preview
      </div>
    )
  }

  return (
    <div className="border border-gray-800 rounded-md overflow-hidden bg-gray-800">
      <div className="p-2 bg-gray-900 border-b border-gray-800 flex items-center">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="mx-auto text-xs text-gray-400">Preview</div>
      </div>
      <div className="h-[400px] overflow-auto p-4 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <p>Preview would render here in a real application</p>
          <p className="text-sm mt-2">This is a simplified demonstration</p>
        </div>
      </div>
    </div>
  )
}