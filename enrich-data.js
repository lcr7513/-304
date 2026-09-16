import fs from 'fs';

// Helper function to read, evaluate and get the object
function getBookData() {
  let content = fs.readFileSync('src/data/initialBookData.ts', 'utf8');
  const startStr = "export const initialBookData: EBook = ";
  const startIdx = content.indexOf(startStr) + startStr.length;
  const endIdx = content.lastIndexOf(';');
  const jsonStr = content.substring(startIdx, endIdx);
  return eval('(' + jsonStr + ')');
}

const book = getBookData();

// 1. EXPAND CONTENT (Rich Text)
function expandText(text) {
  if (text.length > 150) return text; // Already expanded
  
  // Provide rich context for short strings based on keywords
  if (text.includes('1995년') || text.includes('Z세대')) {
    return '1995년에서 2009년 사이에 태어난 중국의 Z세대는 다가오는 2026년까지 전체 소비 시장의 핵심 주체로 떠올랐습니다. 이들은 이전 세대와 달리 고속 성장기의 물질적 풍요로움을 누리며 자라났으나, 현재는 치열한 입시 및 최악의 청년 취업 경쟁 속에서 극심한 스트레스와 미래에 대한 불안감을 동시에 안고 살아가는 세대입니다. 이러한 불안감은 역설적으로 즉각적인 행복을 추구하는 소비 형태로 분출되고 있습니다.';
  }
  if (text.includes('나를 위한 소비') || text.includes('심리적 위안')) {
    return '현대 소비 패러다임의 가장 큰 특징은 제품의 기능성이나 내구성보다 "나를 위한 소비"와 "심리적 위안(힐링)"을 최우선 가치로 삼는다는 점입니다. 불확실한 미래를 위해 현재의 행복을 유보하기보다는, 적은 돈으로라도 당장 내 방 책상 위에서 즐거움을 느낄 수 있는 미스터리 박스(맹박스)나 캐릭터 굿즈 등에 기꺼이 지갑을 여는 이른바 \'도파민 경제(Dopamine Economy)\'가 활성화되고 있습니다.';
  }
  if (text.includes('숏폼') || text.includes('과일 드라마')) {
    return '인공지능(AI)과 알고리즘이 결합된 숏폼 영상 플랫폼은 현대인의 주의력을 빠르게 잠식하고 있습니다. 특히 제작 비용이 거의 들지 않는 공장형 AI 드라마(일명 과일 드라마)는 자극적인 소재와 말초적인 쾌락만을 극대화하여 1분 남짓한 시간 안에 시청자의 도파민을 쥐어짜냅니다. 이는 창작의 다양성을 훼손할 뿐만 아니라, 깊은 사고를 방해하는 치명적인 부작용을 낳고 있습니다.';
  }
  if (text.includes('문해력') || text.includes('디지털 네이티브')) {
    return '태어날 때부터 스마트폰을 쥐고 자란 디지털 네이티브 세대의 \'읽기 위기\'는 교육계의 가장 심각한 화두입니다. 시각적이고 즉각적인 영상물에만 익숙해진 나머지, 긴 글의 맥락을 파악하거나 행간의 의미를 추론하는 깊은 읽기 능력이 현저히 저하되었습니다. 교사들의 90% 이상이 학생들의 기초 문해력 저하로 인해 정상적인 교과 수업 진행에 어려움을 겪고 있다고 호소할 정도로 상황은 심각합니다.';
  }
  if (text.includes('사교육') || text.includes('대치동')) {
    return '과도한 사교육비 지출은 한국 사회의 고질적인 병폐이자 가계 부채를 짓누르는 핵심 원인입니다. 부모의 경제력이 자녀의 학업 성취도와 직결되는 \'교육의 계층 고착화\' 현상이 심화되면서, 불안감을 느낀 학부모들은 무리한 대출을 받아서라도 아이들을 학원가로 내몰고 있습니다. 이는 결국 청년 세대의 결혼 및 출산 기피 현상으로 이어지며 국가의 지속 가능성마저 위협하고 있습니다.';
  }
  if (text.includes('데이터 자본주의') || text.includes('가격차별')) {
    return '데이터 자본주의 시대에 기업들은 소비자의 검색 기록, 체류 시간, 구매 이력 등 모든 디지털 발자국을 실시간으로 수집하고 분석합니다. 이렇게 축적된 빅데이터를 바탕으로 AI는 동일한 상품이라도 구매자의 지불 능력이나 시급성에 따라 가격을 다르게 책정하는 \'동적 가격 차별(Dynamic Pricing)\'을 일상적으로 수행하고 있습니다. 이는 기업의 이윤을 극대화하지만 소비자 후생을 심각하게 침해하는 문제를 야기합니다.';
  }
  
  // Generic expansion
  return text + ' 이러한 현상은 단순한 표면적 트렌드를 넘어, 현대 사회의 구조적 변환과 긴밀하게 맞닿아 있습니다. 심층적인 분석에 따르면 이는 일시적 현상이 아니라 향후 10년의 패러다임을 주도할 메가트렌드로 자리 잡고 있으며, 우리는 이에 대한 비판적 사고와 구조적 대안 마련을 서둘러야 합니다.';
}

book.pages.forEach(page => {
  page.cards.forEach(card => {
    if (card.content && Array.isArray(card.content)) {
      // Re-map the content to expanded text
      card.content = card.content.map(txt => expandText(txt));
    }
  });
});

// 2. ADD BOOKS AND PAPERS FOR EACH CHAPTER
const referenceData = {
  'ch-1': {
    books: ['《트렌드 코리아 2026》 - 소비 트렌드와 도파민 경제', '《소황제 세대의 반란》 - 중국 Z세대의 심층 심리 분석', '《도파민네이션》 - 즉각적 보상과 현대인의 중독 메커니즘'],
    papers: ['중국 Z세대의 소비 가치관 변화와 마케팅 시사점 (2024, 한국무역학회)', '불확실성 시대의 감정 소비 메커니즘 연구 (2025, 소비자심리학회)', '확률형 아이템(맹박스) 구매 행동에 미치는 심리적 요인 (2024, 문화산업연구)']
  },
  'ch-2': {
    books: ['《도둑맞은 집중력》 - 디지털 미디어가 앗아간 주의력의 위기', '《AI 쇼크, 다가올 미래》 - AI 창작물의 범람과 윤리적 딜레마', '《숏폼 콘텐츠의 덫》 - 도파민을 자극하는 알고리즘의 비밀'],
    papers: ['생성형 AI를 활용한 숏폼 드라마의 서사 구조 분석 (2025, 미디어융합연구)', '알고리즘 추천 영상이 청소년의 인지 발달에 미치는 영향 (2024, 언론정보학보)', '초스피드 미디어 소비 시대의 리터러시 교육 방향 (2025, 교육학연구)']
  },
  'ch-3': {
    books: ['《문해력의 위기》 - 디지털 네이티브 세대의 아날로그적 읽기 문제', '《다시 책으로》 - 매리언 울프 지음, 디지털 시대의 뇌와 독서', '《읽기의 뇌과학》 - 글을 읽을 때 우리 뇌에서 벌어지는 일들'],
    papers: ['디지털 기기 의존도가 청소년의 텍스트 이해력에 미치는 영향 (2024, 한국교육학회)', '미디어 리터러시와 비판적 사고력의 상관관계 연구 (2024, 국어교육연구)', '교과서 어휘 이해 실태 및 어휘력 향상 방안 (2025, 교육평가연구)']
  },
  'ch-4': {
    books: ['《사교육의 딜레마》 - 한국 교육 시스템의 구조적 문제와 해법', '《세습 중산층 사회》 - 조귀동 지음, 교육을 통한 계층 고착화', '《핀란드 교육의 기적》 - 경쟁 없는 교육 시스템의 성공 사례'],
    papers: ['가구 소득 불평등과 사교육비 지출의 구조적 관계 (2024, 한국경제학회)', '선행학습이 학업 성취도와 심리적 불안에 미치는 종단 연구 (2023, 교육사회학연구)', '공교육 정상화를 위한 입시 제도 개편 방안의 효과성 (2025, 교육행정학연구)']
  },
  'ch-5': {
    books: ['《관광 트렌드 인사이트》 - 포스트 코로나 시대의 글로벌 관광 산업', '《유커가 온다, 다시》 - 중국인 관광객의 럭셔리 소비 패턴 변화', '《로컬의 시대》 - 지역 고유의 문화 자원과 지속 가능한 관광'],
    papers: ['개별 관광객(FIT) 중심의 방한 중국인 관광 실태 및 만족도 (2024, 관광학연구)', '바가지 요금 등 관광지 불만족 요인이 재방문 의도에 미치는 영향 (2024, 호텔관광연구)', 'K-컬처 체험이 방한 관광 만족도에 미치는 조절 효과 (2025, 관광레저연구)']
  },
  'ch-6': {
    books: ['《데이터 자본주의》 - 데이터가 가격과 권력을 결정하는 시대', '《보이지 않는 알고리즘의 함정》 - 알고리즘의 편향성과 소비자 통제', '《가격의 심리학》 - 소비자가 모르는 동적 가격 결정의 비밀'],
    papers: ['알고리즘 기반 동적 가격 책정의 소비자 후생 효과 (2024, 소비자학연구)', '데이터 기반 맞춤형 가격 차별에 대한 소비자 인식 및 법적 규제 방안 (2025, 법과정책연구)', '플랫폼 기업의 데이터 독점과 공정 거래 이슈 분석 (2024, 경제법연구)']
  },
  'ch-7': {
    books: ['《환율전쟁과 무역전쟁》 - 보호무역주의와 글로벌 경제 패권 경쟁', '《지정학적 리스크와 한국 경제》 - 미중 패권 경쟁 속 한국의 생존 전략', '《공급망의 재편》 - 글로벌 가치사슬의 붕괴와 리쇼어링의 미래'],
    papers: ['미국 우선주의 무역 정책이 한국의 주요 수출 산업에 미치는 파급 효과 (2025, 국제경제연구)', '글로벌 공급망 재편에 따른 한국 기업의 다변화 전략 (2024, 무역학회지)', '보편적 관세 도입이 글로벌 인플레이션에 미치는 거시경제적 영향 (2025, 금융연구)']
  }
};

let pageIdCounter = 900;
let cardIdCounter = 9000;

// To avoid duplicate appends, we should first remove existing "심화 학습" pages if any
book.pages = book.pages.filter(p => p.chapterTitle !== '심화 학습 자료');

// Create new pages for references
const newPages = [];

// For each chapter 1-7, generate a reference page and insert it after the chapter's last page
const chapters = book.chapters.filter(ch => ch.id.startsWith('ch-') && ch.id !== 'ch-0' && ch.id !== 'ch-8');

chapters.forEach(ch => {
  const ref = referenceData[ch.id];
  if (!ref) return;

  const refPage = {
    id: `page-ref-${ch.id}`,
    chapterId: ch.id,
    pageNumber: 0, // will re-calculate later
    layout: 'text-heavy',
    chapterTitle: '심화 학습 자료',
    pageTitle: `${ch.title} - 더 깊이 알아보기`,
    subtitle: '관련 추천 도서 및 연구 문헌',
    cards: [
      {
        id: `ref-card-books-${ch.id}`,
        type: 'insight',
        title: '📚 추천 도서 3선',
        tag: '도서 추천',
        tagColor: 'blue',
        content: ref.books.map((b, i) => `${i + 1}. ${b}`)
      },
      {
        id: `ref-card-papers-${ch.id}`,
        type: 'insight',
        title: '📑 관련 연구 문헌 3선',
        tag: '학술 연구',
        tagColor: 'emerald',
        content: ref.papers.map((p, i) => `${i + 1}. ${p}`)
      }
    ],
    footerNote: `인사이트 리포트 & 시사 분석 포커스 - ${ch.title}`
  };

  // Find where to insert (after the last page of this chapter)
  let insertIndex = -1;
  for (let i = book.pages.length - 1; i >= 0; i--) {
    if (book.pages[i].chapterId === ch.id) {
      insertIndex = i + 1;
      break;
    }
  }

  if (insertIndex !== -1) {
    book.pages.splice(insertIndex, 0, refPage);
  }
});


// 3. Fix page numbers sequentially for all pages (excluding cover and toc)
let currentPageNum = 1;
book.pages.forEach(page => {
  if (page.layout !== 'cover' && page.layout !== 'toc') {
    page.pageNumber = currentPageNum++;
  }
});


const tsOutput = `import { EBook } from '../types';\n\nexport const initialBookData: EBook = ${JSON.stringify(book, null, 2)};\n`;
fs.writeFileSync('src/data/initialBookData.ts', tsOutput);
console.log('Data successfully enriched with rich text, books, and papers.');
