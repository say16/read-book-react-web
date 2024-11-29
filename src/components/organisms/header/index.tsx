import { Card } from '@/components/ui/card'
import FileUploadSection from './file-upload-section'
import PageNumberSection from './page-number-section'

function Header() {
  return (
    <header>
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
