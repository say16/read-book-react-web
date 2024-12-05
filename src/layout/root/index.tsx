import React, { ReactNode } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectSelectedFileId, setFileObjectUrl, setSelectedFileMetadata } from '@/store/slices/pdfViewerSlice'
import db from '@/utils/dexie/db'

interface RootLayoutProps {
  children: ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const dispatch = useDispatch()
  const selectedFileId = useSelector(selectSelectedFileId)

  const file = useLiveQuery(() => {
    return db.pdfFiles.get(selectedFileId || 0)
  }, [selectedFileId])?.file

  useEffect(() => {
    if (file) {
      dispatch(setFileObjectUrl(URL.createObjectURL(file)))

      const metadata = {
        id: selectedFileId || 0,
        type: file.type,
        name: file.name,
        size: file.size
      }
      dispatch(setSelectedFileMetadata(metadata))
    }
  }, [file])

  return <div className='mx-auto flex gap-4'>{children}</div>
}

export default RootLayout
