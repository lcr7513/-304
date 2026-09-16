

const initialBookData = {
  id: 'insight-report-ebook-v4',
  title: '인사이트 리포트 & 시사 분석 포커스',
  subtitle: '원자료 기반 데이터 시각화 및 심층 분석 리포트 (총 7개 주제 통합판)',
  edition: '2026 Interactive Digital Edition',
  publishedDate: '2026. 09',
  lastModified: Date.now(),
  chapters: [
    {
      id: 'ch-1',
      number: '01',
      title: '중국 Z세대의 감정 소비',
      subtitle: '새로운 소비 패러다임의 이해',
      category: '경제 트렌드',
      description: 'Z세대의 감정 소비 부상 원인과 통계',
      pageCount: 4,
      startPage: 3,
      color: '#059669',
    },
    {
      id: 'ch-2',
      number: '02',
      title: 'AI 숏폼 드라마 공습',
      subtitle: '창작과 연기의 위기인가 기회인가',
      category: '미디어 산업',
      description: 'SNS를 점령한 과일 드라마 실태와 광고 논란',
      pageCount: 5,
      startPage: 7,
      color: '#d97706',
    },
    {
      id: 'ch-3',
      number: '03',
      title: '학생 문해력 저하 문제',
      subtitle: '디지털 네이티브 세대의 읽기 위기',
      category: '교육',
      description: '교사 92.7% 체감 조사 결과 및 해법',
      pageCount: 4,
      startPage: 12,
      color: '#2563eb',
    },
    {
      id: 'ch-4',
      number: '04',
      title: '사교육비 추이와 대안',
      subtitle: '연도별 통계와 공교육 에듀테크',
      category: '교육 통계',
      description: '23.4조 시대 사교육 목적 분석',
      pageCount: 4,
      startPage: 16,
      color: '#7c3aed',
    },
    {
      id: 'ch-5',
      number: '05',
      title: '중국인 관광객 만족도 분석',
      subtitle: '부산 아시아 1위 달성과 시사점',
      category: '글로벌 관광',
      description: '야놀자리서치 빅데이터 분석 및 관광 전략',
      pageCount: 4,
      startPage: 20,
      color: '#0284c7',
    },
    {
      id: 'ch-6',
      number: '06',
      title: 'AI와 빅데이터 가격차별',
      subtitle: '실시간 맞춤형 가격 설정의 이면',
      category: '테크 규제',
      description: '소비자 프로파일링과 불공정 규제 과제',
      pageCount: 4,
      startPage: 24,
      color: '#db2777',
    },
    {
      id: 'ch-7',
      number: '07',
      title: '트럼프 관세 정책의 파장',
      subtitle: '보호무역주의와 사법부의 제동',
      category: '글로벌 경제',
      description: '10% 글로벌 관세 위법 판결과 경제 영향',
      pageCount: 3,
      startPage: 28,
      color: '#e11d48',
    },
  ],
  pages: [
    // ----------------------------------------------------
    // COVER & TOC
    // ----------------------------------------------------
    {
      id: 'page-cover',
      pageNumber: 1,
      chapterId: 'intro',
      chapterTitle: '표지',
      pageTitle: '인사이트 리포트 & 트렌드 포커스',
      subtitle: '원자료 기반 데이터 시각화 및 심층 분석 리포트',
      layout: 'cover',
      headerTag: 'SPECIAL E-BOOK',
      cards: [],
      footerNote: '상세 데이터 기반 분석 디지털 북',
    },
    {
      id: 'page-toc',
      pageNumber: 2,
      chapterId: 'intro',
      chapterTitle: '목차',
      pageTitle: '목차 (Table of Contents)',
      subtitle: '보고서의 구성과 핵심 주제 개요',
      layout: 'toc',
      headerTag: 'INDEX',
      cards: [
        { id: 'toc-1', title: '01. 중국 Z세대의 감정 소비 트렌드', subtitle: '현황 및 문제 정의 · 원인 분석 · 관련 문헌', content: [], category: '소비 경제', badge: '4 Pages' },
        { id: 'toc-2', title: '02. AI 숏폼 드라마와 콘텐츠 산업의 미래', subtitle: '막장 실태 · 광고 논란 · 권리 침해 · 관련 문헌', content: [], category: 'AI & 미디어', badge: '5 Pages' },
        { id: 'toc-3', title: '03. 학생 문해력 저하 요인과 해법', subtitle: '설문 데이터(92.7%) 진단 및 심화 연구 자료', content: [], category: '교육', badge: '4 Pages' },
        { id: 'toc-4', title: '04. 사교육비 실태와 공교육 대안', subtitle: '23.4조 사교육비 통계 및 에듀테크 대안', content: [], category: '사회 통계', badge: '4 Pages' },
        { id: 'toc-5', title: '05. 중국인 관광객 만족도 분석', subtitle: '부산 아시아 1위 요인 분석 및 융합 관광 제언', content: [], category: '관광 경제', badge: '4 Pages' },
        { id: 'toc-6', title: '06. 빅데이터와 AI 기술 가격차별', subtitle: '알고리즘 가격 차별 구조와 투명성 규제 방안', content: [], category: '테크 규제', badge: '4 Pages' },
        { id: 'toc-7', title: '07. 글로벌 관세 정책 쟁점', subtitle: '관세 위법 판결 파장 및 무역 관련 문헌', content: [], category: '글로벌 경제', badge: '3 Pages' },
      ],
      footerNote: '원하는 목차를 클릭하면 해당 챕터로 바로 이동할 수 있습니다.',
    },

    // ----------------------------------------------------
    // CHAPTER 1: Z세대 감정 소비 (4 Pages)
    // ----------------------------------------------------
    {
      id: 'page-ch1-1',
      pageNumber: 3,
      chapterId: 'ch-1',
      chapterTitle: '01. 중국 Z세대 감정 소비',
      pageTitle: '현황 및 맹박스 열풍',
      subtitle: '기능 중심에서 감정적 만족으로 전환된 소비 패러다임',
      layout: 'two-column',
      headerTag: 'CHAPTER 01 · PART 1',
      cards: [
        {
          id: 'ch1-c1',
          title: 'Z세대 소비력 부상',
          subtitle: '약 2억 6천만 명 규모의 핵심 경제 주체',
          badge: '경제 지표',
          badgeColor: 'emerald',
          imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=600&q=80',
          imageAlt: '쇼핑과 소비를 상징하는 시각 이미지',
          content: [
            '1995년~2009년생에 해당하는 중국 Z세대는 2025년 전체 소비 시장의 40%를 차지할 전망입니다.',
            '이들의 월평균 소비액 증가율은 연 15% 이상을 상회하며 모바일 커머스를 주도하고 있습니다.'
          ],
          styleVariant: 'default'
        },
        {
          id: 'ch1-c2',
          title: '감정 소비와 맹박스 시장 규모',
          subtitle: '효용을 넘어선 심리적 보상',
          badge: '시장 성장률',
          badgeColor: 'emerald',
          chart: {
            type: 'bar',
            xAxisKey: 'year',
            data: [
              { year: '2019', marketSize: 74 },
              { year: '2020', marketSize: 85 },
              { year: '2021', marketSize: 100 }
            ],
            series: [{ key: 'marketSize', name: '맹박스 시장 규모 (억 위안)', color: '#10b981' }]
          },
          content: [
            '제품의 기능보다 "나를 위한 소비"와 "심리적 위안"을 최우선하는 경향을 보입니다.',
            '특히 팝마트 등 확률형 미스터리 피규어(맹박스) 시장은 폭발적으로 성장했습니다.'
          ],
          styleVariant: 'metric'
        }
      ],
      footerNote: '물리적 소유보다 정서적 경험을 구매하는 것이 새로운 핵심 패러다임입니다.',
    },
    {
      id: 'page-ch1-2',
      pageNumber: 4,
      chapterId: 'ch-1',
      chapterTitle: '01. 중국 Z세대 감정 소비',
      pageTitle: '소비 원인 심층 분석',
      subtitle: '경제적 여유와 심리적 압박의 결합',
      layout: 'four-grid',
      headerTag: 'CHAPTER 01 · PART 2',
      cards: [
        {
          id: 'ch1-w1',
          title: '경제적 환경 (소황제)',
          badge: 'Economic',
          content: [
            '1가구 1자녀 정책으로 부모의 전폭적 자원을 받으며 성장했습니다.',
            '본인의 취향에 투자할 여유 자금을 상시 보유하고 있습니다.'
          ],
          styleVariant: 'default'
        },
        {
          id: 'ch1-w2',
          title: '사회문화적 동인',
          badge: 'Socio-Cultural',
          content: [
            '샤오홍슈 등 SNS를 통해 실시간으로 소비를 인증하고 문화를 공유합니다.',
            "'나다움'을 증명하려는 성향이 표출됩니다."
          ],
          styleVariant: 'default'
        },
        {
          id: 'ch1-w3',
          title: '심리적 도피처',
          badge: 'Psychological',
          content: [
            '입시 및 취업 스트레스를 즉각적인 소액 결제로 해소하려 합니다.',
            '캐릭터와 굿즈에 감정을 이입합니다.'
          ],
          styleVariant: 'quote',
          quote: '"오늘 하루 지친 나에게 주는 가장 빠르고 확실한 위로"'
        },
        {
          id: 'ch1-w4',
          title: '디지털 네이티브',
          badge: 'Digital Native',
          imageUrl: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=600&q=80',
          imageAlt: '모바일 소셜 미디어 활용',
          content: [
            '모바일 간편 결제(알리페이 등)에 익숙하여 충동구매 저항성이 낮습니다.'
          ],
          styleVariant: 'accent'
        }
      ],
      footerNote: '풍족한 배경 이면의 심리적 결핍이 감정 소비의 강력한 동력입니다.',
    },
    {
      id: 'page-ch1-3',
      pageNumber: 5,
      chapterId: 'ch-1',
      chapterTitle: '01. 중국 Z세대 감정 소비',
      pageTitle: '찬반 다각도 검토 및 제언',
      subtitle: '긍정적 효과와 소비 양극화 우려',
      layout: 'two-column',
      headerTag: 'CHAPTER 01 · PART 3',
      cards: [
        {
          id: 'ch1-pro-con',
          title: '사회·경제적 찬반 양론',
          subtitle: '가치관의 충돌과 경제성',
          badge: '분석',
          table: {
            headers: ['구분', '주요 근거 및 파급 효과'],
            rows: [
              ['찬성 (긍정)', '개인 행복권 존중, 스트레스 완화, 창의적 문화산업(IP) 발전 촉진'],
              ['반대 (우려)', '과소비 및 사행성 조장, 비합리적 습관 형성, 소비 양극화 심화 위험'],
              ['사회적 시각', '근검절약을 중시하는 기성세대와의 마찰, 상호 소통 부재']
            ]
          },
          content: ['단순한 사치로 규정하기보다는 세대 간 가치관 차이를 인정하는 시각이 필요합니다.'],
          styleVariant: 'default'
        },
        {
          id: 'ch1-sol',
          title: '해결방안 및 시사점',
          badge: 'Action Plan',
          badgeColor: 'emerald',
          content: [
            '개인: 예산 범위를 설정하고 감정과 지출을 철저히 분리하는 금융 교육이 필요합니다.',
            '기업: 투명한 확률 공개 등 윤리적 마케팅을 실천해야 합니다.',
            '사회: 심리적 안전망(멘탈케어) 구축이 절실합니다.'
          ],
          styleVariant: 'accent'
        }
      ],
      footerNote: '행복 추구와 경제적 건전성이 조화를 이루는 문화 정착이 필수적입니다.',
    },
    {
      id: 'page-ch1-4',
      pageNumber: 6,
      chapterId: 'ch-1',
      chapterTitle: '01. 중국 Z세대 감정 소비',
      pageTitle: '심화 탐구: 관련 도서 및 연구 문헌',
      subtitle: '소비 트렌드를 이해하기 위한 학술적·사회적 텍스트',
      layout: 'hero-split',
      headerTag: 'CHAPTER 01 · REFERENCE',
      cards: [
        {
          id: 'ch1-ref1',
          title: '추천 도서: 소비 사회의 이해',
          badge: '추천 도서',
          badgeColor: 'emerald',
          imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=80',
          imageAlt: '도서관과 책',
          content: [
            '📖 《소비의 사회》 (장 보드리야르): 현대인이 물건의 실질적 기능이 아닌 기호와 상징(이미지)을 소비하는 과정을 통찰한 고전입니다. 맹박스를 통해 희소성이라는 기호를 소비하는 Z세대를 이해하는 뼈대가 됩니다.',
            '📖 《트렌드 코리아 2024》 (김난도 외): 도파민을 좇는 "도파밍"과 타인의 취향을 추종하는 "디토 소비" 등 현대 청년층의 소비 행태를 구체적 사례와 함께 요약했습니다.'
          ],
          styleVariant: 'default'
        },
        {
          id: 'ch1-ref2',
          title: '관련 학술 연구 및 논문',
          badge: '연구 문헌',
          badgeColor: 'emerald',
          content: [
            '📄 [논문] "중국 Z세대의 가치관이 맹박스 소비행동에 미치는 영향" (2022)',
            '- 요약: 감정적 만족감과 희소성이라는 두 가지 요인이 Z세대의 구매 의도와 재구매율에 미치는 영향을 실증적으로 입증한 데이터 분석 연구입니다. 단순 충동구매가 아닌 정서적 동기가 핵심임을 밝힙니다.'
          ],
          styleVariant: 'accent'
        }
      ],
      footerNote: '소비는 단순한 경제 행위를 넘어, 시대의 결핍과 욕망을 반영하는 거울입니다.',
    },

    // ----------------------------------------------------
    // CHAPTER 2: AI 숏폼 드라마 (5 Pages)
    // ----------------------------------------------------
    {
      id: 'page-ch2-1',
      pageNumber: 7,
      chapterId: 'ch-2',
      chapterTitle: '02. AI 숏폼 드라마 공습',
      pageTitle: '오직 AI로만 만들어진 콘텐츠',
      subtitle: '과일 막장 드라마 열풍과 공장형 제작 생태계',
      layout: 'two-column',
      headerTag: 'CHAPTER 02 · PART 1',
      cards: [
        {
          id: 'ch2-c1',
          title: 'SNS를 장악한 AI 과일 드라마',
          badge: '바이럴 현상',
          badgeColor: 'amber',
          imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80',
          imageAlt: 'AI 및 로봇 시각화',
          content: [
            '"브로콜리 남편의 외도" 등 기상천외하고 자극적인 서사가 수백만 뷰를 기록하고 있습니다.',
            '이 영상들은 기획, 대본, 캐릭터, 음성 더빙까지 100% 생성형 AI 프롬프트로만 제작되었습니다.'
          ],
          styleVariant: 'default'
        },
        {
          id: 'ch2-c2',
          title: 'AI 마이크로 드라마 공장의 실태',
          subtitle: '극단적 효율의 자본주의',
          badge: '제작 환경',
          badgeColor: 'amber',
          chart: {
            type: 'bar',
            xAxisKey: 'type',
            data: [
              { type: '기존 제작비', cost: 200 },
              { type: 'AI 생성비', cost: 4 }
            ],
            series: [{ key: 'cost', name: '분당 제작 단가 비교 (만 원)', color: '#d97706' }]
          },
          content: [
            '중국의 플랫폼은 자본과 GPU를 결합해 폐쇄형 공장 생태계를 구축했습니다.',
            '단가가 분당 4만 원 선으로 추락하며, 하루에도 수십 편이 쏟아지는 구조가 완성되었습니다.'
          ],
          styleVariant: 'metric'
        }
      ],
      footerNote: '창작의 문턱은 낮아졌으나 품질과 윤리 문제가 수면 위로 떠올랐습니다.',
    },
    {
      id: 'page-ch2-2',
      pageNumber: 8,
      chapterId: 'ch-2',
      chapterTitle: '02. AI 숏폼 드라마 공습',
      pageTitle: '페리카나 AI 광고 논란 분석',
      subtitle: '자극적 서사 구조가 초래한 마케팅 역풍',
      layout: 'hero-split',
      headerTag: 'CHAPTER 02 · PART 2',
      cards: [
        {
          id: 'ch2-ad1',
          title: '선 넘은 막장 AI 광고 사태',
          badge: '사례 분석',
          badgeColor: 'rose',
          content: [
            '페리카나 공식 인스타그램에 올라온 AI 생성 영상은, 프라이드치킨 부부 사이에서 양념치킨이 태어나 불륜을 의심하는 파격적 내용을 담았습니다.',
            '결국 여론의 뭇매를 맞고 게시물은 삭제 조치되었습니다.'
          ],
          quote: '"극단적인 설정과 의인화의 결합은 클릭을 유도하기 좋은 콘텐츠다. 그러나 지나치면 브랜드 신뢰도를 치명적으로 훼손한다." - 미디어스쿨 언론보도',
          styleVariant: 'quote'
        },
        {
          id: 'ch2-ad2',
          title: '자극적 AI 광고가 급증하는 근본 이유',
          badge: '플랫폼 환경',
          imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80',
          imageAlt: '모바일 소셜 미디어 로고',
          content: [
            '제작비 절감: 실제 배우 초상권 비용이나 로케이션 촬영 없이 텍스트만으로 즉시 영상을 뽑아냅니다.',
            '알고리즘 종속성: 철저히 클릭률(CTR) 기반이므로, 불륜/복수 등 막장 코드만 살아남게 됩니다.'
          ],
          styleVariant: 'default'
        }
      ],
      footerNote: '효율성에 눈이 멀어 브랜드 본질을 망각한 AI 마케팅의 대표적 실패 사례입니다.',
    },
    {
      id: 'page-ch2-3',
      pageNumber: 9,
      chapterId: 'ch-2',
      chapterTitle: '02. AI 숏폼 드라마 공습',
      pageTitle: '애니메이션 및 배우 생존권 위기',
      subtitle: '무단 학습과 초상권 침해, 그리고 엑스트라 일감 소멸',
      layout: 'three-column',
      headerTag: 'CHAPTER 02 · PART 3',
      cards: [
        {
          id: 'ch2-a1',
          title: '애니메이터 위기와 도용',
          badge: '창작 환경',
          content: [
            '현재의 고품질 AI 드라마는 기존 웹툰과 애니메이션 데이터를 원작자 동의 없이 무단 학습한 불법성에 기인합니다.'
          ],
          styleVariant: 'default'
        },
        {
          id: 'ch2-a2',
          title: '연기자 노동 구조 재편',
          badge: '배우 생존권',
          content: [
            '가상 인간이 배우의 역할을 완벽히 대행하며 신인들의 진입로가 차단되고 일감이 끊겼습니다.'
          ],
          styleVariant: 'contrast'
        },
        {
          id: 'ch2-a3',
          title: '초상권 침해와 딥페이크',
          badge: '윤리적 위기',
          content: [
            '유명 배우를 닮은 가상 인물이 양산되며, 계약서에 "AI 학습 금지 조항"을 넣어야 하는 처지입니다.'
          ],
          styleVariant: 'default'
        }
      ],
      footerNote: '창작과 연기라는 인간 고유의 예술 영역이 데이터 조각으로 분해되고 있습니다.',
    },
    {
      id: 'page-ch2-4',
      pageNumber: 10,
      chapterId: 'ch-2',
      chapterTitle: '02. AI 숏폼 드라마 공습',
      pageTitle: '사회적 문제 방어 및 대응 방안',
      subtitle: '청소년 사각지대 해소와 주체적 미디어 리터러시',
      layout: 'two-column',
      headerTag: 'CHAPTER 02 · PART 4',
      cards: [
        {
          id: 'ch2-p1',
          title: '청소년 노출 사각지대',
          badge: '위험 경고',
          badgeColor: 'rose',
          content: [
            '아동친화적 외형을 띠고 있으나 실체는 폭력성과 선정성을 지닙니다.',
            'SNS 연령 필터링 부재로 무차별 노출되어 정서적 유해성이 극심합니다.'
          ],
          styleVariant: 'accent'
        },
        {
          id: 'ch2-p2',
          title: '비판적 수용을 위한 3대 실천',
          badge: '해법 제시',
          badgeColor: 'emerald',
          content: [
            '1. 판별 교육: 어색한 관절, 부자연스러운 표정 찾아내기',
            '2. 비판적 시야: 맹신하지 않고 억지 연출 의심하기',
            '3. 의무 고지제: 플랫폼 차원의 "AI 생성" 워터마크 의무화'
          ],
          styleVariant: 'default'
        }
      ],
      footerNote: '편리함 뒤에 숨은 윤리를 잊지 않고, 진정성 있는 이야기를 지켜내는 혜안이 필요합니다.',
    },
    {
      id: 'page-ch2-5',
      pageNumber: 11,
      chapterId: 'ch-2',
      chapterTitle: '02. AI 숏폼 드라마 공습',
      pageTitle: '심화 탐구: 관련 도서 및 연구 문헌',
      subtitle: 'AI 미디어의 진화와 사회적 충격을 다룬 문헌들',
      layout: 'hero-split',
      headerTag: 'CHAPTER 02 · REFERENCE',
      cards: [
        {
          id: 'ch2-ref1',
          title: '추천 도서: 주의력 위기와 AI 시대',
          badge: '추천 도서',
          badgeColor: 'amber',
          imageUrl: 'https://images.unsplash.com/photo-1517502474136-118e907ea69a?auto=format&fit=crop&w=600&q=80',
          imageAlt: '미디어와 군중',
          content: [
            '📖 《도둑맞은 집중력》 (요한 하리): 숏폼과 알고리즘이 어떻게 우리의 인지 능력을 파편화하고 딥러닝(깊은 사고)을 방해하는지 추적한 탐사 보도입니다.',
            '📖 《초거대 AI 시대가 온다》 (배순민 외): 생성형 AI가 텍스트, 이미지, 영상을 장악하며 콘텐츠 산업의 패러다임을 어떻게 파괴적 혁신으로 이끌고 있는지 조망합니다.'
          ],
          styleVariant: 'default'
        },
        {
          id: 'ch2-ref2',
          title: '관련 학술 연구 및 논문',
          badge: '연구 문헌',
          badgeColor: 'amber',
          content: [
            '📄 [논문] "생성형 AI를 활용한 영상 콘텐츠의 저작권 문제와 윤리적 과제" (2023)',
            '- 요약: AI 마이크로 드라마의 제작 공정에서 발생하는 학습 데이터 무단 사용, 딥페이크 초상권 침해 판례를 분석하고 법적 가이드라인 및 워터마크 의무화 방안을 제언한 연구입니다.'
          ],
          styleVariant: 'accent'
        }
      ],
      footerNote: '기술의 발전 속도만큼 튼튼한 미디어 윤리와 제도가 수반되어야 합니다.',
    },

    // ----------------------------------------------------
    // CHAPTER 3: 학생 문해력 저하 (4 Pages)
    // ----------------------------------------------------
    {
      id: 'page-ch3-1',
      pageNumber: 12,
      chapterId: 'ch-3',
      chapterTitle: '03. 학생 문해력 저하 문제',
      pageTitle: '학생 문해력 저하 문제의 요인',
      subtitle: '전교조 전국 교사 1,901명 설문조사 결과 바탕',
      layout: 'two-column',
      headerTag: 'CHAPTER 03 · PART 1',
      cards: [
        {
          id: 'ch3-c1',
          title: '과거 대비 학생들의 문해력 수준 변화 인식',
          subtitle: '교사의 92.7%가 "과거보다 저하되었다"고 응답',
          badge: '전교조 조사',
          badgeColor: 'blue',
          chart: {
            type: 'bar',
            xAxisKey: 'category',
            data: [
              { category: '매우 저하', value: 48.9 },
              { category: '다소 저하', value: 43.8 },
              { category: '비슷하다', value: 6.9 },
              { category: '다소 향상', value: 0.4 }
            ],
            series: [{ key: 'value', name: '응답 비율 (%)', color: '#1d4ed8' }]
          },
          content: [
            '전교조 조사 결과, 교사의 96.4%가 문해력 저하로 인해 수업 운영에 어려움을 겪고 있다고 답했습니다.'
          ],
          stat: {
            value: '92.7%',
            label: '문해력 저하 체감 교사 비율',
            source: '네이버 - 뉴시스'
          },
          styleVariant: 'default'
        },
        {
          id: 'ch3-c2',
          title: '가장 취약한 독해 영역과 주요 원인',
          badge: '분석 요점',
          badgeColor: 'blue',
          imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
          imageAlt: '모바일 기기를 보는 학생들',
          content: [
            '취약 영역: 긴 글을 끝까지 읽고 이해하는 능력(89.4%)과 어휘 및 개념 이해 능력(79.7%)',
            '주요 원인: 스마트폰과 숏폼 콘텐츠 확산 등 디지털 환경 변화 (93.7%).'
          ],
          styleVariant: 'accent'
        }
      ],
      footerNote: '단편적이고 시각적인 콘텐츠 소비가 긴 호흡의 독해 능력을 심각하게 저하시켰습니다.',
    },
    {
      id: 'page-ch3-2',
      pageNumber: 13,
      chapterId: 'ch-3',
      chapterTitle: '03. 학생 문해력 저하 문제',
      pageTitle: '해결방안은?',
      subtitle: '맞춤형 에듀테크와 리터러시 교육의 융합',
      layout: 'hero-split',
      headerTag: 'CHAPTER 03 · PART 2',
      cards: [
        {
          id: 'ch3-s1',
          title: 'AI 기반 맞춤형 독서 시스템 구축',
          badge: '기술적 대안',
          content: [
            'AI가 학생의 독해 수준을 분석해 개인별 난이도에 맞는 글을 추천합니다.',
            '어려운 단어 설명, 요약, 질문 생성 등을 제공해 읽기 부담을 줄여줍니다.'
          ],
          styleVariant: 'default'
        },
        {
          id: 'ch3-s2',
          title: '개인별 "디지털 사용 분석 리포트" 제공',
          badge: '자기 주도 관리',
          content: [
            '스마트폰 사용 시간을 분석해 시청 시간과 독서 시간의 비율을 확인하게 합니다.',
            '스스로 목표를 설정함으로써 미디어 사용 습관을 관리하게 합니다.'
          ],
          styleVariant: 'contrast'
        }
      ],
      footerNote: '단순한 제재를 넘어, 기술을 활용한 긍정적 독서 경험 제공이 필요합니다.',
    },
    {
      id: 'page-ch3-3',
      pageNumber: 14,
      chapterId: 'ch-3',
      chapterTitle: '03. 학생 문해력 저하 문제',
      pageTitle: '뉴스 리터러시 교육 의무화',
      subtitle: '올바른 정보 습득과 판별 능력 배양',
      layout: 'two-column',
      headerTag: 'CHAPTER 03 · PART 3',
      cards: [
        {
          id: 'ch3-n1',
          title: '미디어 정보 비판적 수용 훈련',
          badge: '공교육 혁신',
          imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80',
          imageAlt: '신문과 모바일 기기',
          content: [
            '실제 뉴스 기사와 온라인 정보를 분석하고 평가하는 수업을 실시합니다.',
            '정보 해석뿐 아니라 가짜뉴스를 판별하는 능력을 동시에 키웁니다.'
          ],
          styleVariant: 'default'
        },
        {
          id: 'ch3-n2',
          title: '디지털 시대의 필수 생존 역량',
          badge: '미래 역량',
          content: [
            '현대의 문해력은 쏟아지는 정보 속에서 맥락과 진실을 파악하는 리터러시를 의미합니다.',
            '민주 시민으로서 갖춰야 할 실질적 문해력을 기르는 핵심 과정입니다.'
          ],
          styleVariant: 'accent'
        }
      ],
      footerNote: '텍스트 해독을 넘어 정보의 본질을 꿰뚫어 보는 통찰력이 요구되는 시대입니다.',
    },
    {
      id: 'page-ch3-4',
      pageNumber: 15,
      chapterId: 'ch-3',
      chapterTitle: '03. 학생 문해력 저하 문제',
      pageTitle: '심화 탐구: 관련 도서 및 연구 문헌',
      subtitle: '독서 회로의 파괴와 문해력 회복을 위한 텍스트',
      layout: 'hero-split',
      headerTag: 'CHAPTER 03 · REFERENCE',
      cards: [
        {
          id: 'ch3-ref1',
          title: '추천 도서: 뇌과학과 문해력',
          badge: '추천 도서',
          badgeColor: 'blue',
          imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
          imageAlt: '펼쳐진 책과 안경',
          content: [
            '📖 《다시, 책으로》 (매리앤 울프): 인지신경학자인 저자가 디지털 기기의 스크롤링 텍스트가 인류가 수천 년간 발달시켜 온 뇌의 "깊이 읽기(Deep Reading)" 회로를 어떻게 파괴하고 있는지 뇌과학적 근거로 설명합니다.',
            '📖 《EBS 당신의 문해력》 (EBS 제작팀): 대한민국 교육 현장을 휩쓴 다큐멘터리를 책으로 엮어, 문해력 결손 실태와 어휘력 확장을 위한 구체적 처방전을 제시합니다.'
          ],
          styleVariant: 'default'
        },
        {
          id: 'ch3-ref2',
          title: '관련 학술 연구 및 논문',
          badge: '연구 문헌',
          badgeColor: 'blue',
          content: [
            '📄 [논문] "디지털 네이티브 세대의 매체 이용 습관과 비판적 독해력의 상관관계" (2021)',
            '- 요약: 중고등학생 500명을 대상으로 한 연구로, 영상 매체 시청 시간이 길수록 추론적 읽기와 긴 글의 문맥 파악 점수가 유의미하게 하락함을 통계적으로 검증했습니다.'
          ],
          styleVariant: 'accent'
        }
      ],
      footerNote: '책을 읽는 뇌는 타고나는 것이 아니라 지속적인 훈련으로 만들어집니다.',
    },

    // ----------------------------------------------------
    // CHAPTER 4: 사교육비 (4 Pages)
    // ----------------------------------------------------
    {
      id: 'page-ch4-1',
      pageNumber: 16,
      chapterId: 'ch-4',
      chapterTitle: '04. 사교육비 추이와 대안',
      pageTitle: '연도별 사교육비 지출 폭증 실태',
      subtitle: '23.4조 원을 돌파한 사교육비와 1인당 부담액',
      layout: 'two-column',
      headerTag: 'CHAPTER 04 · PART 1',
      cards: [
        {
          id: 'ch4-c1',
          title: '국내 사교육비 5년 연속 팽창 추이',
          subtitle: '통계청 연도별 사교육비 조사 결과',
          badge: '총액 및 1인당 비용',
          badgeColor: 'purple',
          chart: {
            type: 'composed',
            xAxisKey: 'year',
            data: [
              { year: '2017', total: 18.7, perStudent: 27.2 },
              { year: '2018', total: 19.5, perStudent: 29.1 },
              { year: '2019', total: 21.0, perStudent: 32.1 },
              { year: '2020', total: 19.4, perStudent: 30.2 },
              { year: '2021', total: 23.4, perStudent: 36.7 }
            ],
            series: [
              { key: 'total', name: '총액 (조원)', color: '#8b5cf6', type: 'bar' },
              { key: 'perStudent', name: '1인당 월평균 (만원)', color: '#10b981', type: 'line' }
            ]
          },
          content: [
            '2021년 사교육비 총액은 23.4조 원으로 역대 최고치를 경신했습니다.',
            '학생 1인당 월평균 36.7만 원이라는 통계청 최고 기록을 세웠습니다.'
          ],
          styleVariant: 'default'
        }
      ],
      footerNote: '학령 인구 감소에도 불구하고 개별 가계의 사교육 부담은 기하급수적으로 늘고 있습니다.',
    },
    {
      id: 'page-ch4-2',
      pageNumber: 17,
      chapterId: 'ch-4',
      chapterTitle: '04. 사교육비 추이와 대안',
      pageTitle: '학부모는 왜 사교육에 의존하는가?',
      subtitle: '사교육 참여 목적 구조 분석 (복수 응답 허용)',
      layout: 'two-column',
      headerTag: 'CHAPTER 04 · PART 2',
      cards: [
        {
          id: 'ch4-c2',
          title: '사교육 참여 목적 비율 분석',
          subtitle: '학교 보충과 선행학습의 이중고',
          badge: '목적 비중 (단일 기준)',
          badgeColor: 'purple',
          chart: {
            type: 'pie',
            xAxisKey: 'name',
            data: [
              { name: '학교수업 보충', value: 44.3 },
              { name: '선행학습', value: 25.2 },
              { name: '진학준비', value: 14.4 },
              { name: '불안심리', value: 10.8 },
              { name: '보육', value: 2.3 },
              { name: '기타', value: 3.0 }
            ],
            series: [{ 
              key: 'value', 
              name: '비율', 
              colors: ['#8b5cf6', '#a78bfa', '#c4b5fd', '#f472b6', '#34d399', '#94a3b8'] 
            }]
          },
          content: [
            '보충학습(44.3%)과 선행학습(25.2%)이 대부분을 차지하며, 10.8%는 막연한 불안 심리로 참여합니다.',
            '공교육 진도를 따라가기 위한 방어적 수요와 선행 수요가 맞물려 있습니다.'
          ],
          styleVariant: 'metric'
        },
        {
          id: 'ch4-img1',
          title: '밤을 잊은 사교육 현장',
          badge: '현장 스케치',
          imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80',
          imageAlt: '어두운 밤 쌓여있는 교재와 펜',
          content: [
            '심야 학원가와 끝없는 교재재료들이 한국의 치열한 입시 문화를 대변합니다.'
          ],
          styleVariant: 'default'
        }
      ],
      footerNote: '공교육 신뢰도 회복과 과도한 입시 경쟁 완화가 근본적인 해결책입니다.',
    },
    {
      id: 'page-ch4-3',
      pageNumber: 18,
      chapterId: 'ch-4',
      chapterTitle: '04. 사교육비 추이와 대안',
      pageTitle: '공교육 혁신을 통한 실질적 대안',
      subtitle: '지자체별 에듀테크 투입과 교육 격차 해소 노력',
      layout: 'three-column',
      headerTag: 'CHAPTER 04 · PART 3',
      cards: [
        {
          id: 'ch4-r1',
          title: '전북: 영어중점학교 성공',
          badge: '농어촌 모델',
          content: [
            '사설 학원 인프라가 부족한 상황에서 영어중점학교 17개교를 지정하여 만족도 89% 달성.'
          ],
          styleVariant: 'default'
        },
        {
          id: 'ch4-r2',
          title: '경기: AI 기반 와이업 스쿨',
          badge: 'AI 에듀테크',
          content: [
            '하이러닝 플랫폼과 AI 펭톡을 결합하여 학생 수준별 맞춤형 교육 제공.',
            '사교육 AI 튜터링을 무상 대체.'
          ],
          styleVariant: 'accent'
        },
        {
          id: 'ch4-r3',
          title: '소외계층 집중 지원 캠프',
          badge: '격차 해소',
          content: [
            '전액 무상 지원 대학 연계 캠프로 기초 학습 능력 향상 도모.'
          ],
          styleVariant: 'default'
        }
      ],
      footerNote: '첨단 기술과 공교육 시스템이 융합될 때 실질적인 사교육비 경감 효과를 거둘 수 있습니다.',
    },
    {
      id: 'page-ch4-4',
      pageNumber: 19,
      chapterId: 'ch-4',
      chapterTitle: '04. 사교육비 추이와 대안',
      pageTitle: '심화 탐구: 관련 도서 및 연구 문헌',
      subtitle: '교육 격차와 능력주의의 이면을 분석한 텍스트',
      layout: 'hero-split',
      headerTag: 'CHAPTER 04 · REFERENCE',
      cards: [
        {
          id: 'ch4-ref1',
          title: '추천 도서: 능력주의와 교육 불평등',
          badge: '추천 도서',
          badgeColor: 'purple',
          imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80',
          imageAlt: '책 더미와 교육',
          content: [
            '📖 《엘리트 세습》 (대니얼 마코비츠): 현대 사회의 \'능력주의\'가 공정하다는 착각을 비판하며, 막대한 사교육비 투자를 통해 부유층이 어떻게 엘리트 지위를 세습하는지 고발합니다.',
            '📖 《교육격차》 (김희삼): 한국 사회의 부모 경제력에 따른 학력 격차 실태를 데이터를 통해 분석하고, 사교육 의존도를 낮출 수 있는 공교육의 회복 방향을 제시합니다.'
          ],
          styleVariant: 'default'
        },
        {
          id: 'ch4-ref2',
          title: '관련 학술 연구 및 논문',
          badge: '연구 문헌',
          badgeColor: 'purple',
          content: [
            '📄 [논문] "에듀테크 기반 공교육 혁신 모델이 가계 사교육비 경감에 미치는 효과" (2022)',
            '- 요약: 지자체별로 공교육 내 AI 튜터와 태블릿 기기를 보급한 전후의 사교육비 지출 변화를 추적한 결과, 기초 학력 부진 학생을 중심으로 사교육 유발 억제 효과가 뚜렷함을 증명했습니다.'
          ],
          styleVariant: 'accent'
        }
      ],
      footerNote: '사교육 문제는 교육을 넘어선 사회 전반의 구조적 양극화 문제입니다.',
    },

    // ----------------------------------------------------
    // CHAPTER 5: 중국 관광객 만족도 (4 Pages)
    // ----------------------------------------------------
    {
      id: 'page-ch5-1',
      pageNumber: 20,
      chapterId: 'ch-5',
      chapterTitle: '05. 중국인 관광객 만족도 분석',
      pageTitle: '중국인 관광객 만족도, 부산이 아시아 1위',
      subtitle: '야놀자리서치 조사 결과 (아시아 주요 8개 도시 중)',
      layout: 'two-column',
      headerTag: 'CHAPTER 05 · PART 1',
      cards: [
        {
          id: 'ch5-c1',
          title: '아시아 8개 도시 종합 만족도 순위',
          subtitle: '중국인 관광객 여행 후기 및 SNS 게시물 약 3만 건 분석',
          badge: '데이터 순위',
          badgeColor: 'blue',
          table: {
            headers: ['순위', '도시', '긍정 게시물 (건)', '종합 점수'],
            rows: [
              ['1위', '부산', '1,492', '4.723'],
              ['2위', '싱가포르', '4,173', '4.710'],
              ['3위', '도쿄', '3,542', '4.706'],
              ['4위', '오사카', '3,071', '4.701'],
              ['5위', '서울', '2,111', '4.676'],
              ['6위', '하노이', '566', '4.587'],
              ['7위', '쿠알라룸푸르', '468', '4.534'],
              ['8위', '방콕', '3,271', '4.510'],
            ]
          },
          content: [
            '분석 결과, 글로벌 대도시들을 제치고 부산이 종합 만족도 1위(4.723점)를 기록했습니다.'
          ],
          styleVariant: 'metric',
          stat: {
            value: '4.723',
            label: '부산 종합 만족도 점수',
            source: '네이버 - 문화일보'
          }
        }
      ],
      footerNote: '정량적인 방문객 수를 넘어, 관광객이 체감하는 질적 만족도에서 부산이 압도적 1위를 차지했습니다.',
    },
    {
      id: 'page-ch5-2',
      pageNumber: 21,
      chapterId: 'ch-5',
      chapterTitle: '05. 중국인 관광객 만족도 분석',
      pageTitle: '만족도 결정 요인 분석',
      subtitle: '체험형 관광 vs 목적형 쇼핑의 명암',
      layout: 'hero-split',
      headerTag: 'CHAPTER 05 · PART 2',
      cards: [
        {
          id: 'ch5-w1',
          title: '부산이 높은 평가를 받은 이유',
          badge: '체험형 관광',
          badgeColor: 'emerald',
          imageUrl: 'https://images.unsplash.com/photo-1588667551061-7bf19f43fc16?auto=format&fit=crop&w=600&q=80',
          imageAlt: '부산 광안대교 야경',
          content: [
            '해운대, 광안리 등 자연경관과 음식이 하나의 "체험형 관광 콘텐츠"로 연결되었기 때문입니다.',
            '자연을 걷고, 먹고, 즐기는 입체적인 경험으로 인식했습니다.'
          ],
          styleVariant: 'default'
        },
        {
          id: 'ch5-w2',
          title: '서울의 만족도 하락 요인',
          badge: '쇼핑 편중',
          badgeColor: 'rose',
          content: [
            '면세점 중심의 "목적형 쇼핑"에 치우쳐 있어 장기적으로 경쟁력이 약해질 수 있다는 지적을 받았습니다.',
            '역사·문화 분야 만족도가 가장 낮게 나타났습니다.'
          ],
          styleVariant: 'contrast'
        }
      ],
      footerNote: '여행의 트렌드가 단순 쇼핑에서 오감으로 즐기는 로컬 체험 중심으로 이동하고 있습니다.',
    },
    {
      id: 'page-ch5-3',
      pageNumber: 22,
      chapterId: 'ch-5',
      chapterTitle: '05. 중국인 관광객 만족도 분석',
      pageTitle: '향후 관광 전략 제언',
      subtitle: '서울과 부산의 융합 관광 시너지 창출',
      layout: 'two-column',
      headerTag: 'CHAPTER 05 · PART 3',
      cards: [
        {
          id: 'ch5-s1',
          title: '서울-부산 연계 관광 코스 개발',
          badge: '전문가 제언',
          content: [
            '서울의 문화·쇼핑 인프라와 부산의 해양·휴양 강점을 하나로 묶는 연계 코스가 필요합니다.',
            '체류 기간을 연장시키고 종합적인 만족도를 극대화할 수 있습니다.'
          ],
          styleVariant: 'accent'
        },
        {
          id: 'ch5-s2',
          title: '역사·문화 콘텐츠의 재해석',
          badge: '질적 성장',
          content: [
            'K팝, 고궁 문화를 스토리텔링 기반의 체험 프로그램으로 고도화해야 합니다.',
            '덤핑 관광을 지양하고 고부가가치 로컬 콘텐츠를 육성해야 합니다.'
          ],
          styleVariant: 'default'
        }
      ],
      footerNote: '대한민국의 관광 매력을 극대화하기 위한 지역 간 상호 보완적 융합 전략이 필수적입니다.',
    },
    {
      id: 'page-ch5-4',
      pageNumber: 23,
      chapterId: 'ch-5',
      chapterTitle: '05. 중국인 관광객 만족도 분석',
      pageTitle: '심화 탐구: 관련 도서 및 연구 문헌',
      subtitle: '로컬 관광과 포스트 코로나 여행 트렌드 분석',
      layout: 'hero-split',
      headerTag: 'CHAPTER 05 · REFERENCE',
      cards: [
        {
          id: 'ch5-ref1',
          title: '추천 도서: 로컬 콘텐츠의 부상',
          badge: '추천 도서',
          badgeColor: 'blue',
          imageUrl: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=600&q=80',
          imageAlt: '여행 가방과 랜드마크',
          content: [
            '📖 《로컬의 진화》 (모종린): 밀레니얼 세대가 대형 쇼핑몰이 아닌 골목길 문화를 선호하는 이유를 경제학적으로 분석하며, 체험 기반의 고유한 지역 문화가 곧 글로벌 관광의 경쟁력임을 역설합니다.',
            '📖 《관광의 시대》: 포스트 코로나 이후 변화한 글로벌 여행 트렌드(자연 지향, 경험 소비 등)를 짚어주며 기존 단체 덤핑 관광의 한계를 지적합니다.'
          ],
          styleVariant: 'default'
        },
        {
          id: 'ch5-ref2',
          title: '관련 학술 연구 및 논문',
          badge: '연구 문헌',
          badgeColor: 'blue',
          content: [
            '📄 [논문] "방한 중국인 관광객의 선택 속성이 만족도 및 재방문 의도에 미치는 영향" (2023)',
            '- 요약: 싼커(개별 여행객)를 중심으로 설문 조사한 결과, 화장품 쇼핑보다 미식 탐방 및 지역 특화 체험이 재방문 의도에 가장 높은 가중치를 가짐을 증명한 연구입니다.'
          ],
          styleVariant: 'accent'
        }
      ],
      footerNote: '매력적인 도시를 만드는 것은 거대한 인프라가 아닌 디테일한 로컬 경험입니다.',
    },

    // ----------------------------------------------------
    // CHAPTER 6: AI와 빅데이터 가격차별 (4 Pages)
    // ----------------------------------------------------
    {
      id: 'page-ch6-1',
      pageNumber: 24,
      chapterId: 'ch-6',
      chapterTitle: '06. AI와 빅데이터 가격차별',
      pageTitle: '빅데이터와 AI 기술 발전이 가져온 가격차별',
      subtitle: '실시간 맞춤형 가격 설정 완료',
      layout: 'two-column',
      headerTag: 'CHAPTER 06 · PART 1',
      cards: [
        {
          id: 'ch6-c1',
          title: '무슨 일인가?',
          badge: '현상 파악',
          badgeColor: 'rose',
          imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80',
          imageAlt: '온라인 쇼핑 박스',
          content: [
            '온라인 플랫폼이 소비자의 검색 기록, 행동 패턴을 분석하기 시작했습니다.',
            '소비자마다 각기 다른 가격을 제시하는 "가격차별" 전략이 확산되고 있습니다.'
          ],
          styleVariant: 'default'
        },
        {
          id: 'ch6-c2',
          title: '어떻게 가능한가? (알고리즘 원리)',
          badge: '기술적 배경',
          content: [
            '1. 빅데이터 수집: 사이트 방문 빈도, 장바구니 체류 시간 데이터 수집.',
            '2. AI 분석: "어느 정도 가격까지 지불할 의향이 있는지" 프로필 생성.',
            '결과: "실시간 맞춤형 가격 설정"이 완벽하게 자동화되었습니다.'
          ],
          styleVariant: 'accent'
        }
      ],
      footerNote: '빅데이터는 우리를 편리하게 하지만, 동시에 기업의 가장 강력한 수익 창출 무기가 되었습니다.',
    },
    {
      id: 'page-ch6-2',
      pageNumber: 25,
      chapterId: 'ch-6',
      chapterTitle: '06. AI와 빅데이터 가격차별',
      pageTitle: '무엇이 문제인가?',
      subtitle: '소비자 불이익과 불투명한 데이터 활용',
      layout: 'three-column',
      headerTag: 'CHAPTER 06 · PART 2',
      cards: [
        {
          id: 'ch6-p1',
          title: '같은 상품, 다른 가격',
          badge: '불공정성',
          imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
          imageAlt: '데이터 분석 모니터 화면',
          content: [
            '검색 횟수가 많거나 프리미엄 기기를 사용할 경우 가격이 더 높게 책정됩니다.',
            '사람마다 다른 가격이 부여되는 근본적인 불공정성을 야기합니다.'
          ],
          styleVariant: 'contrast'
        },
        {
          id: 'ch6-p2',
          title: '특정 상품만 노출 (선택 제한)',
          badge: '알고리즘 조작',
          content: [
            '이윤이 많이 남는 특정 상품 위주로만 노출시킵니다.',
            '소비자는 다양하게 비교할 권리를 잃게 됩니다.'
          ],
          styleVariant: 'default'
        },
        {
          id: 'ch6-p3',
          title: '투명하지 않은 활용',
          badge: '정보 비대칭',
          content: [
            '나의 데이터가 가격 상승으로 이어진 과정이 숨겨져 있습니다.',
            '소비자일수록 금전적 불이익을 감수해야 합니다.'
          ],
          styleVariant: 'default'
        }
      ],
      footerNote: '편리한 개인화 추천의 이면에는 철저하게 계산된 정보 비대칭의 함정이 존재합니다.',
    },
    {
      id: 'page-ch6-3',
      pageNumber: 26,
      chapterId: 'ch-6',
      chapterTitle: '06. AI와 빅데이터 가격차별',
      pageTitle: '결론 및 해결 방안',
      subtitle: '소비자 주권 회복을 위한 3대 규제',
      layout: 'two-column',
      headerTag: 'CHAPTER 06 · PART 3',
      cards: [
        {
          id: 'ch6-s1',
          title: '가격차별, 막을 수 없다면?',
          badge: '현실적 진단',
          content: [
            '기업의 이윤 극대화 전략 자체를 원천 차단하기는 불가능합니다.',
            '투명성 확보와 부당한 착취를 막는 강력한 가드레일이 필요합니다.'
          ],
          styleVariant: 'default'
        },
        {
          id: 'ch6-s2',
          title: '투명성 제고 및 법제화',
          badge: '대응 방안',
          badgeColor: 'rose',
          content: [
            '알고리즘 투명성 공개: 개인 행동 데이터 활용 명확히 고지.',
            '소비자 데이터 활용 동의 강화: 프로파일링 동의 분리.',
            '규제 법제화: 가격 변동폭에 대한 법적 상한선 마련.'
          ],
          styleVariant: 'accent'
        }
      ],
      footerNote: '알고리즘의 통제권을 기업에서 소비자와 사회의 감시 영역으로 끌어와야 합니다.',
    },
    {
      id: 'page-ch6-4',
      pageNumber: 27,
      chapterId: 'ch-6',
      chapterTitle: '06. AI와 빅데이터 가격차별',
      pageTitle: '심화 탐구: 관련 도서 및 연구 문헌',
      subtitle: '알고리즘 독재와 데이터 자본주의를 향한 경고',
      layout: 'hero-split',
      headerTag: 'CHAPTER 06 · REFERENCE',
      cards: [
        {
          id: 'ch6-ref1',
          title: '추천 도서: 데이터 자본주의의 민낯',
          badge: '추천 도서',
          badgeColor: 'pink',
          imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80',
          imageAlt: '화면에 표시된 복잡한 알고리즘과 지폐',
          content: [
            '📖 《대량살상 수학무기》 (캐시 오닐): 월스트리트 출신 수학자인 저자가 빅데이터 알고리즘이 어떻게 불평등을 조장하고 약자를 차별하여 이윤을 취하는지 블랙박스의 내부를 고발합니다.',
            '📖 《감시 자본주의 시대》 (쇼샤나 주보프): 빅테크 기업들이 인간의 사적인 경험을 데이터화하여 미래의 행동을 예측 및 통제하는 비즈니스 모델로 수익을 내는 거대한 구조를 비판합니다.'
          ],
          styleVariant: 'default'
        },
        {
          id: 'ch6-ref2',
          title: '관련 학술 연구 및 논문',
          badge: '연구 문헌',
          badgeColor: 'pink',
          content: [
            '📄 [논문] "온라인 플랫폼의 알고리즘 기반 가격차별 규제 방안 연구" (2022)',
            '- 요약: 항공권, 호텔 등 실시간 변동 가격제에 숨겨진 소비자 프로파일링의 법적 문제점을 분석하고, 유럽연합(EU)의 디지털서비스법(DSA)에 준하는 국내 소비자 보호법 개정 방향을 제안합니다.'
          ],
          styleVariant: 'accent'
        }
      ],
      footerNote: '알고리즘은 가치 중립적이지 않으며, 설계자의 이익을 가장 충실히 대변합니다.',
    },

    // ----------------------------------------------------
    // CHAPTER 7: 트럼프 관세 파장 (3 Pages)
    // ----------------------------------------------------
    {
      id: 'page-ch7-1',
      pageNumber: 28,
      chapterId: 'ch-7',
      chapterTitle: '07. 트럼프 관세 정책 파장',
      pageTitle: '10% 글로벌 관세 위법 판결 및 권한 충돌',
      subtitle: '미국 사법부의 제동과 행정부-입법부 헌법 쟁점',
      layout: 'hero-split',
      headerTag: 'CHAPTER 07 · PART 1',
      cards: [
        {
          id: 'ch7-c1',
          title: '미국 연방법원의 중대 판결',
          badge: '사건 개요',
          badgeColor: 'rose',
          imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8ed7444634?auto=format&fit=crop&w=600&q=80',
          imageAlt: '거대한 화물선과 선적 컨테이너',
          content: [
            '트럼프 행정부가 일방 부과했던 10% 글로벌 관세 조치에 대해 연방법원이 위법 판결을 내렸습니다.',
            '"안보 위협이 명확히 입증되지 않은 일괄 부과는 권한 남용"이라고 판시했습니다.'
          ],
          styleVariant: 'default'
        },
        {
          id: 'ch7-c2',
          title: '헌법상 과세 권한의 주체',
          badge: '법적 쟁점',
          content: [
            '세금과 관세를 매기고 무역을 규제하는 본질적 권한은 전적으로 "의회(입법부)"에 속해 있습니다.',
            '비상사태를 핑계로 행정부가 입법권의 권한을 침해해 온 관행에 제동을 걸었습니다.'
          ],
          styleVariant: 'accent'
        }
      ],
      footerNote: '삼권분립 원칙에 입각한 이번 판결은 향후 무역 분쟁의 핵심 가이드라인이 될 전망입니다.',
    },
    {
      id: 'page-ch7-2',
      pageNumber: 29,
      chapterId: 'ch-7',
      chapterTitle: '07. 트럼프 관세 정책 파장',
      pageTitle: '글로벌 경제 파장 및 시사점',
      subtitle: '보호무역주의의 위축과 시장의 불확실성',
      layout: 'two-column',
      headerTag: 'CHAPTER 07 · PART 2',
      cards: [
        {
          id: 'ch7-c3',
          title: '통상 협상력 타격',
          badge: '영향 분석 1',
          content: [
            '일방적 관세라는 "강력한 채찍"을 무기로 밀어붙이던 통상 압박 전략이 무력화되었습니다.',
            '타국과의 무역 협상에서 미국 행정부의 입지가 크게 좁아질 것으로 분석됩니다.'
          ],
          styleVariant: 'default'
        },
        {
          id: 'ch7-c4',
          title: '기업 투자 불확실 연장',
          badge: '영향 분석 2',
          badgeColor: 'rose',
          content: [
            '정책 불확실성이 장기화될 수 있습니다.',
            '이는 글로벌 공급망 기업들의 설비 투자 보류를 초래합니다.'
          ],
          styleVariant: 'contrast'
        }
      ],
      footerNote: '극단적 보호무역주의는 법적 저항을 피할 수 없으며, 다자간 규범의 중요성을 환기시킵니다.',
    },
    {
      id: 'page-ch7-3',
      pageNumber: 30,
      chapterId: 'ch-7',
      chapterTitle: '07. 트럼프 관세 정책 파장',
      pageTitle: '심화 탐구: 관련 도서 및 연구 문헌',
      subtitle: '보호무역주의의 역사와 통상 규범의 이해',
      layout: 'hero-split',
      headerTag: 'CHAPTER 07 · REFERENCE',
      cards: [
        {
          id: 'ch7-ref1',
          title: '추천 도서: 패권 경쟁과 무역 전쟁',
          badge: '추천 도서',
          badgeColor: 'rose',
          imageUrl: 'https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?auto=format&fit=crop&w=600&q=80',
          imageAlt: '글로벌 무역을 상징하는 세계 지도와 금융 데이터',
          content: [
            '📖 《자유무역의 덫》 (피터 나바로 등): 보호무역주의가 부상하게 된 정치경제적 배경과, 무역적자가 유발하는 산업 붕괴의 논리를 담아 관세 정책의 배경 이론을 제시합니다.',
            '📖 《거대한 역포위》: 미중 패권 경쟁으로 촉발된 신냉전 하에서 관세와 제재가 어떻게 글로벌 공급망(GVC)을 분절시키고 재편하고 있는지 거시적 관점으로 조망합니다.'
          ],
          styleVariant: 'default'
        },
        {
          id: 'ch7-ref2',
          title: '관련 학술 연구 및 논문',
          badge: '연구 문헌',
          badgeColor: 'rose',
          content: [
            '📄 [논문] "미국 통상정책의 헌법적 한계와 의회의 역할: 무역확장법 제232조를 중심으로" (2021)',
            '- 요약: 행정부가 "국가 안보"를 광범위하게 해석하여 관세를 부과하는 행위가 미국 헌법의 삼권분립 원칙을 어떻게 훼손해왔는지 판례 중심으로 짚어본 법학 연구입니다.'
          ],
          styleVariant: 'accent'
        }
      ],
      footerNote: '국제 무역은 단순한 셈법을 넘어, 국가 간의 신뢰와 법적 규범 위에서 작동합니다.',
    }
  ],
};

export default initialBookData;
