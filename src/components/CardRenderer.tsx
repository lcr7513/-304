import React, { useState, useEffect } from 'react';
import { CardItem, ReadingMode, FontSize } from '../types';
import { TrendingUp, Quote, Sparkles } from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart
} from 'recharts';

interface CardRendererProps {
  card: CardItem;
  index: number;
  readingMode: ReadingMode;
  fontSize: FontSize;
}

export const CardRenderer: React.FC<CardRendererProps> = ({
  card,
  index,
  readingMode,
  fontSize,
}) => {

  const [base64Image, setBase64Image] = useState<string | null>(null);

  useEffect(() => {
    if (card.imageUrl) {
      // Fetch image and convert to base64 to avoid html2canvas CORS taint issues
      fetch(card.imageUrl)
        .then(res => res.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setBase64Image(reader.result as string);
          };
          reader.readAsDataURL(blob);
        })
        .catch(err => {
          console.warn('Failed to fetch image for base64 conversion', err);
        });
    }
  }, [card.imageUrl]);

  const fontClass = {
    sm: 'text-xs md:text-sm leading-relaxed',
    base: 'text-sm md:text-base leading-relaxed',
    lg: 'text-base md:text-lg leading-relaxed',
  }[fontSize];

  const titleFontClass = {
    sm: 'text-base md:text-lg font-bold',
    base: 'text-lg md:text-xl font-bold',
    lg: 'text-xl md:text-2xl font-bold',
  }[fontSize];

  const isDark = readingMode === 'dark';
  const isSepia = readingMode === 'sepia';

  const baseCardBg = isDark
    ? 'bg-neutral-900/80 border-neutral-800 text-neutral-100 shadow-lg'
    : isSepia
    ? 'bg-[#fcf8f2] border-[#e7dec8] text-[#3d3226] shadow-sm'
    : 'bg-white border-neutral-200/90 text-neutral-800 shadow-sm';

  const accentBorder = isDark
    ? 'border-emerald-500/30 hover:border-emerald-500/60'
    : isSepia
    ? 'border-amber-600/30 hover:border-amber-600/60'
    : 'border-emerald-600/20 hover:border-emerald-600/50';

  const badgeColorMap: Record<string, string> = {
    emerald: isDark ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-emerald-50 text-emerald-800 border-emerald-200',
    amber: isDark ? 'bg-amber-950 text-amber-300 border-amber-800' : 'bg-amber-50 text-amber-800 border-amber-200',
    blue: isDark ? 'bg-blue-950 text-blue-300 border-blue-800' : 'bg-blue-50 text-blue-800 border-blue-200',
    purple: isDark ? 'bg-purple-950 text-purple-300 border-purple-800' : 'bg-purple-50 text-purple-800 border-purple-200',
    rose: isDark ? 'bg-rose-950 text-rose-300 border-rose-800' : 'bg-rose-50 text-rose-800 border-rose-200',
    indigo: isDark ? 'bg-indigo-950 text-indigo-300 border-indigo-800' : 'bg-indigo-50 text-indigo-800 border-indigo-200',
  };

  const badgeClass = badgeColorMap[card.badgeColor || 'emerald'] || (
    isDark
      ? 'bg-neutral-800 text-neutral-300 border-neutral-700'
      : isSepia
      ? 'bg-[#ede3d1] text-[#6b583f] border-[#ded0b9]'
      : 'bg-neutral-100 text-neutral-700 border-neutral-200'
  );

  const isQuote = card.styleVariant === 'quote' || !!card.quote;
  const isMetric = card.styleVariant === 'metric' || !!card.stat;
  const isContrast = card.styleVariant === 'contrast';
  const isAccent = card.styleVariant === 'accent';

  const renderChart = (chart: NonNullable<CardItem['chart']>) => {
    const commonProps = {
      margin: { top: 10, right: 10, left: -20, bottom: 0 },
    };

    if (chart.type === 'bar') {
      return (
        <BarChart data={chart.data} {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" opacity={isDark ? 0.1 : 0.4} />
          <XAxis dataKey={chart.xAxisKey} tick={{ fontSize: 11, fill: isDark ? '#a3a3a3' : '#525252' }} />
          <YAxis tick={{ fontSize: 11, fill: isDark ? '#a3a3a3' : '#525252' }} />
          <Tooltip contentStyle={{ borderRadius: '8px', backgroundColor: isDark ? '#262626' : '#fff', color: isDark ? '#fff' : '#000' }} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          {chart.series.map((s) => (
            <Bar key={s.key} dataKey={s.key} name={s.name} fill={s.color} radius={[4, 4, 0, 0]} />
          ))}
        </BarChart>
      );
    }
    
    if (chart.type === 'pie') {
      return (
        <PieChart>
          <Pie
            data={chart.data}
            dataKey={chart.series[0].key}
            nameKey={chart.xAxisKey}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {chart.data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={chart.series[0].colors?.[index % (chart.series[0].colors?.length || 1)] || '#10b981'} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: '8px', backgroundColor: isDark ? '#262626' : '#fff' }} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
        </PieChart>
      );
    }

    if (chart.type === 'composed') {
      return (
        <ComposedChart data={chart.data} {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" opacity={isDark ? 0.1 : 0.4} />
          <XAxis dataKey={chart.xAxisKey} tick={{ fontSize: 11, fill: isDark ? '#a3a3a3' : '#525252' }} />
          <YAxis yAxisId="left" tick={{ fontSize: 11, fill: isDark ? '#a3a3a3' : '#525252' }} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: isDark ? '#a3a3a3' : '#525252' }} />
          <Tooltip contentStyle={{ borderRadius: '8px', backgroundColor: isDark ? '#262626' : '#fff', color: isDark ? '#fff' : '#000' }} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          {chart.series.map((s) => {
            if (s.type === 'line') {
              return <Line yAxisId="right" key={s.key} type="monotone" dataKey={s.key} name={s.name} stroke={s.color} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />;
            }
            return <Bar yAxisId="left" key={s.key} dataKey={s.key} name={s.name} fill={s.color} radius={[4, 4, 0, 0]} />;
          })}
        </ComposedChart>
      );
    }
    return null;
  };

  return (
    <div
      className={`relative group rounded-xl p-5 md:p-6 transition-all duration-200 border flex flex-col justify-between ${baseCardBg} ${
        isAccent ? accentBorder : ''
      } ${
        isContrast && isDark
          ? 'bg-neutral-900 border-rose-900/40'
          : isContrast
          ? 'bg-rose-50/40 border-rose-200'
          : ''
      } break-inside-avoid`}
    >
      <div>
        {/* Card Header: Category & Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {card.category && (
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                {card.category}
              </span>
            )}
            {card.badge && (
              <span
                className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border whitespace-nowrap ${badgeClass}`}
              >
                {card.badge}
              </span>
            )}
          </div>
          <span className="text-xs font-mono font-medium text-neutral-400 dark:text-neutral-500">
            #{String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Card Title & Subtitle */}
        <h3 className={`${titleFontClass} mb-1 tracking-tight text-neutral-900 dark:text-neutral-100`}>
          {card.title}
        </h3>
        {card.subtitle && (
          <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mb-4 font-medium">
            {card.subtitle}
          </p>
        )}

        {/* Image Rendering */}
        {card.imageUrl && (
          <div className="my-4 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 print:border-0 print:rounded-none">
            <img src={base64Image || card.imageUrl} alt={card.imageAlt || 'Card image'} crossOrigin="anonymous" className="w-full h-auto object-cover max-h-64" />
          </div>
        )}

        {/* Chart Rendering */}
        {card.chart && (
          <div className="w-full h-64 my-6">
            <ResponsiveContainer width="100%" height="100%">
              {renderChart(card.chart)}
            </ResponsiveContainer>
          </div>
        )}

        {/* Table Rendering */}
        {card.table && (
          <div className="my-4 overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-700">
            <table className="w-full text-sm text-left">
              <thead className={`text-xs uppercase bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300`}>
                <tr>
                  {card.table.headers.map((h, i) => (
                    <th key={i} className="px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {card.table.rows.map((row, i) => (
                  <tr key={i} className="border-b dark:border-neutral-700 last:border-0 hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                    {row.map((cell, j) => (
                      <td key={j} className="px-4 py-3 font-medium">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Metric / Stat Display */}
        {isMetric && card.stat && (
          <div
            className={`my-3 p-4 rounded-lg border ${
              isDark
                ? 'bg-neutral-800/60 border-neutral-700/80'
                : isSepia
                ? 'bg-[#f4ebd9] border-[#dfcfb0]'
                : 'bg-neutral-50 border-neutral-200/80'
            }`}
          >
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-black tracking-tight text-emerald-600 dark:text-emerald-400">
                {card.stat.value}
              </span>
              {card.stat.change && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {card.stat.change}
                </span>
              )}
            </div>
            <p className="text-xs md:text-sm font-medium text-neutral-700 dark:text-neutral-300 mt-1">
              {card.stat.label}
            </p>
            {card.stat.source && (
              <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-1 italic">
                출처: {card.stat.source}
              </p>
            )}
          </div>
        )}

        {/* Quote Display */}
        {isQuote && card.quote && (
          <div
            className={`my-3 p-4 rounded-lg border-l-4 italic ${
              isDark
                ? 'bg-neutral-800/40 border-amber-500 text-amber-200/90'
                : isSepia
                ? 'bg-[#f5ecdd] border-amber-700 text-[#54432f]'
                : 'bg-amber-50/70 border-amber-500 text-amber-950'
            }`}
          >
            <div className="flex items-start gap-2">
              <Quote className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
              <p className={`${fontClass} font-serif`}>{card.quote}</p>
            </div>
          </div>
        )}

        {/* Content Bullet Points */}
        {card.content && card.content.length > 0 && (
          <div className="space-y-4 mt-4 text-justify print:text-black">
            {card.content.map((point, idx) => (
              <p key={idx} className={`${fontClass} text-neutral-700 dark:text-neutral-300 print:text-black`}>
                {point}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Card subtle bottom tag */}
      <div className="mt-4 pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-400 dark:text-neutral-500">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-neutral-400" />
          인사이트 요약
        </span>
        <span className="font-mono text-[10px]">VERIFIED</span>
      </div>
    </div>
  );
};
