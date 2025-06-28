'use client'

import React, { useEffect, useState } from 'react'
import Input from '../Input'
import { addToast } from '@heroui/toast'
import { useGym } from '@root/context/gymContext'
import { Skeleton } from '@heroui/skeleton'
import ExerciceSelector from './ExerciceSelector'
import Button from '../Button'

function EditWorkoutForm({ workoutID }) {
  const [workout, setWorkout] = useState(null)
  const [exerciceOrder, setExerciceOrder] = useState([])

  const { loading, workouts } = useGym()

  useEffect(() => {
    if (!workouts) return

    const foundWorkout = workouts.find(workout => workout.id.toString() === workoutID)
    if (!foundWorkout) {
      addToast({ title: "Error", description: "Workout not found", color: "danger", timeout: 2000 })
      return
    }

    setWorkout(foundWorkout)
    console.log(foundWorkout)
    setExerciceOrder(foundWorkout.exercicesIDs.map((e, index) => ({
      id: index,
      selectedID: e.toString()
    })))
  }, [workouts])

  const handleSelect = (internalId, newSelectedID) => {
    setExerciceOrder(prev =>
      prev.map(e =>
        e.id === internalId ? { ...e, selectedID: newSelectedID } : e
      )
    )
  }

  const handleRemove = (internalId) => {
    setExerciceOrder(prev => prev.filter(e => e.id !== internalId))
  }

  const handleMoveUp = (index) => {
    if (index === 0) return
    const newOrder = [...exerciceOrder]
    const temp = newOrder[index]
    newOrder[index] = newOrder[index - 1]
    newOrder[index - 1] = temp
    setExerciceOrder(newOrder)
  }

  const handleMoveDown = (index) => {
    if (index === exerciceOrder.length - 1) return
    const newOrder = [...exerciceOrder]
    const temp = newOrder[index]
    newOrder[index] = newOrder[index + 1]
    newOrder[index + 1] = temp
    setExerciceOrder(newOrder)
  }


  const addSelector = () => {
    setExerciceOrder(prev => [
      ...prev,
      {
        id: Date.now(), // ID único
        selectedID: null
      }
    ])
  }


  if (loading || !workout) {
    return (
      <div className='flex flex-col gap-4 my-6'>
        <Skeleton className="z-20 w-full h-32 rounded-2xl" />
      </div>
    )
  }



  return (
    <div className='flex flex-col gap-6'>
      <Input
        label='Workout name'
        placeholder='Workout name'
        defaultValue={workout.name}
      />

      <h2 className='text-[#C5C5C5] text-2xl'>
        Exercises order
      </h2>

      {exerciceOrder.map((item, index) => (
        <ExerciceSelector
          key={item.id}
          id={item.id}
          selectedID={item.selectedID}
          onSelect={handleSelect}
          onRemove={() => handleRemove(item.id)}
          onMoveUp={() => handleMoveUp(index)}
          onMoveDown={() => handleMoveDown(index)}
          isFirst={index === 0}
          isLast={index === exerciceOrder.length - 1}
        />
      ))}
      <Button
        text="Add an exercice"
        className='max-h-10'
        handleClick={addSelector}
      />

    </div>
  )
}

export default EditWorkoutForm
