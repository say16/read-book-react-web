import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { IconLanguage, IconTransfer } from '@tabler/icons-react'
import { useSelector } from 'react-redux'
import { selectSelectedText } from '@/store/slices/pdfViewerSlice'
import { ScrollArea } from '@/components/ui/scroll-area'

function DictionaryInfoSection() {
  const [wordData, setWordData] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const selectedText = useSelector(selectSelectedText)

  const translateText = async text => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${text}`

    try {
      const response = await fetch(url, { method: 'GET' })

      if (!response.ok) {
        throw new Error('API hatası')
      }

      const data = await response.json()
      setWordData(data[0])
      setErrorMessage('')
    } catch (error) {
      console.error('Çeviri hatası:', error)
      setWordData(null)
      setErrorMessage('Veri alınamadı veya çeviri başarısız oldu.')
    }
  }

  useEffect(() => {
    if (selectedText?.text) {
      translateText(selectedText.text)
    } else {
      setWordData(null)
    }
  }, [selectedText])

  return (
    <Card className='flex flex-1 flex-col'>
      <h2 className='inline-flex w-full items-center gap-1 border-b p-4 text-lg font-bold'>
        <IconLanguage />
        <span>Dictionary</span>
      </h2>
      <ScrollArea>
        <div className='flex flex-col gap-2 p-4'>
          <div className='flex flex-wrap items-center gap-2'>
            <p className='font-semibold'>Seçilen Metin:</p>
            <p>{selectedText?.text || 'Henüz metin seçilmedi.'}</p>
          </div>
          <div className='flex flex-wrap items-center gap-2'>
            <IconTransfer />
          </div>

          {errorMessage && <p className='text-destructive'>{errorMessage}</p>}

          {wordData ? (
            <div className='flex flex-col gap-4'>
              <div>
                <h3 className='font-semibold'>Fonetikler:</h3>
                {wordData.phonetics.length > 0 ? (
                  wordData.phonetics.map((phonetic, index) => (
                    <div key={index} className='flex flex-col gap-1'>
                      {phonetic.text && <p>Metin: {phonetic.text}</p>}
                      {phonetic.audio && (
                        <audio controls>
                          <source src={phonetic.audio} type='audio/mpeg' />
                          Tarayıcınız ses dosyasını desteklemiyor.
                        </audio>
                      )}
                    </div>
                  ))
                ) : (
                  <p>Bulunamadı.</p>
                )}
              </div>

              <div>
                <h3 className='font-semibold'>Anlamlar:</h3>
                {wordData.meanings.length > 0 ? (
                  wordData.meanings.map((meaning, index) => (
                    <div key={index} className='flex flex-col gap-1'>
                      <p>Tür: {meaning.partOfSpeech}</p>
                      {meaning.definitions.map((definition, defIndex) => (
                        <div key={defIndex} className='ml-4'>
                          <p>Tanım: {definition.definition}</p>
                          {definition.example && <p>Örnek: {definition.example}</p>}
                        </div>
                      ))}
                    </div>
                  ))
                ) : (
                  <p>Bulunamadı.</p>
                )}
              </div>

              {wordData.synonyms && wordData.synonyms.length > 0 && (
                <div>
                  <h3 className='font-semibold'>Eşanlamlılar:</h3>
                  <p>{wordData.synonyms.join(', ')}</p>
                </div>
              )}

              {wordData.antonyms && wordData.antonyms.length > 0 && (
                <div>
                  <h3 className='font-semibold'>Zıt Anlamlılar:</h3>
                  <p>{wordData.antonyms.join(', ')}</p>
                </div>
              )}

              <div>
                <h3 className='font-semibold'>Kaynaklar:</h3>
                {wordData.sourceUrls.map((url, index) => (
                  <p key={index}>
                    <a href={url} target='_blank' rel='noopener noreferrer' className='text-blue-500 underline'>
                      {url}
                    </a>
                  </p>
                ))}
              </div>
            </div>
          ) : (
            !errorMessage && <p>Henüz çeviri yapılmadı.</p>
          )}
        </div>
      </ScrollArea>
    </Card>
  )
}

export default DictionaryInfoSection
