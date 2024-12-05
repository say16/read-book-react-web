import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectSelectedText, setSelectedText } from '@/store/slices/pdfViewerSlice'

const SentenceItemClickableWords = ({ sentence, sentenceIndex }) => {
  const dispatch = useDispatch()
  const selectedTextData = useSelector(selectSelectedText)

  const handleClick = (word, markId) => {
    dispatch(
      setSelectedText({
        id: markId,
        text: word.replace(/[^\w\s]|_/g, '').trim()
      })
    )
  }

  const renderedWords = useMemo(() => {
    return sentence.split(' ').map((word, wordIndex) => {
      const markId = `word-${sentenceIndex}-${wordIndex}`
      const isSelected = selectedTextData?.id === markId
      return (
        <span
          key={markId}
          id={markId}
          className={`me-1 inline-block cursor-pointer hover:bg-primary hover:text-primary-foreground ${
            isSelected ? 'bg-primary text-primary-foreground' : ''
          }`}
          onClick={() => handleClick(word, markId)}
        >
          {word}
        </span>
      )
    })
  }, [sentence, sentenceIndex, selectedTextData?.id, dispatch])

  return <>{renderedWords}</>
}

export default SentenceItemClickableWords
