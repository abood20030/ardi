/* ====== بيانات النباتات (3 أنواع لكل نبات) ====== */
const PLANTS = [
  {
    id: 1,
    name: "القمح",
    type: "حبوب",
    rarity: "شائع",
    types: ["ديورم", "الهارد رِد", "إيمر"],
    img: "../public/images/wheat.png",
    desc: "محصول أساسي للدقيق والسميد؛ متكيّف مع مناخات متعددة."
  },
  {
    id: 2,
    name: "الأرز",
    type: "حبوب",
    rarity: "شائع",
    types: ["بسمتي", "جابونيكا", "إنديكا"],
    img: "../public/images/rice.JPG",
    desc: "محب للماء؛ أنواعه تتنوع بين طويل الحبة العطري واللزج القصير."
  },
  {
    id: 3,
    name: "الذرة",
    type: "حبوب",
    rarity: "شائع",
    types: ["دِنت", "فِلنْت", "حلوة"],
    img: "../public/images/maize.jpg",
    desc: "محصول متعدد الاستخدامات للأغذية والأعلاف والصناعة."
  },
  {
    id: 4,
    name: "الشعير",
    type: "حبوب",
    rarity: "غير شائع",
    types: ["مقشور", "صفّان", "ستة صفوف"],
    img: "../public/images/barley.jpg",
    desc: "يتحمل الظروف القاسية؛ يستخدم في الشوربات والمالت والأعلاف."
  },
  {
    id: 5,
    name: "الحمص",
    type: "بقوليات",
    rarity: "شائع",
    types: ["كبولي", "دِسي", "حمص أخضر"],
    img: "../public/images/chickpea.jpg",
    desc: "بروتين مرتفع ويسهم في تثبيت النيتروجين في التربة."
  },
  {
    id: 6,
    name: "العدس",
    type: "بقوليات",
    rarity: "غير شائع",
    types: ["بني", "أخضر", "أحمر (مقشور)"],
    img: "../public/images/lentil.jpg",
    desc: "سريع الطهي ومتحمل للجفاف."
  },
  {
    id: 7,
    name: "الزيتون",
    type: "أشجار",
    rarity: "غير شائع",
    types: ["نبالي", "كالاماتا", "أربِكينا"],
    img: "../public/images/olive.png",
    desc: "شجرة متوسطية للقيمة الزيتية والمائدة."
  },
  {
    id: 8,
    name: "النخيل (تمر)",
    type: "أشجار",
    rarity: "غير شائع",
    types: ["مجدول", "دقل نور", "برحي"],
    img: "../public/images/date.jpg",
    desc: "متحمل للصحارى؛ ثمار عالية الطاقة."
  },
  {
    id: 9,
    name: "الطماطم",
    type: "خضار",
    rarity: "شائع",
    types: ["رُوما", "كرزية", "بيف ستيك"],
    img: "../public/images/tomato.jpg",
    desc: "تُستهلك طازجة ومصنّعة على نطاق واسع."
  },
  {
    id: 10,
    name: "البطاطا",
    type: "خضار",
    rarity: "شائع",
    types: ["روسِت", "يوكون جولد", "ريد بونتياك"],
    img: "../public/images/potato.jpg",
    desc: "درنة بإنتاجية حرارية عالية للهكتار."
  },
  {
    id: 11,
    name: "الريحان",
    type: "أعشاب",
    rarity: "غير شائع",
    types: ["جنوفيسي", "تايلندي", "بيربل أوبال"],
    img: "../public/images/basil.jpg",
    desc: "عشبة عطرية تفضّل الدفء والشمس."
  },
  {
    id: 12,
    name: "الزعفران (الزعفران البنفسجي)",
    type: "أعشاب",
    rarity: "نادر",
    types: ["كشميري", "إسباني (كوبيه)", "إيراني (نِكِين)"],
    img: "../public/images/saffron.jpg",
    desc: "ينتج أغلى توابل العالم من مياسم الأزهار."
  },
  {
    id: 13,
    name: "الكينوا",
    type: "حبوب كاذبة",
    rarity: "غير شائع",
    types: ["ريال", "تيتيكاكا", "كينوا سوداء"],
    img: "../public/images/quinoa.jpg",
    desc: "بروتين كامل؛ يتحمل الملوحة والجفاف."
  },
  {
    id: 14,
    name: "التين",
    type: "فاكهة",
    rarity: "نادر",
    types: ["بلاك ميشن", "كادوتا", "كاليميرنا"],
    img: "../public/images/fig.jpg",
    desc: "ثمار طرية حلوة؛ يزدهر في الأجواء الدافئة."
  },
  {
    id: 15,
    name: "الرمان",
    type: "فاكهة",
    rarity: "غير شائع",
    types: ["وندرفل", "حِكاز", "منفلوتي"],
    img: "../public/images/pomegranate.jpg",
    desc: "حبوب غنية بمضادات الأكسدة؛ يتحمل الجفاف النسبي."
  }
];

/* ====== خيارات القوائم ====== */
const TYPE_OPTIONS = Array.from(new Set(PLANTS.map(p => p.type))).sort((a,b)=>a.localeCompare(b,'ar'));
const RARITY_ORDER = ["شائع","غير شائع","نادر"];
const RARITY_OPTIONS = RARITY_ORDER.slice();

/* ====== عناصر DOM ====== */
const els = {
  q: document.getElementById('q'),
  type: document.getElementById('typeFilter'),
  rarity: document.getElementById('rarityFilter'),
  sort: document.getElementById('sortBy'),
  reset: document.getElementById('resetAll'),
  chips: document.getElementById('activeChips'),
  grid: document.getElementById('plantsGrid'),
  count: document.getElementById('resultsCount'),
  tpl: document.getElementById('plantCardTpl')
};

/* ====== بناء الخيارات ====== */
function fillSelect(select, items){
  select.innerHTML = "";
  items.forEach(v=>{
    const o = document.createElement('option');
    o.value = v; o.textContent = v;
    select.appendChild(o);
  });
}
fillSelect(els.type, TYPE_OPTIONS);
fillSelect(els.rarity, RARITY_OPTIONS);

/* ====== أدوات مساعدة ====== */
const debounce = (fn, ms=180)=>{ let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a),ms);} };
const selected = sel => Array.from(sel.selectedOptions).map(o=>o.value);
const rarityRank = r => RARITY_ORDER.indexOf(r);

function matchesQuery(p, q){
  if(!q) return true;
  const hay = [
    p.name, p.type, p.rarity, ...(p.types||[])
  ].join(" ").toLowerCase();
  return hay.includes(q.trim().toLowerCase());
}

/* ====== رندرة الشرائح (chips) ====== */
function renderChips(state){
  els.chips.innerHTML = "";
  const mk = (label, onRemove)=>{
    const d = document.createElement('div');
    d.className="chip";
    d.innerHTML = `<span>${label}</span><button aria-label="حذف">×</button>`;
    d.querySelector('button').addEventListener('click', onRemove);
    els.chips.appendChild(d);
  };
  if(state.q) mk(`بحث: “${state.q}”`, ()=>{ els.q.value=""; update(); });
  state.types.forEach(t => mk(`نوع: ${t}`, ()=>{ unselect(els.type, t); update(); }));
  state.rarities.forEach(r => mk(`الندرة: ${r}`, ()=>{ unselect(els.rarity, r); update(); }));
}

function unselect(select, val){
  Array.from(select.options).forEach(o=>{ if(o.value===val) o.selected=false; });
}

/* ====== رندرة النتائج ====== */
function render(items){
  els.grid.innerHTML = "";
  if(items.length===0){
    const empty = document.createElement('div');
    empty.className = "card";
    empty.style.borderStyle = "dashed";
    empty.innerHTML = `<p class="card-desc" style="margin:0">لا توجد نتائج مطابقة. جرّب تعديل البحث أو مسح بعض الفلاتر.</p>`;
    els.grid.appendChild(empty);
    return;
  }
  items.forEach(p=>{
    const node = els.tpl.content.cloneNode(true);
    const img = node.querySelector('.card-img');
    img.src = p.img || "../public/images/placeholder.png";
    img.alt = p.name;

    node.querySelector('.card-title').textContent = p.name;

    const typeB = node.querySelector('.badge.type');
    typeB.textContent = p.type;

    const rarB = node.querySelector('.badge.rarity');
    rarB.textContent = p.rarity;
    rarB.setAttribute('data-rarity', p.rarity);

    node.querySelector('.card-desc').textContent = p.desc;

    const wrap = node.querySelector('.card-types');
    (p.types||[]).forEach(t=>{
      const pill = document.createElement('span');
      pill.className = "type-pill";
      pill.textContent = t;
      wrap.appendChild(pill);
    });

    els.grid.appendChild(node);
  });
}

/* ====== تطبيق الفلاتر والفرز ====== */
function apply(state){
  let list = PLANTS.filter(p =>
    matchesQuery(p, state.q) &&
    (state.types.length ? state.types.includes(p.type) : true) &&
    (state.rarities.length ? state.rarities.includes(p.rarity) : true)
  );

  switch(state.sort){
    case "name-asc": list.sort((a,b)=> a.name.localeCompare(b.name,'ar')); break;
    case "name-desc": list.sort((a,b)=> b.name.localeCompare(a.name,'ar')); break;
    case "rarity-asc": list.sort((a,b)=> rarityRank(a.rarity)-rarityRank(b.rarity) || a.name.localeCompare(b.name,'ar')); break;
    case "rarity-desc": list.sort((a,b)=> rarityRank(b.rarity)-rarityRank(a.rarity) || a.name.localeCompare(b.name,'ar')); break;
  }

  return list;
}

/* ====== الحالة والتحديث ====== */
function state(){
  return {
    q: els.q.value.trim(),
    types: selected(els.type),
    rarities: selected(els.rarity),
    sort: els.sort.value
  };
}
function update(){
  const s = state();
  renderChips(s);
  const items = apply(s);
  els.count.textContent = items.length;
  render(items);
}

/* ====== أحداث ====== */
els.q.addEventListener('input', debounce(update, 150));
els.type.addEventListener('change', update);
els.rarity.addEventListener('change', update);
els.sort.addEventListener('change', update);

document.querySelectorAll('[data-clear]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const which = btn.getAttribute('data-clear');
    if(which==='type'){ Array.from(els.type.options).forEach(o=>o.selected=false); }
    if(which==='rarity'){ Array.from(els.rarity.options).forEach(o=>o.selected=false); }
    update();
  });
});

els.reset.addEventListener('click', ()=>{
  els.q.value = "";
  Array.from(els.type.options).forEach(o=>o.selected=false);
  Array.from(els.rarity.options).forEach(o=>o.selected=false);
  els.sort.value = "name-asc";
  update();
});

/* ====== تشغيل أولي ====== */
update();
