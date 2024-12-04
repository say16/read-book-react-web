import { useDispatch, useSelector } from 'react-redux'
import db from '@/utils/dexie/db'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { IconHistory, IconPdf } from '@tabler/icons-react'
import { selectSelectedFileId, setSelectedFileId } from '@/store/slices/pdfViewerSlice'
import { useLiveQuery } from 'dexie-react-hooks'
import { selectIsHistoryDrawerOpen, setIsHistoryDrawerOpen } from '@/store/slices/themeSlice'
import { Drawer, DrawerContent } from '@/components/ui/drawer'

function HistorySection() {
  const dispatch = useDispatch()
  const selectedFileId = useSelector(selectSelectedFileId)
  const isHistoryDrawerOpen = useSelector(selectIsHistoryDrawerOpen)

  const uploadedFiles = useLiveQuery(() => db.pdfFiles.toArray())

  const handleFileSelect = id => {
    dispatch(setSelectedFileId(id))
  }

  const handleOnCloseDrawer = (e: boolean) => {
    dispatch(setIsHistoryDrawerOpen(e))
  }

  return (
    <Drawer direction='right' open={isHistoryDrawerOpen} onOpenChange={handleOnCloseDrawer}>
      <DrawerContent className='fixed right-0 top-0 z-50 h-full w-96 bg-background'>
        <div>
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
                      onMouseDown={() => handleFileSelect(item.id)}
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
      </DrawerContent>
    </Drawer>
  )
}

export default HistorySection
