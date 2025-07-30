"use client"

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedBackgroundProps {
  className?: string
  variant?: 'dots' | 'grid' | 'waves' | 'particles'
  intensity?: 'low' | 'medium' | 'high'
}

export function AnimatedBackground({ 
  className, 
  variant = 'dots',
  intensity = 'medium' 
}: AnimatedBackgroundProps) {
  const getOpacity = () => {
    switch (intensity) {
      case 'low': return 'opacity-20'
      case 'medium': return 'opacity-30'
      case 'high': return 'opacity-40'
      default: return 'opacity-30'
    }
  }

  if (variant === 'dots') {
    return (
      <div className={cn("absolute inset-0 overflow-hidden", className)}>
        <div className={cn("absolute inset-0", getOpacity())}>
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern
                id="dots"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="20" cy="20" r="1.5" fill="currentColor" className="text-primary">
                  <animate
                    attributeName="r"
                    values="1.5;2.5;1.5"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.3;0.8;0.3"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
      </div>
    )
  }

  if (variant === 'grid') {
    return (
      <div className={cn("absolute inset-0 overflow-hidden", className)}>
        <div className={cn("absolute inset-0", getOpacity())}>
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern
                id="grid"
                x="0"
                y="0"
                width="50"
                height="50"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 50 0 L 0 0 0 50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-primary"
                >
                  <animate
                    attributeName="opacity"
                    values="0.2;0.6;0.2"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </path>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>
    )
  }

  if (variant === 'waves') {
    return (
      <div className={cn("absolute inset-0 overflow-hidden", className)}>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${30 + i * 20}% ${40 + i * 10}%, rgba(var(--primary), 0.1) 0%, transparent 50%)`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'particles') {
    return (
      <div className={cn("absolute inset-0 overflow-hidden", className)}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    )
  }

  return null
}
