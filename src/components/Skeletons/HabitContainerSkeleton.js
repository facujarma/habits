"use client"

import { Skeleton } from "@heroui/react"

function HabitContainerSkeleton() {
  return (
    <div className="w-full h-24 flex items-center gap-6">
      {/* Círculo de check */}
      <Skeleton className="rounded-full">
        <div className="w-10 h-10 rounded-full bg-default-300" />
      </Skeleton>

      {/* Contenedor del hábito */}
      <div className="flex items-center w-full h-24 border border-[#616161] rounded-xl px-3 py-2 justify-between bg-[#242424]">
        <div className="flex flex-col justify-center gap-3 w-full">
          <Skeleton className="w-3/4 rounded-lg">
            <div className="h-5 bg-default-200 rounded-lg" />
          </Skeleton>
          <Skeleton className="w-1/2 rounded-lg">
            <div className="h-4 bg-default-300 rounded-lg" />
          </Skeleton>
        </div>

        {/* Menú icono a la derecha */}
        <Skeleton className="rounded-md">
          <div className="h-6 w-6 bg-default-300 rounded-md" />
        </Skeleton>
      </div>
    </div>
  )
}

export default HabitContainerSkeleton
