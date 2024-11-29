import FileUploadSection from '@/components/atoms/molecules/file-upload-section'
import PageNumberSection from '@/components/atoms/molecules/page-number-section'
import { Card } from '@/components/ui/card'

function Header() {
  return (
    <header className='sticky top-4 z-30'>
      <Card className='p-4'>
        <div className='flex items-end justify-between gap-4'>
          <PageNumberSection />
          <FileUploadSection />
        </div>
      </Card>
    </header>
  )
}

export default Header
