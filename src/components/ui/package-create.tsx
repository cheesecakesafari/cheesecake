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
        className="fixed top-1/2 right-6 z-50 bg-emerald-500 text-white p-4 rounded-full shadow-xl flex items-center justify-center w-24 h-24 transform -translate-y-1/2"
        aria-label="Open package create"
      >
        {imageAvailable ? (
          <img
            src="/lovable-uploads/SAFARI.jpeg"
            alt="Package"
            className="object-contain"
            style={{ width: '72px', height: '72px' }}
            onError={() => setImageAvailable(false)}
          />
        ) : (
          <Mail style={{ width: 54, height: 54 }} />
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
                try {
                  const { jsPDF } = await import('jspdf');
                  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
                  const pageWidth = doc.internal.pageSize.getWidth();
                  const pageHeight = doc.internal.pageSize.getHeight();
                  const margin = 40;
                  let y = margin;

                  // Load logo from lovable-uploads
                  let logoDataUrl: string | null = null;
                  try {
                    const res = await fetch('/lovable-uploads/LOGO CHEESECAKE.png');
                    const blob = await res.blob();
                    const dataUrl = await new Promise<string>((resolve, reject) => {
                      const fr = new FileReader();
                      fr.onload = () => resolve(fr.result as string);
                      fr.onerror = (e) => reject(e);
                      fr.readAsDataURL(blob);
                    });
                    const img = new Image();
                    img.src = dataUrl;
                    await new Promise<void>((resolve, reject) => { img.onload = () => resolve(); img.onerror = () => reject(); });
                    const canvas = document.createElement('canvas');
                    // scale down large logos to reasonable size for PDF header
                    const maxDim = 120;
                    const ratio = Math.min(1, maxDim / (img.naturalWidth || img.width));
                    canvas.width = Math.round((img.naturalWidth || img.width) * ratio);
                    canvas.height = Math.round((img.naturalHeight || img.height) * ratio);
                    const ctx = canvas.getContext('2d');
                    if (ctx) ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    logoDataUrl = canvas.toDataURL('image/png');
                  } catch (e) {
                    console.warn('Could not load logo for PDF', e);
                  }

                  // Header
                  if (logoDataUrl) {
                    const imgW = 80; const imgH = 80;
                    doc.addImage(logoDataUrl, 'PNG', margin, y, imgW, imgH);
                  }
                  doc.setFontSize(16);
                  doc.setFont('times', 'bold');
                  doc.text('CHEESECAKE SAFARIS LTD', pageWidth / 2, y + 18, { align: 'center' });
                  doc.setFontSize(10);
                  doc.setFont('times', 'normal');
                  doc.text('Your Custom made Package to kenya', pageWidth / 2, y + 34, { align: 'center' });

                  y += 72;

                  // Contact info
                  doc.setFontSize(9);
                  doc.text('Tel/WhatsApp: 0710622549 | 0727422000', pageWidth / 2, y, { align: 'center' });
                  y += 12;
                  doc.text('Email: cheesecakesafari@gmail.com', pageWidth / 2, y, { align: 'center' });

                  y += 18;

                  // Intro paragraph about services and budget
                  doc.setFontSize(10);
                  const intro = 'We also help to prepare a full safari budget upon request at your budget limits. Otherwise, we have comprehensive packages already tallied.';
                  const introLines = doc.splitTextToSize(intro, pageWidth - margin * 2);
                  doc.text(introLines, margin, y);
                  y += introLines.length * 12 + 14;

                  // Centered subject title
                  doc.setFont('helvetica', 'bold');
                  doc.setFontSize(11);
                  doc.text('BELOW IS YOUR CUSTOM SAFARI', pageWidth / 2, y, { align: 'center' });
                  y += 16;

                  // Subheaders (left aligned with title label and content)
                  const sections = [
                    { title: 'CARS', content: 'Choose a 4X4 Landcruiser from Our Car Pool to get Roadworth well mantained Car for Your Kenyan Trip' },
                    { title: 'HOTELS AND TENTED CAMPS', content: 'With your request, we will help you book local hotels [5star, Tented, Hotels] for your accommodations and hotel transfers' },
                    { title: 'LOCAL FLIGHTS', content: 'If you prefer to use local flights, Cheesecake Safaris in partnership with local flight authorities, we help you book and schedule flights and adjust schedules' },
                    { title: 'BUDGET', content: 'For your custom made packages, we will prepare a full breakdown of the total budget for all amenities/activities that your safari would entail.' }
                  ];

                  sections.forEach(sec => {
                    doc.setFont('times', 'bold');
                    doc.setFontSize(11);
                    const label = `${sec.title}:`;
                    doc.text(label, margin, y);
                    y += 14; // skip line after subheader
                    const wrapped = doc.splitTextToSize(sec.content, pageWidth - margin * 2);
                    doc.setFont('times', 'normal');
                    doc.setFontSize(10);
                    doc.text(wrapped, margin, y);
                    y += (wrapped.length * 12) + 12;
                    if (y > pageHeight - 120) { doc.addPage(); y = margin; }
                  });

                  // Custom safari destination centred title
                  doc.setFont('times', 'bold');
                  doc.setFontSize(11);
                  doc.text('YOUR CUSTOM SAFARI DESTINATION AND DURATION IS AS FOLLOWS', pageWidth / 2, y, { align: 'center' });
                  y += 16;

                  // List chosen locations left-aligned with better spacing
                  doc.setFont('times', 'normal');
                  doc.setFontSize(10);
                  items.forEach((p: any, i: number) => {
                    const title = `${i + 1}. ${p.locationName || p.id} — ${p.days || '-'} days`;
                    const detail = `${p.hotelType || ''}${p.name ? ' • Client: ' + p.name : ''}`;
                    const titleLines = doc.splitTextToSize(title, pageWidth - margin * 2);
                    doc.text(titleLines, margin, y);
                    y += titleLines.length * 13 + 4;
                    if (detail.trim()) {
                      const detLines = doc.splitTextToSize(detail, pageWidth - margin * 2);
                      doc.text(detLines, margin + 10, y);
                      y += detLines.length * 12 + 6;
                    }
                    if (p.extra) { const notes = doc.splitTextToSize('Notes: ' + p.extra, pageWidth - margin * 2); doc.text(notes, margin + 10, y); y += notes.length * 12 + 8; }
                    if (y > pageHeight - 120) { doc.addPage(); y = margin; }
                  });

                  // Footer
                  doc.setFontSize(10);
                  doc.setFont('helvetica', 'normal');
                  doc.text('Powered by 4on4 group Limited', pageWidth / 2, pageHeight - 40, { align: 'center' });

                  doc.save('cheesecake-package.pdf');
                } catch (err) {
                  console.error('PDF generation failed', err);
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
