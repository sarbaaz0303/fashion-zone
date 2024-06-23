import { PlusIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import AddClientForm from './add-client-form';
import { ScrollArea } from '../ui/scroll-area';

export default function ClientHeader() {
  return (
    <Card className='m-4'>
      <CardHeader className='flex-row items-center justify-between p-4'>
        <CardTitle>Client</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className=' h-6 w-6' />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className='w-11/12'>
            <ScrollArea className='h-96 w-full sm:h-full'>
              <AddClientForm />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </CardHeader>
    </Card>
  );
}
