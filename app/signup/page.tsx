"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"  // Import Supabase
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DecorativeElement } from "@/components/decorative-element"
import Image from "next/image"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("") // Clear previous errors

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    })

    if (error) {
      setErrorMsg(error.message)
      return
    }

    alert("Check your email for confirmation!")
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 p-4 pattern-stars">
      {/* Decorative elements */}
      <div className="fixed top-20 right-10 hidden lg:block">
        <DecorativeElement type="star" color="purple" size="lg" />
      </div>
      <div className="fixed bottom-20 left-10 hidden lg:block">
        <DecorativeElement type="heart" color="pink" size="xl" />
      </div>

      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-pink-500" />
        <span className="text-xl font-pacifico text-pink-500">PookieFocus</span>
      </Link>

      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 items-center">
        <Card className="w-full md:w-1/2 border-pink-200 rounded-3xl shadow-xl overflow-hidden order-2 md:order-1">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center text-purple-600 font-pacifico">
              Join the fun!
            </CardTitle>
            <CardDescription className="text-center font-quicksand text-lg">
              Create your account to get started
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="hello@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500">Create Account</Button>
            </form>
          </CardContent>

          <CardFooter>
            <div className="text-center">
              Already have an account? <Link href="/login" className="text-purple-500 hover:underline">Sign in</Link>
            </div>
          </CardFooter>
        </Card>

        <div className="w-full md:w-1/2 hidden md:block">
          <Image src="/barbie.jpg?height=500&width=500" alt="Signup illustration" width={500} height={500} />
        </div>
      </div>
    </div>
  )
}
