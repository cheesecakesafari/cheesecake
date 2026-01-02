import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Mail, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PackageCreateProps {
  items: any[];
  onEmail?: () => void;
  onDownload: () => void;
  onClear?: () => void;
}

export default function PackageCreate({ items, onEmail, onDownload, onClear }: PackageCreateProps) {
  const [open, setOpen] = React.useState(false);
  const [imageAvailable, setImageAvailable] = React.useState(true);

  if (!items || items.length === 0) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-1/2 right-6 z-50 bg-emerald-500 text-white p-4 rounded-full shadow-xl flex items-center justify-center w-16 h-16 transform -translate-y-1/2"
        aria-label="Open package create"
      >
        {imageAvailable ? (
          <img
            src="/lovable-uploads/SAFARI.jpeg"
            alt="Package"
            className="w-8 h-8 object-contain"
            onError={() => setImageAvailable(false)}
          />
        ) : (
          <Mail className="w-6 h-6" />
        )}
        <span className="sr-only">Open package</span>
        <span className="absolute -right-2 -top-2 bg-rose-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full">{items.length}</span>
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
              <Button onClick={() => {
                // Build Gmail compose URL and open in new tab
                const to = 'cheesecakesafari@gmail.com';
                const subject = 'PREPARE THIS PACKAGE FOR MY KENYAN TRIP';
                let body = 'Please prepare this package for my Kenyan trip.\n\n';
                items.forEach((p: any, i: number) => {
                  body += `${i+1}. ${p.locationName || p.id} - ${p.days || ''} days - ${p.hotelType || ''}\n`;
                  if (p.name) body += `   Client: ${p.name}\n`;
                  if (p.extra) body += `   Notes: ${p.extra}\n`;
                  body += '\n';
                });
                const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&tf=1`;
                window.open(url, '_blank');
                // call optional parent handler
                if (onEmail) onEmail();
                setOpen(false);
              }}>
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
