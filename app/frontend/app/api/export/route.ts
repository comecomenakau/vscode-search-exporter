import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log('API Route received data:', data)

    const flaskResponse = await fetch('http://127.0.0.1:5000/api/export', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    console.log('Flask response status:', flaskResponse.status)

    if (!flaskResponse.ok) {
      const errorText = await flaskResponse.text()
      console.error('Flask error:', errorText)
      throw new Error(`Flask server error: ${errorText}`)
    }

    const blob = await flaskResponse.blob()
    console.log('Received blob from Flask:', blob)

    return new NextResponse(blob, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="export.xlsx"'
      }
    })
  } catch (error) {
    console.error('API Route error:', error)
    return NextResponse.json(
      { error: 'エクセル出力に失敗しました' },
      { status: 500 }
    )
  }
} 