const fs = require('fs');
let code = fs.readFileSync('src/components/PdfExportModal.tsx', 'utf8');

code = code.replace(
  '브라우저의 고해상도 인쇄 다이얼로그를 통해 "PDF로 저장"을 선택하면 모든 챕터가 포함된 책 전체를 선명한 텍스트로 보관할 수 있습니다.',
  '전자책의 표지부터 모든 챕터 페이지까지 한 권의 온전한 PDF 파일로 렌더링하여 다운로드합니다. (페이지 수에 따라 약간의 시간이 소요될 수 있습니다)'
);

fs.writeFileSync('src/components/PdfExportModal.tsx', code);
