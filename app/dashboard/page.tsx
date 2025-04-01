"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  Home,
  ListTodo,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Sparkles,
  Star,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { PomodoroTimer } from "@/components/pomodoro-timer"
import { TaskList } from "@/components/task-list"
import { MotivationalQuote } from "@/components/motivational-quote"
import { DecorativeElement } from "@/components/decorative-element"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function DashboardPage() {
  const { toast } = useToast()
  const [activeTheme, setActiveTheme] = useState<"barbie" | "kawaii" | "pookie">("barbie")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    // Welcome toast when dashboard loads
    toast({
      title: "Welcome back!",
      description: "Ready to be productive today?",
    })
  }, [toast])

  const getThemeColors = () => {
    switch (activeTheme) {
      case "barbie":
        return {
          primary: "pink",
          secondary: "purple",
          accent: "pink",
          light: "pink-50",
          medium: "pink-100",
          dark: "pink-200",
          text: "pink-600",
          gradient: "from-pink-400 to-pink-600",
          pattern: "pattern-hearts",
        }
      case "kawaii":
        return {
          primary: "purple",
          secondary: "pink",
          accent: "purple",
          light: "purple-50",
          medium: "purple-100",
          dark: "purple-200",
          text: "purple-600",
          gradient: "from-purple-400 to-purple-600",
          pattern: "pattern-stars",
        }
      case "pookie":
        return {
          primary: "blue",
          secondary: "green",
          accent: "blue",
          light: "blue-50",
          medium: "blue-100",
          dark: "blue-200",
          text: "blue-600",
          gradient: "from-blue-400 to-blue-600",
          pattern: "pattern-dots",
        }
    }
  }

  const theme = getThemeColors()

  const handleTaskComplete = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  const getThemeImage = () => {
    switch (activeTheme) {
      case "barbie":
        return "/barbie.jpg?height=200&width=200&text=Barbie"
      case "kawaii":
        return "/kawaii.jpg?height=200&width=200&text=Kawaii"
      case "pookie":
        return "/sanrio.jpg?height=200&width=200&text=Pookie"
    }
  }

  return (
    <SidebarProvider>
      <div
        className={`min-h-screen transition-all duration-500 ${
          activeTheme === "barbie" ? "bg-barbie" : activeTheme === "kawaii" ? "bg-kawaii" : "bg-pookie"
        } ${theme.pattern}`}
      >
        {/* Mobile Header */}
        <header
          className={`lg:hidden sticky top-0 z-40 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 ${`border-${theme.dark} bg-${theme.light}/95`}`}
        >
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full text-${theme.text}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className={`h-6 w-6 text-${theme.primary}-500`} />
                <span className={`text-xl font-pacifico text-${theme.primary}-500`}>PookieFocus</span>
              </motion.div>
            </div>

            <div className="flex items-center gap-2">
              <ThemeSwitcher activeTheme={activeTheme} setActiveTheme={setActiveTheme} />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback className={`bg-${theme.primary}-100 text-${theme.primary}-500`}>
                        ME
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-xl">
                  <DropdownMenuLabel className="font-quicksand">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="font-quicksand">
                    <User className="mr-2 h-4 w-4" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="font-quicksand">
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="font-quicksand text-red-500">
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <motion.div
                className={`absolute left-0 top-0 bottom-0 w-64 ${
                  activeTheme === "barbie" ? "bg-pink-50" : activeTheme === "kawaii" ? "bg-purple-50" : "bg-blue-50"
                } p-4`}
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", damping: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2 mb-8">
                  <Sparkles className={`h-6 w-6 text-${theme.primary}-500`} />
                  <span className={`text-xl font-pacifico text-${theme.primary}-500`}>PookieFocus</span>
                </div>

                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start rounded-xl font-quicksand ${`hover:bg-${theme.medium} hover:text-${theme.text}`}`}
                  >
                    <Home className="mr-2 h-4 w-4" /> Dashboard
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start rounded-xl font-quicksand ${`hover:bg-${theme.medium} hover:text-${theme.text}`}`}
                  >
                    <ListTodo className="mr-2 h-4 w-4" /> Tasks
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start rounded-xl font-quicksand ${`hover:bg-${theme.medium} hover:text-${theme.text}`}`}
                  >
                    <Clock className="mr-2 h-4 w-4" /> Pomodoro
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start rounded-xl font-quicksand ${`hover:bg-${theme.medium} hover:text-${theme.text}`}`}
                  >
                    <Calendar className="mr-2 h-4 w-4" /> Calendar
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start rounded-xl font-quicksand ${`hover:bg-${theme.medium} hover:text-${theme.text}`}`}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" /> Notes
                  </Button>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <Button
                    variant="outline"
                    className={`w-full justify-start rounded-xl font-quicksand border-${theme.dark} text-red-500`}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Layout with Sidebar */}
        <div className="flex">
          <Sidebar className="hidden lg:flex" collapsible="icon">
            <SidebarHeader className={`border-b border-${theme.dark}`}>
              <div className="flex items-center gap-2 px-2 py-3">
                <Sparkles className={`h-6 w-6 text-${theme.primary}-500`} />
                <span className={`text-xl font-pacifico text-${theme.primary}-500`}>PookieFocus</span>
              </div>
            </SidebarHeader>

            <SidebarContent>
              <div className="px-2 py-2">
                <div className={`mb-4 rounded-xl bg-${theme.medium} p-3 text-center`}>
                  <Avatar className="h-16 w-16 mx-auto mb-2">
                    <AvatarImage src="/testimonial.jpg?height=64&width=64" alt="User" />
                    <AvatarFallback className={`bg-${theme.primary}-200 text-${theme.primary}-600 text-xl`}>
                      ME
                    </AvatarFallback>
                  </Avatar>
                  <p className={`font-quicksand font-medium text-${theme.text}`}>Shreeti Mohapatra</p>
                  <p className="text-sm text-muted-foreground font-quicksand">Premium Member</p>
                </div>

                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      className={`hover:bg-${theme.medium} hover:text-${theme.text}`}
                      isActive={true}
                      tooltip="Dashboard"
                    >
                      <Home className="h-4 w-4" />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton className={`hover:bg-${theme.medium} hover:text-${theme.text}`} tooltip="Tasks">
                      <ListTodo className="h-4 w-4" />
                      <span>Tasks</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton
                      className={`hover:bg-${theme.medium} hover:text-${theme.text}`}
                      tooltip="Pomodoro"
                    >
                      <Clock className="h-4 w-4" />
                      <span>Pomodoro</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton
                      className={`hover:bg-${theme.medium} hover:text-${theme.text}`}
                      tooltip="Calendar"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Calendar</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton className={`hover:bg-${theme.medium} hover:text-${theme.text}`} tooltip="Notes">
                      <MessageSquare className="h-4 w-4" />
                      <span>Notes</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </div>
            </SidebarContent>

            <SidebarFooter className={`border-t border-${theme.dark} p-2`}>
              <div className="flex items-center justify-between">
                <ThemeSwitcher activeTheme={activeTheme} setActiveTheme={setActiveTheme} />
                <Button
                  variant="outline"
                  size="icon"
                  className={`rounded-full border-${theme.dark} text-${theme.text}`}
                >
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full border-red-200 text-red-500">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </SidebarFooter>
          </Sidebar>

          <SidebarInset>
            <main
              className={`container py-6 transition-all duration-500 ${
                activeTheme === "barbie" ? "bg-barbie" : activeTheme === "kawaii" ? "bg-kawaii" : "bg-pookie"
              }`}
            >
              {/* Decorative elements */}
              <div className="fixed top-20 right-10 hidden lg:block">
                <DecorativeElement
                  type={activeTheme === "barbie" ? "heart" : activeTheme === "kawaii" ? "star" : "cloud"}
                  color={activeTheme === "barbie" ? "pink" : activeTheme === "kawaii" ? "purple" : "blue"}
                  size="lg"
                />
              </div>
              <div className="fixed bottom-20 left-10 hidden lg:block">
                <DecorativeElement
                  type={activeTheme === "barbie" ? "star" : activeTheme === "kawaii" ? "heart" : "cloud"}
                  color={activeTheme === "barbie" ? "purple" : activeTheme === "kawaii" ? "pink" : "blue"}
                  size="xl"
                />
              </div>

              {/* Header section with welcome and search */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                  <h1 className={`text-2xl md:text-3xl font-pacifico text-${theme.text}`}>Welcome back, Melody!</h1>
                  <p className="text-muted-foreground font-quicksand">
                    Today is{" "}
                    {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`relative rounded-full border border-${theme.dark} bg-white px-3 py-1 w-full md:w-auto`}
                  >
                    <Input
                      placeholder="Search..."
                      className={`border-0 bg-transparent pl-8 focus-visible:ring-0 font-quicksand`}
                    />
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-${theme.text}`} />
                  </div>

                  <Button variant="outline" size="icon" className={`rounded-full relative border-${theme.dark}`}>
                    <Bell className={`h-4 w-4 text-${theme.text}`} />
                    <span className={`absolute -top-1 -right-1 h-3 w-3 rounded-full bg-${theme.primary}-500`}></span>
                  </Button>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <MotivationalQuote theme={activeTheme} />
              </motion.div>

              {/* Theme showcase */}
              <div
                className={`mt-8 p-6 rounded-3xl border-2 border-${theme.dark} bg-white/80 backdrop-blur-sm shadow-lg`}
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                    <Image
                      src={getThemeImage() || "/barbie.jpg"}
                      alt={`${activeTheme} theme`}
                      fill
                      className="object-contain animate-float"
                    />
                  </div>

                  <div className="flex-1">
                    <h2 className={`text-2xl font-pacifico text-${theme.text} mb-2`}>
                      {activeTheme === "barbie"
                        ? "Barbie Theme"
                        : activeTheme === "kawaii"
                          ? "Kawaii Sanrio Theme"
                          : "Pookie Theme"}
                    </h2>
                    <p className="text-muted-foreground font-quicksand mb-4">
                      {activeTheme === "barbie"
                        ? "Embrace your inner Barbie with this pink and fabulous theme! Perfect for those who love all things glamorous and fun."
                        : activeTheme === "kawaii"
                          ? "Adorable and sweet kawaii style inspired by Sanrio characters. Cute pastel colors to brighten your day!"
                          : "Cozy and playful pookie bear theme with soft blues and greens. Perfect for a calm and productive day!"}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        className={`rounded-full border-${theme.dark} bg-${theme.light} text-${theme.text} hover:bg-${theme.medium}`}
                        onClick={() => setActiveTheme("barbie")}
                      >
                        <div className="h-3 w-3 rounded-full bg-pink-500 mr-2"></div>
                        Barbie
                      </Button>
                      <Button
                        variant="outline"
                        className={`rounded-full border-${theme.dark} bg-${theme.light} text-${theme.text} hover:bg-${theme.medium}`}
                        onClick={() => setActiveTheme("kawaii")}
                      >
                        <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                        Kawaii
                      </Button>
                      <Button
                        variant="outline"
                        className={`rounded-full border-${theme.dark} bg-${theme.light} text-${theme.text} hover:bg-${theme.medium}`}
                        onClick={() => setActiveTheme("pookie")}
                      >
                        <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                        Pookie
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <motion.div
                  className="lg:col-span-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Card className={`border-2 rounded-3xl shadow-lg overflow-hidden ${`border-${theme.dark}`}`}>
                    <div className={`bg-gradient-to-r ${theme.gradient} p-4`}>
                      <CardTitle className={`flex items-center gap-2 text-white font-pacifico text-2xl`}>
                        <ListTodo className="h-5 w-5" />
                        Task List
                      </CardTitle>
                      <CardDescription className="font-quicksand text-white/80">
                        Manage your tasks and stay organized
                      </CardDescription>
                    </div>
                    <CardContent className="p-6">
                      <TaskList theme={activeTheme} onTaskComplete={handleTaskComplete} />
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Card className={`border-2 rounded-3xl shadow-lg overflow-hidden ${`border-${theme.dark}`}`}>
                    <div className={`bg-gradient-to-r ${theme.gradient} p-4`}>
                      <CardTitle className={`flex items-center gap-2 text-white font-pacifico text-2xl`}>
                        <Clock className="h-5 w-5" />
                        Pomodoro Timer
                      </CardTitle>
                      <CardDescription className="font-quicksand text-white/80">
                        Stay focused with timed work sessions
                      </CardDescription>
                    </div>
                    <CardContent className="p-6">
                      <PomodoroTimer theme={activeTheme} />
                    </CardContent>
                  </Card>

                  <div className="mt-6">
                    <Card className={`border-2 rounded-3xl shadow-lg overflow-hidden ${`border-${theme.dark}`}`}>
                      <div className={`bg-gradient-to-r ${theme.gradient} p-4`}>
                        <CardTitle className={`flex items-center gap-2 text-white font-pacifico text-xl`}>
                          <Star className="h-5 w-5" />
                          Your Progress
                        </CardTitle>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex justify-between mb-2">
                          <span className="font-quicksand font-medium">Tasks Completed</span>
                          <span className="font-quicksand font-bold">3/6</span>
                        </div>
                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-${theme.primary}-500`}
                            initial={{ width: "0%" }}
                            animate={{ width: "50%" }}
                            transition={{ duration: 1, delay: 0.8 }}
                          ></motion.div>
                        </div>

                        <div className="mt-4 flex justify-between mb-2">
                          <span className="font-quicksand font-medium">Focus Time</span>
                          <span className="font-quicksand font-bold">45/120 min</span>
                        </div>
                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-${theme.primary}-500`}
                            initial={{ width: "0%" }}
                            animate={{ width: "37.5%" }}
                            transition={{ duration: 1, delay: 1 }}
                          ></motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Card className={`border-2 rounded-3xl shadow-lg overflow-hidden ${`border-${theme.dark}`}`}>
                  <div className={`bg-gradient-to-r ${theme.gradient} p-4`}>
                    <CardTitle className={`flex items-center gap-2 text-white font-pacifico text-2xl`}>
                      <Sparkles className="h-5 w-5" />
                      Your Achievements
                    </CardTitle>
                    <CardDescription className="font-quicksand text-white/80">
                      Track your productivity journey
                    </CardDescription>
                  </div>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <motion.div
                        className={`rounded-2xl p-4 text-center ${`bg-${theme.light} border border-${theme.dark}`}`}
                        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      >
                        <div
                          className={`mx-auto mb-2 rounded-full bg-${theme.medium} p-3 w-12 h-12 flex items-center justify-center`}
                        >
                          <CheckCircle className={`h-6 w-6 text-${theme.text}`} />
                        </div>
                        <div className="text-3xl font-bold mb-1 font-quicksand">12</div>
                        <div className="text-sm text-muted-foreground">Tasks Completed</div>
                      </motion.div>

                      <motion.div
                        className={`rounded-2xl p-4 text-center ${`bg-${theme.light} border border-${theme.dark}`}`}
                        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      >
                        <div
                          className={`mx-auto mb-2 rounded-full bg-${theme.medium} p-3 w-12 h-12 flex items-center justify-center`}
                        >
                          <Clock className={`h-6 w-6 text-${theme.text}`} />
                        </div>
                        <div className="text-3xl font-bold mb-1 font-quicksand">5</div>
                        <div className="text-sm text-muted-foreground">Focus Sessions</div>
                      </motion.div>

                      <motion.div
                        className={`rounded-2xl p-4 text-center ${`bg-${theme.light} border border-${theme.dark}`}`}
                        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      >
                        <div
                          className={`mx-auto mb-2 rounded-full bg-${theme.medium} p-3 w-12 h-12 flex items-center justify-center`}
                        >
                          <Calendar className={`h-6 w-6 text-${theme.text}`} />
                        </div>
                        <div className="text-3xl font-bold mb-1 font-quicksand">3</div>
                        <div className="text-sm text-muted-foreground">Day Streak</div>
                      </motion.div>

                      <motion.div
                        className={`rounded-2xl p-4 text-center ${`bg-${theme.light} border border-${theme.dark}`}`}
                        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      >
                        <div
                          className={`mx-auto mb-2 rounded-full bg-${theme.medium} p-3 w-12 h-12 flex items-center justify-center`}
                        >
                          <Star className={`h-6 w-6 text-${theme.text}`} />
                        </div>
                        <div className="text-3xl font-bold mb-1 font-quicksand">2h</div>
                        <div className="text-sm text-muted-foreground">Focus Time</div>
                      </motion.div>
                    </div>

                    <div className="mt-6 flex flex-col md:flex-row gap-4">
                      <Card className={`flex-1 border border-${theme.dark} rounded-xl p-4`}>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className={`font-quicksand font-medium text-${theme.text}`}>Weekly Stats</h3>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="h-32 flex items-end justify-between gap-1">
                        {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
  <div key={`${day}-${i}`} className="flex flex-col items-center gap-1">

                              <div
                                className={`w-8 bg-${theme.primary}-${i === 3 ? "500" : "200"} rounded-t-md`}
                                style={{ height: `${i === 3 ? 100 : Math.random() * 60 + 20}%` }}
                              ></div>
                              <span className="text-xs font-quicksand">{day}</span>
                            </div>
                          ))}
                        </div>
                      </Card>

                      <Card className={`flex-1 border border-${theme.dark} rounded-xl p-4`}>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className={`font-quicksand font-medium text-${theme.text}`}>Upcoming Tasks</h3>
                          <Button
                            variant="outline"
                            size="sm"
                            className={`h-8 rounded-full text-xs border-${theme.dark} text-${theme.text}`}
                          >
                            View All
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <div className={`p-2 rounded-lg bg-${theme.light} flex items-center justify-between`}>
                            <div className="flex items-center gap-2">
                              <div className={`h-2 w-2 rounded-full bg-red-500`}></div>
                              <span className="font-quicksand text-sm">Project Deadline</span>
                            </div>
                            <span className="text-xs text-muted-foreground">Tomorrow</span>
                          </div>
                          <div className={`p-2 rounded-lg bg-${theme.light} flex items-center justify-between`}>
                            <div className="flex items-center gap-2">
                              <div className={`h-2 w-2 rounded-full bg-${theme.primary}-500`}></div>
                              <span className="font-quicksand text-sm">Team Meeting</span>
                            </div>
                            <span className="text-xs text-muted-foreground">Friday</span>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Confetti effect when task is completed */}
              {showConfetti && (
                <div className="fixed inset-0 pointer-events-none z-50">
                  <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                    numberOfPieces={200}
                    colors={[
                      activeTheme === "barbie" ? "#ec4899" : activeTheme === "kawaii" ? "#a855f7" : "#3b82f6",
                      "#ffffff",
                      activeTheme === "barbie" ? "#fbcfe8" : activeTheme === "kawaii" ? "#e9d5ff" : "#bfdbfe",
                    ]}
                  />
                </div>
              )}
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}

// Helper components
function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function MoreHorizontal(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  )
}

// Import this at the top of your file
import Confetti from "react-confetti"

