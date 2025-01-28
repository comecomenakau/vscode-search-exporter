"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [searchResults, setSearchResults] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleExcelExport = async () => {
    // デバッグログ
    console.log("Button clicked")
    console.log("Search Results:", searchResults)

    if (!searchResults.trim()) {
      setError("検索結果を入力してください")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // デバッグログ
      console.log("Sending request to API...")

      const response = await fetch('/api/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchResults: searchResults
        })
      })

      // デバッグログ
      console.log("Response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Export failed')
      }

      const blob = await response.blob()
      
      // デバッグログ
      console.log("Received blob:", blob)

      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'export.xlsx'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)

      console.log("Download initiated")
    } catch (err) {
      console.error("Error during export:", err)
      setError(err instanceof Error ? err.message : "エクセル出力に失敗しました")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">VScode検索結果エクセル出力</h1>
      
      <Textarea
        value={searchResults}
        onChange={(e) => {
          console.log("Textarea changed:", e.target.value)  // デバッグログ
          setSearchResults(e.target.value)
        }}
        placeholder="検索結果をここに入力してください"
        className="mb-4 min-h-[200px]"  // 高さを増やす
      />
      
      <Button 
        onClick={(e) => {
          e.preventDefault()
          console.log("Button clicked - preventing default")  // デバッグログ
          handleExcelExport()
        }}
        disabled={isLoading}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        {isLoading ? "出力中..." : "Excel出力"}
      </Button>
      
      {error && (
        <p className="text-red-500 mt-2">{error}</p>
      )}
    </div>
  )
}