const fs = require('fs');
let code = fs.readFileSync('src/components/PdfExportModal.tsx', 'utf8');

code = code.replace(
  "대신 위의 [전체 전자책 인쇄] 버튼을 눌러 인쇄 다이얼로그의 'PDF로 저장' 기능을 사용해 보세요.",
  "브라우저 환경(CORS 등)에 의해 파일 생성이 차단되었을 수 있습니다."
);

fs.writeFileSync('src/components/PdfExportModal.tsx', code);
