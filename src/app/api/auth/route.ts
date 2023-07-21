import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  const response = await axios.post(
    'https://desolate-forest-43262-ac0e0645cc68.herokuapp.com/auth',
    {
      email,
      password
    }
  )
  return NextResponse.json(response.data)
}
