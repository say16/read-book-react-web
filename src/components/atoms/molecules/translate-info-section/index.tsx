import { IconArrowRight, IconLanguage } from '@tabler/icons-react'

function TranslateInfoSection() {
  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      <IconLanguage />
      <div className='flex items-center justify-center gap-1'>
        EN <IconArrowRight className='size-4' /> TR
      </div>
    </div>
  )
}

export default TranslateInfoSection
