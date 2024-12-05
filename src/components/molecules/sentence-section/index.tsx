import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { selectSentences } from '@/store/slices/pdfViewerSlice'
import { IconBlockquote, IconTextGrammar } from '@tabler/icons-react'
import { useSelector } from 'react-redux'
import Flag from 'react-flagkit'

function SentenceSection() {
  const sentences = useSelector(selectSentences)

  return (
    <Card className='flex flex-1 flex-col'>
      <h2 className='inline-flex w-full items-center gap-1 border-b p-4 text-lg font-bold'>
        <IconBlockquote />
        <span>Sentences</span>
      </h2>
      {sentences?.[0] ? (
        <ScrollArea>
          <div className='flex-col divide-y-2 p-4 text-sm'>
            {sentences?.map((sentence, index) => (
              <div key={index} className='flex flex-col gap-1 py-2'>
                <div className='inline-flex gap-1'>
                  <Flag country='US' className='mt-0.5 inline-block size-4 rounded-full object-cover' />
                  <span>{sentence}</span>
                </div>
                <div className='inline-flex gap-1'>
                  <Flag country='TR' className='mt-0.5 inline-block size-4 rounded-full object-cover' />
                  <span>{sentence}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className='flex flex-col items-center justify-center gap-2 p-4 text-muted-foreground'>
          <IconTextGrammar className='size-8' />
          <p>No sentences found...</p>
        </div>
      )}
    </Card>
  )
}

export default SentenceSection
