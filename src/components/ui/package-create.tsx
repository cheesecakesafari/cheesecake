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
        <DialogContent className={cn('dialog-content rounded-2xl max-w-2xl max-h-[90vh] overflow-hidden')}>
          <DialogHeader>
            <DialogTitle>Prepared Package ({items.length} destinations)</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">Review your selected destinations and share them with us.</DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <div className="space-y-3 overflow-y-auto max-h-[65vh] p-2">
              {items.map((p: any, idx: number) => (
              <div key={`${p.id}-${idx}`} className="p-3 border rounded-md bg-card/50">
                <div className="font-semibold">{idx+1}. {p.locationName || p.id}</div>
                <div className="text-sm text-muted-foreground">Days: {p.days || '-'} • Hotel: {p.hotelType || '-'}</div>
                {p.name && <div className="text-sm">Name: {p.name}</div>}
                {p.extra && <div className="text-sm mt-1">Notes: {p.extra}</div>}
              </div>
              ))}
            </div>

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
              <Button onClick={async () => {
                // Generate PDF and trigger download
                try {
                  // dynamic import to avoid adding to main bundle unnecessarily
                  const { jsPDF } = await import('jspdf');

                  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
                  const pageWidth = doc.internal.pageSize.getWidth();
                  const pageHeight = doc.internal.pageSize.getHeight();

                  // Load logo (favicon-new.ico) and convert to PNG via canvas if needed
                  let logoDataUrl: string | null = null;
                  try {
                    const res = await fetch('/favicon-new.ico');
                    const blob = await res.blob();
                    const dataUrl = await new Promise<string>((resolve, reject) => {
                      const fr = new FileReader();
                      fr.onload = () => resolve(fr.result as string);
                      fr.onerror = (e) => reject(e);
                      fr.readAsDataURL(blob);
                    });

                    // Draw into canvas to ensure PNG format
                    const img = new Image();
                    img.src = dataUrl;
                    await new Promise<void>((resolve, reject) => {
                      img.onload = () => resolve();
                      img.onerror = (e) => reject(e);
                    });
                    const canvas = document.createElement('canvas');
                    const scale = 1;
                    canvas.width = (img.naturalWidth || img.width) * scale;
                    canvas.height = (img.naturalHeight || img.height) * scale;
                    const ctx = canvas.getContext('2d');
                    if (ctx) ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    logoDataUrl = canvas.toDataURL('image/png');
                  } catch (e) {
                    // logoDataUrl stays null if any step fails
                    console.warn('Could not load favicon for PDF header', e);
                  }

                  let y = 40;
                  const margin = 40;

                  // Header: logo (if present) and titles
                  if (logoDataUrl) {
                    const imgW = 60;
                    const imgH = 60;
                    doc.addImage(logoDataUrl, 'PNG', margin, y, imgW, imgH);
                  }

                  doc.setFontSize(16);
                  doc.setFont(undefined, 'bold');
                  doc.text('CHEESECAKE SAFARIS LTD', pageWidth / 2, y + 20, { align: 'center' });
                  doc.setFontSize(12);
                  doc.setFont(undefined, 'normal');
                  doc.text('Your Custom made Package to kenya', pageWidth / 2, y + 40, { align: 'center' });

                  y += 90;

                  // Intro paragraphs
                  doc.setFontSize(10);
                  const introLines = [
                    'Choose a 4X4 Landcruiser from Our Car Pool to get Roadworth well mantained Car for Your Kenyan Trip',
                    'We also with Your Request help you Book Local Hotels [5star, Tented, Hotels] for Your Accommodations',
                    'We will facilitate local flight Bookings and make sure Your Schedule is strictly fullfilled'
                  ];
                  introLines.forEach(line => {
                    const split = doc.splitTextToSize(line, pageWidth - margin * 2);
                    doc.text(split, margin, y);
                    y += split.length * 12 + 6;
                  });

                  y += 6;

                  // Chosen locations
                  doc.setFontSize(12);
                  doc.setFont(undefined, 'bold');
                  doc.text('Chosen Locations:', margin, y);
                  y += 16;
                  doc.setFont(undefined, 'normal');

                  items.forEach((p: any, i: number) => {
                    const title = `${i + 1}. ${p.locationName || p.id}`;
                    const detail = `Days: ${p.days || '-'} • Hotel: ${p.hotelType || '-'}`;
                    const lines1 = doc.splitTextToSize(title, pageWidth - margin * 2);
                    doc.text(lines1, margin, y);
                    y += lines1.length * 12 + 2;
                    const lines2 = doc.splitTextToSize(detail, pageWidth - margin * 2);
                    doc.text(lines2, margin, y);
                    y += lines2.length * 12 + 2;
                    if (p.name) { const ln = doc.splitTextToSize(`Client: ${p.name}`, pageWidth - margin * 2); doc.text(ln, margin, y); y += ln.length * 12 + 2; }
                    if (p.extra) { const ln = doc.splitTextToSize(`Notes: ${p.extra}`, pageWidth - margin * 2); doc.text(ln, margin, y); y += ln.length * 12 + 6; }

                    if (y > pageHeight - 100) {
                      doc.addPage();
                      y = 40;
                    }
                  });

                  // Footer
                  doc.setFontSize(10);
                  doc.text('Powered by 4on4 group Limited', pageWidth / 2, pageHeight - 40, { align: 'center' });

                  doc.save('cheesecake-package.pdf');
                } catch (err) {
                  console.error('PDF generation failed', err);
                  // fallback: call provided onDownload for JSON
                  if (onDownload) onDownload();
                }

                setOpen(false);
              }}>
                <Download className="w-4 h-4 mr-2" /> DOWNLOAD AS FILE
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
