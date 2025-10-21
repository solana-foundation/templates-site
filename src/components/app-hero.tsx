import React from 'react'
import Image from 'next/image'

export function AppHero({
  children,
  subtitle,
  title,
}: {
  children?: React.ReactNode
  subtitle?: React.ReactNode
  title?: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center py-8 md:py-16">
      <div className="absolute top-0 left-0 w-full h-full -z-50 overflow-x-hidden">
        <Image
          src={'/hero.webp'}
          alt="Hero"
          width={1000}
          height={1000}
          className="absolute top-0 -left-[550px] hidden md:block -z-10 opacity-50"
        />
        <Image
          src={'/hero.webp'}
          alt="Hero"
          width={1000}
          height={1000}
          className="absolute -top-44 -right-[550px] hidden md:block -z-10 opacity-50"
        />
      </div>
      <div className="text-center z-10">
        <div className="max-w-2xl">
          {typeof title === 'string' ? <h1 className="text-3xl md:text-4xl font-bold">{title}</h1> : title}
          {typeof subtitle === 'string' ? (
            <p className="pt-2 md:pt-3 md:max-w-2xl mx-auto text-sm md:text-base text-neutral-400">{subtitle}</p>
          ) : (
            subtitle
          )}
          {children}
        </div>
      </div>
    </div>
  )
}
