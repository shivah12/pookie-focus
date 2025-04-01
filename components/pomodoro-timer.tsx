"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { DecorativeElement } from "@/components/decorative-element"

interface PomodoroTimerProps {
  theme: "barbie" | "kawaii" | "pookie"
}

export function PomodoroTimer({ theme }: PomodoroTimerProps) {
  const { toast } = useToast()
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(true)
  const [mode, setMode] = useState<"work" | "break">("work")
  const [secondsLeft, setSecondsLeft] = useState(25 * 60)

  const [workDuration, setWorkDuration] = useState(25)
  const [breakDuration, setBreakDuration] = useState(5)
  const [timerType, setTimerType] = useState<"25min" | "50min">("25min")
  const [soundEnabled, setSoundEnabled] = useState(true)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const themeColor = theme === "barbie" ? "pink" : theme === "kawaii" ? "purple" : "blue"

  useEffect(() => {
    // Create audio element for timer completion sound
    audioRef.current = new Audio("/placeholder.svg") // Replace with actual sound file

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((seconds) => {
          if (seconds <= 1) {
            clearInterval(intervalRef.current as NodeJS.Timeout)
            setIsPaused(true)
            setIsActive(false)

            // Play sound if enabled
            if (soundEnabled && audioRef.current) {
              audioRef.current.play().catch((e) => console.error("Error playing sound:", e))
            }

            // Show notification when timer ends
            toast({
              title: `${mode === "work" ? "Work" : "Break"} session completed!`,
              description: mode === "work" ? "Time for a break!" : "Ready to get back to work?",
            })

            // Switch modes
            if (mode === "work") {
              setMode("break")
              setSecondsLeft(breakDuration * 60)
            } else {
              setMode("work")
              setSecondsLeft(workDuration * 60)
            }

            return 0
          }
          return seconds - 1
        })
      }, 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, isPaused, mode, workDuration, breakDuration, toast, soundEnabled])

  useEffect(() => {
    // Reset timer when timer type changes
    if (timerType === "25min") {
      setWorkDuration(25)
      setBreakDuration(5)
    } else {
      setWorkDuration(50)
      setBreakDuration(10)
    }

    resetTimer()
  }, [timerType])

  const startTimer = () => {
    setIsActive(true)
    setIsPaused(false)
  }

  const pauseTimer = () => {
    setIsPaused(true)
  }

  const resetTimer = () => {
    setIsActive(false)
    setIsPaused(true)
    setMode("work")
    setSecondsLeft(workDuration * 60)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progress = mode === "work" ? 1 - secondsLeft / (workDuration * 60) : 1 - secondsLeft / (breakDuration * 60)

  return (
    <div className="flex flex-col items-center space-y-6">
      <Tabs
        defaultValue="25min"
        value={timerType}
        onValueChange={(value) => setTimerType(value as "25min" | "50min")}
        className="w-full"
      >
        <TabsList
          className={`grid w-full grid-cols-2 rounded-xl p-1 ${
            theme === "barbie" ? "bg-pink-100" : theme === "kawaii" ? "bg-purple-100" : "bg-blue-100"
          }`}
        >
          <TabsTrigger
            value="25min"
            className={`rounded-lg font-quicksand data-[state=active]:${
              theme === "barbie"
                ? "bg-pink-500 text-white"
                : theme === "kawaii"
                  ? "bg-purple-500 text-white"
                  : "bg-blue-500 text-white"
            }`}
          >
            25/5 min
          </TabsTrigger>
          <TabsTrigger
            value="50min"
            className={`rounded-lg font-quicksand data-[state=active]:${
              theme === "barbie"
                ? "bg-pink-500 text-white"
                : theme === "kawaii"
                  ? "bg-purple-500 text-white"
                  : "bg-blue-500 text-white"
            }`}
          >
            50/10 min
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="relative w-48 h-48">
        <div className="absolute -top-3 -left-3">
          <DecorativeElement
            type={theme === "barbie" ? "heart" : theme === "kawaii" ? "star" : "cloud"}
            color={theme === "barbie" ? "pink" : theme === "kawaii" ? "purple" : "blue"}
            size="sm"
          />
        </div>
        <div className="absolute -bottom-3 -right-3">
          <DecorativeElement
            type={theme === "barbie" ? "star" : theme === "kawaii" ? "heart" : "star"}
            color={theme === "barbie" ? "purple" : theme === "kawaii" ? "pink" : "blue"}
            size="sm"
          />
        </div>

        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className={`text-${themeColor}-100`}
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="42"
            cx="50"
            cy="50"
          />
          <motion.circle
            className={`text-${themeColor}-500`}
            strokeWidth="8"
            strokeDasharray={264}
            strokeDashoffset={264 * (1 - progress)}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="42"
            cx="50"
            cy="50"
            initial={{ strokeDashoffset: 264 }}
            animate={{ strokeDashoffset: 264 * (1 - progress) }}
            transition={{ duration: 0.5 }}
          />
        </svg>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="text-center">
            <div className={`text-3xl font-bold text-${themeColor}-500 font-quicksand`}>{formatTime(secondsLeft)}</div>
            <div className={`text-sm text-${themeColor}-400 capitalize font-quicksand`}>
              {mode} {mode === "work" ? workDuration : breakDuration}min
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-2">
        {isPaused ? (
          <Button
            onClick={startTimer}
            className={`rounded-full bg-gradient-to-r ${
              theme === "barbie"
                ? "from-pink-400 to-pink-600"
                : theme === "kawaii"
                  ? "from-purple-400 to-purple-600"
                  : "from-blue-400 to-blue-600"
            } shadow-md hover:shadow-lg transition-all duration-300 font-quicksand`}
          >
            <Play className="h-4 w-4 mr-1" /> Start
          </Button>
        ) : (
          <Button
            onClick={pauseTimer}
            className={`rounded-full bg-gradient-to-r ${
              theme === "barbie"
                ? "from-pink-400 to-pink-600"
                : theme === "kawaii"
                  ? "from-purple-400 to-purple-600"
                  : "from-blue-400 to-blue-600"
            } shadow-md hover:shadow-lg transition-all duration-300 font-quicksand`}
          >
            <Pause className="h-4 w-4 mr-1" /> Pause
          </Button>
        )}
        <Button
          onClick={resetTimer}
          variant="outline"
          className={`rounded-full border-${themeColor}-200 font-quicksand`}
        >
          <RotateCcw className="h-4 w-4 mr-1" /> Reset
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`rounded-full border-${themeColor}-200 ml-2`}
        >
          {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </Button>
      </div>

      <div className="w-full space-y-2">
        <div className="flex justify-between text-xs font-quicksand">
          <span>Focus</span>
          <span>Break</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className={`h-7 w-7 p-0 rounded-full border-${themeColor}-200 ${mode === "work" ? `bg-${themeColor}-100` : ""}`}
            onClick={() => {
              setMode("work")
              resetTimer()
              setSecondsLeft(workDuration * 60)
            }}
          >
            F
          </Button>
          <Slider
            value={[mode === "work" ? 0 : 100]}
            min={0}
            max={100}
            step={100}
            className={`flex-1`}
            onValueChange={(value) => {
              const newMode = value[0] === 0 ? "work" : "break"
              setMode(newMode)
              resetTimer()
              setSecondsLeft(newMode === "work" ? workDuration * 60 : breakDuration * 60)
            }}
          />
          <Button
            variant="outline"
            size="sm"
            className={`h-7 w-7 p-0 rounded-full border-${themeColor}-200 ${mode === "break" ? `bg-${themeColor}-100` : ""}`}
            onClick={() => {
              setMode("break")
              resetTimer()
              setSecondsLeft(breakDuration * 60)
            }}
          >
            B
          </Button>
        </div>
      </div>
    </div>
  )
}

