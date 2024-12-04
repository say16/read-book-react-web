import { useDispatch, useSelector } from 'react-redux'
import db from '@/utils/dexie/db'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { IconHistory, IconPdf } from '@tabler/icons-react'
import { selectSelectedFileId, setSelectedFileId } from '@/store/slices/pdfViewerSlice'
import { useLiveQuery } from 'dexie-react-hooks'
import { selectIsHistoryDrawerOpen, setIsHistoryDrawerOpen } from '@/store/slices/themeSlice'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import DeleteItemSection from './delete-item-section'
import DeleteAllSection from './delete-all-section'

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
      <DrawerContent className='fixed right-0 top-0 z-50 h-full w-fit min-w-96 max-w-[40rem] bg-background'>
        <div>
          <div className='flex size-full flex-col'>
            <div className='flex items-center justify-between border-b p-4'>
              <h2 className='inline-flex items-center gap-1 text-lg font-bold'>
                <IconHistory />
                <span>Uploaded Files</span>
              </h2>
              {uploadedFiles?.length > 0 && <DeleteAllSection />}
            </div>
            <ScrollArea>
              {uploadedFiles?.length > 0 ? (
                <ul className='flex flex-col gap-2 p-4'>
                  {uploadedFiles?.map(item => (
                    <div className='flex items-center gap-1'>
                      <Button
                        key={item.id}
                        onMouseDown={() => handleFileSelect(item.id)}
                        variant={item.id === selectedFileId ? 'default' : 'outline'}
                        className='h-full flex-1 justify-start whitespace-normal text-start text-xs'
                      >
                        <IconPdf />
                        <p>{item.file.name}</p>
                      </Button>
                      <DeleteItemSection item={item} />
                    </div>
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
