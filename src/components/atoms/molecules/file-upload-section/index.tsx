import React from 'react'
import { useDispatch } from 'react-redux'
import { IconPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import db from '@/utils/dexie/db'
import { setSelectedFileId } from '@/store/slices/pdfViewerSlice'

function FileUploadSection() {
  const dispatch = useDispatch()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const id = await db.pdfFiles.add({ file })

      dispatch(setSelectedFileId(id))
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
