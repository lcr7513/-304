const fs = require('fs');
let code = fs.readFileSync('src/components/PdfExportModal.tsx', 'utf8');

// replace exportElementToPdf import to include exportFullBookToPdf
code = code.replace(
  "import { exportElementToPdf, triggerPrintDialog } from '../utils/pdfExport';",
  "import { exportElementToPdf, exportFullBookToPdf, triggerPrintDialog } from '../utils/pdfExport';"
);

// find handlePrintAll function
const handlePrintAllRegex = /const handlePrintAll = \(\) => \{[\s\S]*?\};/;
const newHandlePrintAll = `
  const handlePrintAll = async () => {
    setIsExporting(true);
    setStatus('idle');
    setProgressMsg('전체 페이지를 분석 중입니다...');
    
    const fileName = \`\${book.title}_전체.pdf\`.replace(/[\\\\/:*?"<>|]/g, '_');
    
    const result = await exportFullBookToPdf({
      fileName,
      onProgress: (_prog, msg) => setProgressMsg(msg),
    });
    
    setIsExporting(false);
    
    if (result.success) {
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        onClose();
      }, 1500);
    } else {
      setStatus('error');
      setErrorMessage(result.error || '알 수 없는 오류');
    }
  };
`;
code = code.replace(handlePrintAllRegex, newHandlePrintAll);

fs.writeFileSync('src/components/PdfExportModal.tsx', code);
