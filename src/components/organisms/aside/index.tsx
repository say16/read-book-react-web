import ThumbnailSection from '@/components/atoms/molecules/thumbnail-section'

function Aside() {
  return (
    <aside className='sticky top-4 z-30 h-screen w-fit'>
      <ThumbnailSection orientation='vertical' />
    </aside>
  )
}

export default Aside
