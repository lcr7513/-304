import fs from 'fs';
import initialBookData from './tempData.js';

const book = initialBookData;

// 1. Add a Prologue (Chapter 0)
const prologueChapter = {
  id: 'ch-0',
  number: '00',
  title: '서문: 전환의 시대, 우리는 어디로 향하는가',
  subtitle: '급변하는 사회를 꿰뚫는 통찰',
  category: '서문',
  description: '현대 사회의 위기와 기회를 조망하는 거시적 시대 진단',
  pageCount: 1,
  startPage: 3,
  color: '#0f172a',
};

const prologuePage = {
  id: 'page-prologue',
  chapterId: 'ch-0',
  pageNumber: 3,
  layout: 'text-heavy',
  chapterTitle: '서문',
  pageTitle: '우리가 직면한 불안과 새로운 질서',
  subtitle: '2026년을 관통하는 7가지 메가트렌드',
  cards: [
    {
      id: 'prologue-c1',
      type: 'insight',
      title: '불확실성의 시대, 파편화된 진실',
      tag: '시대 진단',
      tagColor: 'slate',
      content: [
        '현대 사회는 유례없는 풍요 속에서 극심한 불안을 마주하고 있습니다. 인공지능(AI)은 인간의 창작과 지능을 위협할 수준으로 발전했고, 기후 변화와 경제적 양극화, 치열한 국가 간의 무역 분쟁은 개인의 일상을 송두리째 흔들고 있습니다.',
        '이 책에 담긴 7가지의 시사 이슈—Z세대의 감정 소비, AI의 미디어 장악, 문해력의 실종, 과도한 사교육비, 데이터 자본주의 등—은 얼핏 서로 다른 문제처럼 보입니다. 하지만 그 이면에는 거대한 공통점이 존재합니다. 바로 "파편화된 사회 속에서 가치를 찾으려는 인간의 발버둥"이라는 점입니다.',
        '청년들은 내 집 마련이라는 거대한 꿈을 포기하는 대신 팝마트 미스터리 박스에서 즉각적인 도파민을 찾습니다. 학부모들은 불안한 미래를 방어하기 위해 아이들을 밤 11시 대치동 학원가로 내몰고, 자본주의는 알고리즘을 통해 우리의 은밀한 취향까지 데이터로 환산하여 가격표를 매깁니다.',
        '우리는 이제 단편적인 뉴스 기사나 숏폼 영상만으로는 이 거대한 파도를 이해할 수 없습니다. 현상의 이면을 꿰뚫어 보는 통찰력과 맥락을 이해하는 능력이 그 어느 때보다 절실한 시점입니다. 이 책이 여러분에게 혼돈의 시대를 항해하는 작지만 든든한 나침반이 되기를 바랍니다.'
      ]
    }
  ],
  footerNote: '인사이트 리포트 & 시사 분석 포커스 - 서문'
};

// 2. Add Epilogue (Chapter 8)
const epilogueChapter = {
  id: 'ch-8',
  number: '08',
  title: '결론: 시스템의 파도를 넘어서',
  subtitle: '독자들을 위한 제언',
  category: '결론',
  description: '우리는 무엇을 준비해야 하는가',
  pageCount: 1,
  startPage: 33, // rough estimate
  color: '#0f172a',
};

const epiloguePage = {
  id: 'page-epilogue',
  chapterId: 'ch-8',
  pageNumber: 33,
  layout: 'text-heavy',
  chapterTitle: '결론 및 제언',
  pageTitle: '주체성을 잃지 않기 위한 우리의 자세',
  subtitle: '학급 토론 및 스스로에게 던지는 질문',
  cards: [
    {
      id: 'epilogue-c1',
      type: 'insight',
      title: '변화에 휩쓸릴 것인가, 올라탈 것인가',
      tag: 'Action Plan',
      tagColor: 'slate',
      content: [
        '지금까지 우리는 현대 사회를 관통하는 7개의 주요 시사 이슈를 깊이 있게 살펴보았습니다. 이 문제들은 국가나 기업 차원의 거시적인 해결책이 필요하지만, 동시에 우리 개개인의 일상적인 실천을 요구합니다.',
        '알고리즘이 추천하는 숏폼 영상을 맹목적으로 소비할 것인지, 아니면 비판적인 시각으로 정보를 선별할 것인지는 오직 우리의 선택에 달려 있습니다. 부모님들이 사교육이라는 무한 경쟁의 굴레에서 한 발짝 물러서서 자녀의 진짜 행복을 고민하는 용기를 내는 것, 그리고 감정 소비의 이면에 숨은 마케팅의 함정을 꿰뚫어 보는 안목이 필요합니다.',
        '이 책의 진짜 결론은 아직 쓰여지지 않았습니다. 이 리포트를 덮은 후, 여러분이 학급 교실에서 친구들과 나누게 될 열띤 토론과 질문들이 바로 이 책의 진정한 마침표가 될 것입니다.',
        '[생각해 볼 질문들]\n1. 여러분이 가장 공감했던 챕터는 무엇이며 그 이유는 무엇인가요?\n2. 알고리즘과 AI의 편리함 속에서 우리가 잃어가고 있는 인간다움은 무엇일까요?\n3. 미래 세대를 위해 우리는 지금 당장 어떤 사회적 합의를 시작해야 할까요?'
      ]
    }
  ],
  footerNote: '인사이트 리포트 & 시사 분석 포커스 - 결론'
};

// Adjust chapter array
book.chapters.unshift(prologueChapter);
book.chapters.push(epilogueChapter);

// Adjust pages array
// TOC is index 1. So insert prologue after TOC (index 2)
book.pages.splice(2, 0, prologuePage);
// Append epilogue at the end
book.pages.push(epiloguePage);


// 3. Add Storytelling & Actionable Insights to existing cards
book.pages.forEach(page => {
  page.cards.forEach(card => {
    // Z generation - add a story
    if (page.id === 'page-ch1-2' && card.id === 'ch1-c3') {
      card.content.unshift('"밤 11시, 퇴근 후 텅 빈 자취방에 들어온 27세 직장인 김 씨는 책상 위에 진열된 작은 피규어들을 보며 위안을 얻습니다. 한 달 월급 250만 원 중 30만 원을 매달 \'맹박스(랜덤 피규어)\'에 쓰는 그는 말합니다. "집을 살 수 있는 시대도 아니고, 이 작은 인형 하나가 주는 확실한 기쁨이라도 없으면 버티기 힘들어요.""');
    }
    // AI Drama - add action insight
    if (page.id === 'page-ch2-3' && card.id === 'ch2-c6') {
      card.content.push('**[독자를 위한 제언]** 당장 오늘 저녁 유튜브나 인스타그램 릴스를 볼 때, 그 영상이 인간의 창작물인지 알고리즘이 짜깁기한 공장형 결과물인지 의심해 보세요. 시청자의 주체적인 필터링만이 저질 미디어의 확산을 막을 수 있습니다.');
    }
    // Education - add story
    if (page.id === 'page-ch4-2' && card.id === 'ch4-c4') {
       card.content.unshift('"밤 10시 30분, 대치동 은마아파트 사거리. 노란 학원 버스들과 학부모들의 비상등 켠 차들이 왕복 8차선 도로를 꽉 메우고 있습니다. 피곤에 절어 창백해진 얼굴로 차에 타는 중학교 2학년 민수는 오늘 하루만 학원 3곳을 돌았습니다. 부모는 아이를 사랑해서 돈을 쏟아붓지만, 아이는 점차 미소를 잃어갑니다. 과연 이 시스템은 누구를 위해 굴러가는 것일까요?"');
    }
  });
});

// Fix page numbers sequentially
let currentPageNum = 1;
book.pages.forEach(page => {
  if (page.layout !== 'cover' && page.layout !== 'toc') {
    page.pageNumber = currentPageNum++;
  }
});

const tsOutput = `import { EBook } from '../types';\n\nexport const initialBookData: EBook = ${JSON.stringify(book, null, 2)};\n`;
fs.writeFileSync('src/data/initialBookData.ts', tsOutput);
console.log('Storytelling, prologue, and epilogue added.');
