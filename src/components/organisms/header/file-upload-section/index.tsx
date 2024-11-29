import React from 'react'
import { useDispatch } from 'react-redux'
import { IconPlus } from '@tabler/icons-react'
import { setFile } from '@/store/slices/pdfViewerSlice'
import { Button } from '@/components/ui/button'

function FileUploadSection() {
  const dispatch = useDispatch()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      dispatch(setFile(URL.createObjectURL(file)))
    }
  }

  return (
    <div>
      <input
        id='file-upload-input'
        type='file'
        accept='application/pdf'
        className='hidden'
        onChange={handleFileChange}
      />
      <label htmlFor='file-upload-input'>
        <div className='size-fit cursor-pointer'>
          <Button type='button' className='pointer-events-none select-none'>
            <IconPlus />
            File Upload
          </Button>
        </div>
      </label>
    </div>
  )
}

export default FileUploadSection
