"use client"

import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import axios from 'axios'

// レスポンスの型を定義
interface ApiResponse {
  message: string;
}

export default function Home() {
  const [searchResults, setSearchResults] = useState("")
  const [error, setError] = useState("")
  const [data, setData] = useState<ApiResponse | null>(null)  // 型を指定

  const handleExport = async () => {
    if (!searchResults.trim()) {
      setError("検索結果を入力してください")
      return
    }

    try {
      const response = await axios.post<ApiResponse>('http://localhost:5000/api/export', {
        searchResults: searchResults
      });

      alert(response.data.message);  // これで型エラーが解消されます
      setError("");
    } catch (err) {
      setError("エクセル出力に失敗しました");
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>("http://localhost:5000/api/data");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // ... existing code ...
}