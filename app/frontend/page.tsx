"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { exportToExcel } from "./actions"

export default function Home() {
  const [searchResults, setSearchResults] = useState("")
  const [error, setError] = useState("")

  const handleExport = async () => {
    if (!searchResults.trim()) {
      setError("検索結果を入力してください")
      return
    }

    try {
      await exportToExcel(searchResults)
      setError("")
    } catch (err) {
      setError("エクセル出力に失敗しました")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-blue-500 h-10 flex items-center px-4">
        <h1 className="text-white">VScode検索結果エクセル出力</h1>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Text Area */}
          <div className="border rounded-md p-4">
            <Textarea
              placeholder="vscodeの検索結果を貼り付けてください"
              className="min-h-[280px] resize-none"
              value={searchResults}
              onChange={(e) => setSearchResults(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Export Button */}
          <div className="flex justify-end">
            <Button onClick={handleExport} className="bg-green-500 hover:bg-green-600">
              Excel出力
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

