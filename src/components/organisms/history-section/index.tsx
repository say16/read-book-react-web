import { useDispatch, useSelector } from 'react-redux'
import db from '@/utils/dexie/db'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { IconHistory, IconPdf } from '@tabler/icons-react'
import { selectSelectedFileId, setSelectedFileId } from '@/store/slices/pdfViewerSlice'
import { useLiveQuery } from 'dexie-react-hooks'

function HistorySection() {
  const dispatch = useDispatch()
  const selectedFileId = useSelector(selectSelectedFileId)
  const uploadedFiles = useLiveQuery(() => db.pdfFiles.toArray())

  const handleFileSelect = id => {
    dispatch(setSelectedFileId(id))
  }

  return (
    <div className='sticky top-0 h-[100dvh] w-96 border-l'>
      <div className='flex size-full flex-col'>
        <h2 className='inline-flex items-center gap-1 border-b p-4 text-lg font-bold'>
          <IconHistory />
          <span>Uploaded Files:</span>
        </h2>
        <ScrollArea>
          {uploadedFiles?.length > 0 ? (
            <ul className='flex flex-col gap-2 p-4'>
              {uploadedFiles?.map(item => (
                <Button
                  key={item.id}
                  onClick={() => handleFileSelect(item.id)}
                  variant={item.id === selectedFileId ? 'default' : 'outline'}
                  className='h-full justify-start whitespace-normal text-start text-xs'
                >
                  <IconPdf />
                  <p>{item.file.name}</p>
                </Button>
              ))}
            </ul>
          ) : (
            <p className='p-4'>No files found in the database.</p>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}

export default HistorySection
