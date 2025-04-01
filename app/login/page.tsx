"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DecorativeElement } from "@/components/decorative-element"
import Image from "next/image"
import { supabase } from "@/lib/supabaseClient"  

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)  // Error state
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null) // Reset error state

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message) // Display error message
      return
    }

    router.push("/dashboard") // Redirect on successful login
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 p-4 pattern-hearts">
      {/* Decorative elements */}
      <div className="fixed top-20 left-10 hidden lg:block">
        <DecorativeElement type="heart" color="pink" size="lg" />
      </div>
      <div className="fixed bottom-20 right-10 hidden lg:block">
        <DecorativeElement type="star" color="purple" size="xl" />
      </div>

      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-pink-500" />
        <span className="text-xl font-pacifico text-pink-500">PookieFocus</span>
      </Link>

      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2 hidden md:block">
          <div className="relative">
            <div className="absolute -top-6 -left-6">
              <DecorativeElement type="star" color="purple" size="md" />
            </div>
            <div className="absolute -bottom-6 -right-6">
              <DecorativeElement type="heart" color="pink" size="md" />
            </div>

            <Image
              src="/sanrio.jpg?height=500&width=500"
              alt="Login illustration"
              width={500}
              height={500}
              className="rounded-3xl border-4 border-white shadow-xl"
            />
          </div>
        </div>

        <Card className="w-full md:w-1/2 border-pink-200 rounded-3xl shadow-xl overflow-hidden">
          <CardHeader className="space-y-1 relative z-10">
            <CardTitle className="text-3xl font-bold text-center text-pink-600 font-pacifico">Welcome back!</CardTitle>
            <CardDescription className="text-center font-quicksand text-lg">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <CardContent className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-quicksand text-pink-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="hello@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-pink-200 focus-visible:ring-pink-500 rounded-xl h-12 font-quicksand"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="font-quicksand text-pink-700">
                    Password
                  </Label>
                  <Link href="/forgot-password" className="text-sm text-pink-500 hover:underline font-quicksand">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-pink-200 focus-visible:ring-pink-500 rounded-xl h-12 font-quicksand"
                />
              </div>

              {/* Display error message if login fails */}
              {error && <p className="text-red-500 text-center font-quicksand">{error}</p>}

              <Button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 h-12 font-quicksand"
              >
                Sign In
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col relative z-10">
            <div className="text-center text-muted-foreground mt-4 font-quicksand">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-pink-500 hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
