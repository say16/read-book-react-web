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

function DeleteItemSection({ item }) {
  const handleDelete = async () => {
    await db.pdfFiles.delete(item.id)
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button size='icon' variant='ghost'>
            <IconTrash className='text-destructive' />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              <p className='text-destructive'>Delete "{item.file.name}"</p>
              <p className='mt-2'>
                This action cannot be undone. This will permanently delete this file from the database.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default DeleteItemSection
