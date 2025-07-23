import { cn } from '@/lib/utils'
import Link from 'next/link'

interface AppDownloadButtonProps {
  platform: 'android' | 'ios'
  url: string
  className?: string
}

export function AppDownloadButton({ platform, url, className }: AppDownloadButtonProps) {
  const isAndroid = platform === 'android'
  
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-3 px-6 py-3 bg-black hover:bg-gray-900 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group",
        className
      )}
    >
      {/* Platform Icon */}
      <div className="flex-shrink-0">
        {isAndroid ? (
          // Android Icon
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M17.523 15.3414C18.158 15.3414 18.6729 14.8265 18.6729 14.1915C18.6729 13.5565 18.158 13.0415 17.523 13.0415C16.888 13.0415 16.373 13.5565 16.373 14.1915C16.373 14.8265 16.888 15.3414 17.523 15.3414Z"
              fill="currentColor"
            />
            <path
              d="M6.477 15.3414C7.112 15.3414 7.627 14.8265 7.627 14.1915C7.627 13.5565 7.112 13.0415 6.477 13.0415C5.842 13.0415 5.327 13.5565 5.327 14.1915C5.327 14.8265 5.842 15.3414 6.477 15.3414Z"
              fill="currentColor"
            />
            <path
              d="M12 2.04932C11.5 1.54932 10.5 1.54932 10 2.04932L8.5 3.54932C8 4.04932 8 5.04932 8.5 5.54932C9 6.04932 10 6.04932 10.5 5.54932L12 4.04932L13.5 5.54932C14 6.04932 15 6.04932 15.5 5.54932C16 5.04932 16 4.04932 15.5 3.54932L14 2.04932C13.5 1.54932 12.5 1.54932 12 2.04932Z"
              fill="currentColor"
            />
            <path
              d="M20 9.04932V16.0493C20 17.1493 19.1 18.0493 18 18.0493H6C4.9 18.0493 4 17.1493 4 16.0493V9.04932C4 8.44932 4.4 7.94932 5 7.94932H19C19.6 7.94932 20 8.44932 20 9.04932Z"
              fill="currentColor"
            />
          </svg>
        ) : (
          // iOS/Apple Icon
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 21.99C7.78997 22.03 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.54 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"
              fill="currentColor"
            />
          </svg>
        )}
      </div>

      {/* Text Content */}
      <div className="flex flex-col items-start text-left">
        <span className="text-xs text-gray-300 leading-none">
          {isAndroid ? 'GET IT ON' : 'Download on the'}
        </span>
        <span className="text-lg font-semibold leading-tight group-hover:text-white transition-colors">
          {isAndroid ? 'Google Play' : 'App Store'}
        </span>
      </div>

      {/* Arrow Icon */}
      <div className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path
            d="M6 12L10 8L6 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Link>
  )
}
