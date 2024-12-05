import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectSelectedText, setSelectedText } from '@/store/slices/pdfViewerSlice'

function useMarkClick() {
  const dispatch = useDispatch()
  const selectedTextData = useSelector(selectSelectedText)

  useEffect(() => {
    const handleClick = event => {
      const target = event.target
      if (target.tagName === 'MARK') {
        const word = target.textContent
        dispatch(
          setSelectedText({
            id: target.id,
            text: word.replace(/[^\w\s]|_/g, '').trim()
          })
        )
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [dispatch])

  const customTextRenderer = useMemo(
    () =>
      ({ str, itemIndex }) => {
        return str
          .split(' ')
          .map((word, index) => {
            const markId = `word-${itemIndex}-${index}`
            const isSelected = selectedTextData?.id === markId
            return `<mark id="${markId}" class="text-black bg-white cursor-pointer hover:bg-primary hover:text-primary-foreground ${
              isSelected ? 'bg-primary text-primary-foreground' : ''
            }">${word}</mark>`
          })
          .join(' ')
      },
    [selectedTextData?.id]
  )

  return { customTextRenderer }
}

export default useMarkClick
