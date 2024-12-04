import { Button } from '@/components/ui/button'
import { selectIsHistoryDrawerOpen, setIsHistoryDrawerOpen } from '@/store/slices/themeSlice'
import { IconHistory } from '@tabler/icons-react'
import { useDispatch, useSelector } from 'react-redux'

function UploadedFilesButtonSection() {
  const dispatch = useDispatch()
  const isHistoryDrawerOpen = useSelector(selectIsHistoryDrawerOpen)

  const toggleFileHistoryDrawer = () => {
    dispatch(setIsHistoryDrawerOpen(isHistoryDrawerOpen ? false : true))
  }

  return (
    <Button variant='outline' onMouseDown={toggleFileHistoryDrawer}>
      <IconHistory />
      <span>File History</span>
    </Button>
  )
}

export default UploadedFilesButtonSection
