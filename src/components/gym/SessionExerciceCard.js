'use client'

import { IconBarbell } from '@tabler/icons-react'
import React, { useState, useEffect } from 'react'
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { addToast, Button, Input } from '@heroui/react';
import { getSessionExerciceProgress, saveSeriesProgress } from '@root/utils/gym';
import { useGym } from '@root/context/gymContext';

function SessionExerciceCard({ exercice }) {
  const seriesCount = exercice.sets || 1;
  const { loading, session } = useGym()

  const [seriesData, setSeriesData] = useState(
    Array.from({ length: seriesCount }, () => ({
      weight: '',
      reps: '',
      rir: ''
    }))
  );
  useEffect(() => {
    setSeriesData(
      Array.from({ length: seriesCount }, (_, i) => seriesData[i] || {
        weight: '',
        reps: '',
        rir: ''
      })
    );
  }, [seriesCount]);

  useEffect(() => {
    const loadProgress = async () => {
      if (loading || !session?.id || !exercice?.id) return;

      try {
        const progress = await getSessionExerciceProgress(session.id, exercice.id);
        const filled = Array.from({ length: seriesCount }, (_, i) => {
          const found = progress.find(p => p.set_number === i + 1);
          return found || { weight: '', reps: '', rir: '' };
        });
        setSeriesData(filled);
      } catch (e) {
        console.error('Error loading progress:', e);
      }
    };

    loadProgress();
  }, [loading, session, exercice?.id, seriesCount]);

  const handleChange = (index, field, value) => {
    const updated = [...seriesData]
    updated[index][field] = value;
    setSeriesData(updated);
  };


  const handleSave = async () => {
    try {
      await saveSeriesProgress(session.id, exercice.id, seriesData)
      addToast({
        title: 'Saved',
        description: 'Progress saved successfully',
        color: 'success',
      })
    } catch (e) {
      console.error(e)
      addToast({
        title: 'Error',
        description: 'There was an error saving the progress',
        color: 'danger',
      })
    }
  }

  return (
    <div className='relative w-full p-3 bg-[#242424] border border-[#616161] rounded-2xl flex flex-col gap-2'>
      <IconBarbell size={36} className='text-[#616161] absolute top-3 right-3' />

      <h2 className='text-2xl font-bold w-[90%]'>
        {exercice.name}
      </h2>

      <Table>
        <TableHeader>
          <TableColumn>Nro</TableColumn>
          <TableColumn>Weight</TableColumn>
          <TableColumn>Reps</TableColumn>
          <TableColumn>RIR</TableColumn>
        </TableHeader>
        <TableBody>
          {seriesData.map((serie, i) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>
                <Input
                  disabled={loading}
                  type="number"
                  placeholder="kg"
                  value={serie.weight}
                  onChange={(e) => handleChange(i, 'weight', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  disabled={loading}
                  type="number"
                  placeholder="reps"
                  value={serie.reps}
                  onChange={(e) => handleChange(i, 'reps', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  disabled={loading}
                  type="number"
                  placeholder="RIR"
                  value={serie.rir}
                  onChange={(e) => handleChange(i, 'rir', e.target.value)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button onClick={handleSave}>Save</Button>

    </div>
  )
}

export default SessionExerciceCard
