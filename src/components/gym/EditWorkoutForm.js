'use client'

import React, { useEffect, useState } from 'react'
import Input from '../Input'
import { addToast } from '@heroui/toast'
import { useGym } from '@root/context/gymContext'
import { Skeleton } from '@heroui/skeleton'
import ExerciceSelector from './ExerciceSelector'
import Button from '../Button'
import { IconEdit } from '@tabler/icons-react'
import { redirect } from 'next/navigation'
import { editWorkoutInfo } from '@root/utils/gym'
import { useTranslation } from 'react-i18next'

function EditWorkoutForm({ workoutID }) {
  const { t } = useTranslation('common')

  const [workout, setWorkout] = useState(null)
  const [exerciceOrder, setExerciceOrder] = useState([])

  const { loading, workouts, loadWorkouts } = useGym()

  useEffect(() => {
    if (loading || !workoutID) return

    const foundWorkout = workouts.find(workout => workout.id.toString() === workoutID)
    if (!foundWorkout) {
      addToast({ title: t('error'), description: t('workout_not_found'), color: "danger", timeout: 2000 })
      redirect('/gym')
    }

    setWorkout(foundWorkout)
    setExerciceOrder(foundWorkout.exercicesIDs.map((e, index) => ({
      id: index,
      selectedID: e.toString()
    })))
  }, [workouts, loading, workoutID, t])

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

  const handleSave = async () => {
    try {
      await editWorkoutInfo(workoutID, workout.name, exerciceOrder)
      await loadWorkouts(true)
      addToast({ title: t('saved'), description: t('workout_saved'), color: "success", timeout: 2000 })
    } catch (e) {
      console.error(e)
      addToast({ title: t('error'), description: t('workout_save_error'), color: "danger", timeout: 2000 })
    }
  }

  if (loading || !workout) {
    return (
      <div className='flex flex-col gap-4 my-6'>
        <Skeleton className="z-20 w-full h-20 rounded-2xl" />
        <h2 className='text-[#C5C5C5] text-2xl'>
          {t('exercises_order')}
        </h2>
        <div className='flex flex-col gap-4'>
          <Skeleton className="z-20 w-full h-32 rounded-2xl" />
          <Skeleton className="z-20 w-full h-32 rounded-2xl" />
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-6'>
      <Input
        label={t('workout_name')}
        placeholder={t('workout_name')}
        defaultValue={workout.name}
      />

      <h2 className='text-[#C5C5C5] text-2xl'>
        {t('exercises_order')}
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
        text={t('add_exercice')}
        className='max-h-10'
        handleClick={addSelector}
      />
      <Button
        text={t('save')}
        icon={<IconEdit />}
        handleClick={handleSave}
      />
    </div>
  )
}

export default EditWorkoutForm
