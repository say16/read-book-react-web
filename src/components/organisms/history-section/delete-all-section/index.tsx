import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { IconTrash } from '@tabler/icons-react'
import db from '@/utils/dexie/db'

function DeleteAllSection() {
  const handleDeleteAll = async () => {
    await db.pdfFiles.clear()
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant='destructive' size='sm'>
            <IconTrash />
            Delete All Files
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              <p className='text-destructive'>This will delete all files from the database.</p>
              <p className='mt-2'>This action cannot be undone. Once deleted, all data will be permanently removed.</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAll}>Delete All</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default DeleteAllSection
