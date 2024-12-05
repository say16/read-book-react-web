import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectSelectedText, setSelectedText } from '@/store/slices/pdfViewerSlice'

function useMarkClickListener() {
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

        if (selectedTextData?.id === target.id) {
          target.classList.add('bg-primary', 'text-primary-foreground')
        }
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [dispatch, selectedTextData])
}

export default useMarkClickListener
