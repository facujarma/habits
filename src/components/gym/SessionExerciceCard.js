'use client'

import { IconBarbell } from '@tabler/icons-react'
import React, { useState, useEffect } from 'react'
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { Button, Input } from '@heroui/react';

function SessionExerciceCard({ exercice }) {
  const seriesCount = exercice.sets || 1;

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

  const handleChange = (index, field, value) => {
    const updated = [...seriesData]
    updated[index][field] = value;
    setSeriesData(updated);
  };

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
                  type="number"
                  placeholder="kg"
                  value={serie.weight}
                  onChange={(e) => handleChange(i, 'weight', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  placeholder="reps"
                  value={serie.reps}
                  onChange={(e) => handleChange(i, 'reps', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
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

      <Button onClick={() => console.log(seriesData)}>Save</Button>

    </div>
  )
}

export default SessionExerciceCard
