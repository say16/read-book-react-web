import FileUploadSection from '@/components/molecules/file-upload-section'
import PageNumberSection from '@/components/molecules/page-number-section'
import { Card } from '@/components/ui/card'
import UploadedFilesButtonSection from './uploaded-files-button-section'
import { ModeToggle } from '@/components/molecules/mode-toggle'

function Header() {
  return (
    <header className='sticky top-4 z-30'>
      <Card className='p-4'>
        <div className='flex items-end justify-between gap-4'>
          <PageNumberSection />
          <div className='flex items-center justify-end gap-4'>
            <ModeToggle />
            <UploadedFilesButtonSection />
            <FileUploadSection />
          </div>
        </div>
      </Card>
    </header>
  )
}

export default Header
