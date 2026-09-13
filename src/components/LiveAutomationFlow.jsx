import { useState } from 'react';
import { MessageSquare, ArrowRight, Database, Bot, CheckCircle2, RefreshCw } from 'lucide-react';

const SCENARIOS = [
  {
    id: 'lead',
    name: '01 // WhatsApp Lead Ön Eleme',
    channel: 'WhatsApp Webhook',
    userMessage: 'Merhaba, B2B e-ticaret sitemiz için müşteri hizmetleri yapay zeka asistanı kurmak istiyoruz, ortalama kurulum süresi ve maliyet nedir?',
    aiClassification: 'Niyet: "fiyat_ve_kurulum_talebi" • Güven: 0.98',
    dbAction: 'CRM (HubSpot/Airtable): Yeni Nitelikli Lead oluşturuldu • Sektör: E-Ticaret',
    botReply: 'Merhaba! Era Dijital AI sistemimizle WhatsApp ve web asistanı kurulumları genellikle 3-5 iş gününde canlıya alınmaktadır. Asistan paketlerimiz 18.000 TL kurulum ve 6.000 TL/ay bakım ile başlamaktadır. İhtiyacınıza en uygun mimariyi belirlemek için ücretsiz ön analiz toplantısı planlayalım mı?',
    latency: '1.14s',
    tokens: '148 tokens'
  },
  {
    id: 'booking',
    name: '02 // Otomatik Randevu & Takvim',
    channel: 'Instagram DM Webhook',
    userMessage: 'Yarın saat 14:00 için danışmanlık randevusu alabilir miyim?',
    aiClassification: 'Niyet: "randevu_olusturma" • Parametreler: { tarih: "2026-09-09", saat: "14:00" }',
    dbAction: 'Google Calendar API: Slot doğrulandı (BOŞ) • Rezervasyon kilitlendi • Google Meet linki üretildi',
    botReply: 'Harika! Yarın (Çarşamba) saat 14:00 için danışmanlık randevunuz rezerve edildi. Takvim davetiniz ve görüşme linkiniz WhatsApp üzerinden de SMS ile iletilmiştir. Görüşmek üzere!',
    latency: '0.89s',
    tokens: '92 tokens'
  },
  {
    id: 'support',
    name: '03 // 7/24 Bilgi Tabanı & SSS',
    channel: 'Web Sohbet Widget',
    userMessage: 'Mevcut muhasebe programımızla (Paraşüt / Logo) entegre çalışabilir mi?',
    aiClassification: 'Niyet: "entegrasyon_sorgusu" • Vektör Arama: "accounting_integration_doc_v2"',
    dbAction: 'Vektör Veritabanı (Pinecone): Benzerlik skoru 0.94 • Webhook köprüsü hazır',
    botReply: 'Evet! Era Dijital otomasyonları REST API ve Webhook desteği olan Paraşüt, Logo, Ticimax, Shopify ve Ideasoft gibi sistemlerle çift yönlü veri akışıyla tam entegre çalışmaktadır.',
    latency: '0.96s',
    tokens: '118 tokens'
  }
];

export default function LiveAutomationFlow() {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const scenario = SCENARIOS[activeScenarioIndex];

  return (
    <div className="w-full tech-panel overflow-hidden border border-border/70 bg-surface shadow-2xl">
      {/* Terminal Title Bar */}
      <div className="px-4 py-3 bg-[#0d111a] border-b border-border flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-signal-emerald animate-pulse"></span>
          <span className="font-mono text-xs text-ink font-medium tracking-wide">
            ERA-ENGINE // CANLI OTOMASYON SİMÜLATÖRÜ
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px] text-ink-faint">
          <span className="text-signal-emerald">SLA: 200 OK</span>
          <span>•</span>
          <span>Gecikme: {scenario.latency}</span>
        </div>
      </div>

      {/* Scenario Tabs */}
      <div className="px-3 pt-3 pb-2 border-b border-border bg-[#0d111a]/50 flex flex-wrap gap-2">
        {SCENARIOS.map((s, idx) => {
          const isActive = idx === activeScenarioIndex;
          return (
            <button
              key={s.id}
              onClick={() => setActiveScenarioIndex(idx)}
              className={`font-mono text-xs px-3 py-1.5 rounded transition-colors text-left flex items-center gap-2 ${
                isActive
                  ? 'bg-primary text-white font-medium shadow-sm'
                  : 'text-ink-muted hover:text-ink hover:bg-surface-elevated'
              }`}
            >
              <span>{s.name}</span>
            </button>
          );
        })}
      </div>

      {/* Blueprint Visualizer Content */}
      <div className="p-5 sm:p-6 space-y-4 font-sans text-sm">
        {/* Step 1: Ingress */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] text-ink-faint uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-signal-blue"></span>
              [ADIM 1] Girdi Kanalı: {scenario.channel}
            </span>
            <span className="font-mono text-[10px] text-ink-faint">T+0.00s</span>
          </div>
          <div className="p-3 rounded bg-surface-elevated border border-border text-ink flex items-start gap-3">
            <MessageSquare className="w-4 h-4 text-signal-blue shrink-0 mt-0.5" />
            <p className="leading-relaxed text-xs sm:text-sm text-slate-200">
              "{scenario.userMessage}"
            </p>
          </div>
        </div>

        {/* Step 2: Processing & Reasoning */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 rounded bg-[#0e131f] border border-border/80 space-y-1">
            <span className="font-mono text-[11px] text-ink-faint uppercase flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-primary" />
              [ADIM 2] Semantik Niyet Analizi
            </span>
            <p className="font-mono text-[11px] text-blue-300/90 leading-tight">
              {scenario.aiClassification}
            </p>
          </div>

          <div className="p-3 rounded bg-[#0e131f] border border-border/80 space-y-1">
            <span className="font-mono text-[11px] text-ink-faint uppercase flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-signal-emerald" />
              [ADIM 3] Veritabanı & Entegrasyon
            </span>
            <p className="font-mono text-[11px] text-emerald-300/90 leading-tight">
              {scenario.dbAction}
            </p>
          </div>
        </div>

        {/* Step 3: Outbound Response */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] text-ink-faint uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-1.5 h-1.5 text-signal-emerald" />
              [ADIM 4] Müşteriye İletilen Yanıt
            </span>
            <span className="font-mono text-[10px] text-signal-emerald">Tamamlandı: {scenario.latency}</span>
          </div>
          <div className="p-3.5 rounded bg-surface-elevated/90 border border-primary/30 text-ink leading-relaxed text-xs sm:text-sm">
            <p className="text-slate-100">
              {scenario.botReply}
            </p>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] font-mono text-ink-faint">
          <span>İşlenen Model: Era-Orchestrator v2.4</span>
          <span>{scenario.tokens} • Güvenlik: PII Maskeleme Aktif</span>
        </div>
      </div>
    </div>
  );
}