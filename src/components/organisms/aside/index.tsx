import ThumbnailSection from '@/components/atoms/molecules/thumbnail-section'
import { IconLibraryPhoto } from '@tabler/icons-react'

function Aside() {
  return (
    <aside className='sticky top-0 z-30 flex h-[100dvh] w-48 flex-col overflow-hidden border-r'>
      <h2 className='inline-flex items-center gap-1 border-b p-4 text-lg font-bold'>
        <IconLibraryPhoto />
        <span>Thumbnails:</span>
      </h2>
      <ThumbnailSection />
    </aside>
  )
}

export default Aside
