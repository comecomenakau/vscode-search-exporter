"use server"

import * as XLSX from "xlsx"

export async function exportToExcel(searchResults: string) {
  try {
    // Split the input into lines
    const lines = searchResults.trim().split("\n")

    // Parse the lines into structured data
    const data = lines.map((line) => {
      const [filePath, ...contentParts] = line.split(":")
      const content = contentParts.join(":").trim()

      return {
        ファイルパス: filePath,
        内容: content,
      }
    })

    // Create a new workbook
    const wb = XLSX.utils.book_new()

    // Convert data to worksheet
    const ws = XLSX.utils.json_to_sheet(data)

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Search Results")

    // Generate Excel file
    const excelBuffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" })

    // Convert buffer to base64
    const base64 = Buffer.from(excelBuffer).toString("base64")

    // Return the base64 string
    return base64
  } catch (error) {
    console.error("Excel export error:", error)
    throw new Error("Failed to export to Excel")
  }
}

