import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IconMinus, IconPlus } from '@tabler/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPageNumber, setPageNumber } from '@/store/slices/pdfViewerSlice'

function PageNumberSection() {
  const dispatch = useDispatch()
  const page = useSelector(selectPageNumber)

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPage = parseInt(e.target.value, 10)
    dispatch(setPageNumber(newPage || 0))
  }

  const handlePageIncrement = (type: 'increment' | 'decrement') => {
    if (type === 'increment') {
      dispatch(setPageNumber(page + 1))
    } else if (type === 'decrement' && page > 1) {
      dispatch(setPageNumber(page - 1))
    }
  }

  return (
    <div className='flex items-end gap-1'>
      <div className='flex items-center gap-2'>
        <Label className='text-xs'>Page Number:</Label>
        <Input className='w-16' value={page} onChange={handlePageChange} type='text' />
      </div>
      <Button size='icon' variant='outline' onMouseDown={() => handlePageIncrement('decrement')}>
        <IconMinus />
      </Button>
      <Button size='icon' variant='outline' onMouseDown={() => handlePageIncrement('increment')}>
        <IconPlus />
      </Button>
    </div>
  )
}

export default PageNumberSection
