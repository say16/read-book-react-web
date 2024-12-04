import ThumbnailSection from '@/components/atoms/molecules/thumbnail-section'
import { IconLibraryPhoto } from '@tabler/icons-react'

function Aside() {
  return (
    <aside className='sticky top-0 z-30 flex h-[100dvh] w-28 flex-col overflow-hidden border-r'>
      <h5 className='flex flex-col items-center gap-1 border-b p-4 text-xs font-bold'>
        <IconLibraryPhoto />
        <span>Thumbnails</span>
      </h5>
      <ThumbnailSection />
    </aside>
  )
}

export default Aside
