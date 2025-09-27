// public/js/chart-population.js
// يعمل تلقائياً مع http(s):// (fetch) أو file:// (inline JSON داخل الصفحة)

(async function () {
  const DATA_URL = window.__DATA_URL__ || "../public/data/jordan_population_urban_rural.json";

  const canvas = document.getElementById("popChart");
  const legend = document.getElementById("chartLegend");
  const meta   = document.getElementById("chartMeta");
  const dlBtn  = document.querySelector("[data-download]");

  function showError(msg) {
    console.error("[Chart Error]", msg);
    if (legend) legend.innerHTML = `<div style="color:#ef4444;font-size:14px">⚠️ ${msg}</div>`;
  }

  if (!canvas) { showError('لم يتم العثور على <canvas id="popChart">'); return; }
  if (typeof window.Chart === "undefined") { showError("Chart.js غير محمّل."); return; }

  // 1) نحاول fetch أولاً (http/https)
  let data = null;
  try {
    const res = await fetch(DATA_URL, { cache: "no-store" });
    if (res.ok) data = await res.json();
  } catch (e) {
    // سنجرب inline أدناه
  }

  // 2) لو فشل fetch (file:// غالباً)، نقرأ من inline JSON داخل الصفحة
  if (!data) {
    const inlineTag = document.getElementById("popData");
    if (inlineTag) {
      try { data = JSON.parse(inlineTag.textContent); }
      catch (e) { showError("JSON inline غير صالح. راجع المحتوى داخل العنصر id=\"popData\"."); return; }
    } else {
      showError("فشل الجلب عبر fetch() وإذا تفتح الملف كـ file:// استخدم خادم محلي أو أضف JSON داخل الصفحة بعنصر id=\"popData\".");
      return;
    }
  }

  // فحص البنية
  if (!data.labels || !data.datasets || !Array.isArray(data.labels)) {
    showError("بنية JSON غير صحيحة. يلزم { labels:[], datasets:{ urban:[], rural:[] } }.");
    return;
  }

  const labels = data.labels;
  const urban  = data.datasets.urban || [];
  const rural  = data.datasets.rural || [];
  const area   = data.meta?.area || "الأردن";
  const unit   = data.meta?.unit || "1000 No";
  const source = data.meta?.source || "FAOSTAT";

  try {
    const ctx = canvas.getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: `${area} — سكان الحضر (1000)`,
            data: urban,
            fill: "origin",
            backgroundColor: "rgba(220, 53, 69, 0.7)",
            borderColor: "rgba(220, 53, 69, 1)",
            borderWidth: 1.5,
            tension: 0.25,
            pointRadius: 0,
            stack: "pop"
          },
          {
            label: `${area} — سكان الريف (1000)`,
            data: rural,
            fill: "origin",
            backgroundColor: "rgba(0, 123, 255, 0.7)",
            borderColor: "rgba(0, 123, 255, 1)",
            borderWidth: 1.5,
            tension: 0.25,
            pointRadius: 0,
            stack: "pop"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        scales: {
          x: { ticks: { autoSkip: true, maxTicksLimit: 12 } },
          y: { beginAtZero: true, grace: "5%", title: { display: true, text: unit } }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const v = ctx.parsed.y ?? 0;
                return `${ctx.dataset.label}: ${new Intl.NumberFormat('ar-EG',{ maximumFractionDigits: 3 }).format(v)}`;
              }
            }
          }
        }
      }
    });

    if (legend) {
      legend.innerHTML = `
        <div class="legend-item">
          <span class="dot" style="background:rgba(0,123,255,1)"></span>
          <span>${area}<br/>سكان الريف (1000)<br/>تقديرات السكان 2008 راجعة</span>
        </div>
        <div class="legend-item">
          <span class="dot" style="background:rgba(220,53,69,1)"></span>
          <span>${area}<br/>سكان الحضر (1000)<br/>تقديرات السكان 2008 راجعة</span>
        </div>
      `;
    }
    if (meta) meta.textContent = `المصدر: ${source} — الوحدة: ${unit}`;

    if (dlBtn) {
      dlBtn.addEventListener("click", () => {
        const a = document.createElement("a");
        a.href = chart.toBase64Image();
        a.download = "jordan_rural_urban_1990_2023.png";
        a.click();
      });
    }
  } catch (e) {
    showError("حصل خطأ أثناء رسم المخطط. راجع الكونسول.");
    console.error(e);
  }
})();
