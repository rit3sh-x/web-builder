"use client"

import { memo } from "react"
import { FileIcon, FolderIcon } from "lucide-react"
import { motion } from "framer-motion"

interface FileTreeProps {
  files: string[]
  activeFile: string
  onSelectFile: (file: string) => void
}

function FileTreeComponent({ files, activeFile, onSelectFile }: FileTreeProps) {
  return (
    <div className="space-y-1">
      <div className="text-sm font-medium text-gray-400 mb-2">Project Files</div>
      {files.map((file) => (
        <motion.div
          key={file}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`
            flex items-center p-2 rounded-md cursor-pointer transition-colors
            ${
              activeFile === file
                ? "bg-purple-900/30 text-purple-400 border-l-2 border-purple-500 pl-[7px]"
                : "text-gray-300 hover:bg-gray-800/50 border-l-2 border-transparent pl-[7px]"
            }
          `}
          onClick={() => onSelectFile(file)}
        >
          {file.includes(".") ? (
            <FileIcon className="h-4 w-4 mr-2 flex-shrink-0" />
          ) : (
            <FolderIcon className="h-4 w-4 mr-2 flex-shrink-0" />
          )}
          <span className="text-sm truncate">{file}</span>
        </motion.div>
      ))}
    </div>
  )
}

// Memoize the component to prevent unnecessary re-renders
export default memo(FileTreeComponent)