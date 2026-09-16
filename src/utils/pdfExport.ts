import { jsPDF } from 'jspdf';
import { toJpeg } from 'html-to-image';

export interface PdfExportOptions {
  fileName?: string;
  onProgress?: (progress: number, message: string) => void;
}

/**
 * Capture an HTML element and download as a formatted PDF using html-to-image & jsPDF.
 */
export async function exportElementToPdf(
  elementId: string,
  options: PdfExportOptions = {}
): Promise<{ success: boolean; error?: string }> {
  const { fileName = 'insight-report-ebook.pdf', onProgress } = options;

  const targetEl = document.getElementById(elementId);
  if (!targetEl) {
    console.error(`Element with id #${elementId} not found.`);
    return { success: false, error: '캡처할 요소를 찾을 수 없습니다.' };
  }

  try {
    onProgress?.(15, '문서 레이아웃 렌더링 중...');

    // Wait for animations/charts to settle
    await new Promise((resolve) => setTimeout(resolve, 800));

    onProgress?.(60, 'PDF 페이지 생성 중...');
    
    // High quality canvas render using html-to-image 
    // This perfectly supports modern CSS functions like oklch()
    const imgData = await toJpeg(targetEl, {
      quality: 0.95,
      pixelRatio: 2, // High DPI
      backgroundColor: '#ffffff',
      fontEmbedCSS: '',
    });

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Scale image to fit A4 Landscape nicely
    // pixelRatio is 2, so the actual image dimensions are double the element dimensions
    const imgWidth = targetEl.offsetWidth * 2;
    const imgHeight = targetEl.offsetHeight * 2;

    if (!imgWidth || !imgHeight) throw new Error('화면 렌더링에 실패했습니다 (크기가 0입니다).');

    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    
    // Centered placement
    const renderWidth = imgWidth * ratio;
    const renderHeight = imgHeight * ratio;
    const posX = (pdfWidth - renderWidth) / 2;
    const posY = (pdfHeight - renderHeight) / 2;

    pdf.addImage(imgData, 'JPEG', posX, posY, renderWidth, renderHeight);
    
    onProgress?.(90, '파일 다운로드 준비 중...');
    
    try {
      pdf.save(fileName);
    } catch (saveErr) {
      console.warn('Direct download blocked (likely iframe sandbox). Opening in new tab...', saveErr);
      const blob = pdf.output('blob');
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, '_blank');
    }

    onProgress?.(100, '완료!');
    return { success: true };
  } catch (err: any) {
    console.error('PDF export failed:', err);
    const errorMessage = err?.message || String(err);
    
    return { success: false, error: errorMessage };
  }
}

/**
 * Trigger native high-resolution browser print dialog (useful for printing all pages)
 */
export function triggerPrintDialog(): void {
  window.print();
}

/**
 * Capture multiple pages and export as a single PDF document.
 */
export async function exportFullBookToPdf(
  options: PdfExportOptions = {}
): Promise<{ success: boolean; error?: string }> {
  const { fileName = 'insight-report-full-book.pdf', onProgress } = options;

  const pages = Array.from(document.querySelectorAll('.pdf-export-page')) as HTMLElement[];
  if (!pages.length) {
    return { success: false, error: '출력할 페이지를 찾을 수 없습니다.' };
  }

  try {
    onProgress?.(10, '전체 페이지 분석 및 렌더링 준비 중...');
    
    // Wait for images/charts
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const pdf = new jsPDF({
      orientation: 'portrait', // Assuming A4 portrait for books
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    for (let i = 0; i < pages.length; i++) {
      const pageEl = pages[i];
      onProgress?.(15 + Math.floor((i / pages.length) * 70), `페이지 렌더링 중... (${i + 1}/${pages.length})`);

      const imgData = await toJpeg(pageEl, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      fontEmbedCSS: '',
      });

      const imgWidth = pageEl.offsetWidth * 2;
      const imgHeight = pageEl.offsetHeight * 2;

      if (!imgWidth || !imgHeight) throw new Error(`페이지 ${i+1} 렌더링에 실패했습니다 (크기가 0입니다).`);

      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
      const renderWidth = imgWidth * ratio;
      const renderHeight = imgHeight * ratio;
      const posX = (pdfWidth - renderWidth) / 2;
      const posY = (pdfHeight - renderHeight) / 2;

      if (i > 0) {
        pdf.addPage();
      }
      
      pdf.addImage(imgData, 'JPEG', posX, posY, renderWidth, renderHeight);
    }

    onProgress?.(90, '파일 다운로드 준비 중...');
    
    try {
      pdf.save(fileName);
    } catch (saveErr) {
      console.warn('Direct download blocked (likely iframe sandbox). Opening in new tab...', saveErr);
      const blob = pdf.output('blob');
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, '_blank');
    }

    onProgress?.(100, '완료!');
    return { success: true };
  } catch (err: any) {
    console.error('Full PDF export failed:', err);
    return { success: false, error: err?.message || String(err) };
  }
}
