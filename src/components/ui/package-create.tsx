import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Mail, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PackageCreateProps {
  items: any[];
  onEmail: () => void;
  onDownload: () => void;
  onClear?: () => void;
}

export default function PackageCreate({ items, onEmail, onDownload, onClear }: PackageCreateProps) {
  const [open, setOpen] = React.useState(false);

  if (!items || items.length === 0) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-white p-3 rounded-full shadow-xl flex items-center justify-center w-12 h-12"
        aria-label="Open package create"
      >
        <Mail className="w-5 h-5" />
        <span className="sr-only">Open package</span>
        <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{items.length}</span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={cn('dialog-content rounded-2xl max-w-2xl')}>
          <DialogHeader>
            <DialogTitle>Prepared Package ({items.length} destinations)</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">Review your selected destinations and share them with us.</DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-3">
            {items.map((p: any, idx: number) => (
              <div key={`${p.id}-${idx}`} className="p-3 border rounded-md bg-card/50">
                <div className="font-semibold">{idx+1}. {p.locationName || p.id}</div>
                <div className="text-sm text-muted-foreground">Days: {p.days || '-'} • Hotel: {p.hotelType || '-'}</div>
                {p.name && <div className="text-sm">Name: {p.name}</div>}
                {p.extra && <div className="text-sm mt-1">Notes: {p.extra}</div>}
              </div>
            ))}

            <div className="flex gap-3 justify-end mt-4">
              {onClear && <Button variant="ghost" onClick={() => { onClear(); setOpen(false); }}>Clear</Button>}
              <Button onClick={() => { onEmail(); setOpen(false); }}>
                <Mail className="w-4 h-4 mr-2" /> Email
              </Button>
              <Button onClick={() => { onDownload(); setOpen(false); }}>
                <Download className="w-4 h-4 mr-2" /> Download JSON
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
