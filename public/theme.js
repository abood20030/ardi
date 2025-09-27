(function(){
  const root = document.documentElement;

  function setTheme(theme){
    root.setAttribute('data-theme', theme);
    try{ localStorage.setItem('theme', theme); }catch(e){}
    updateButtons(theme);
  }

  function updateButtons(theme){
    document.querySelectorAll('[data-theme-toggle]').forEach(btn=>{
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      btn.title = theme === 'dark' ? 'الوضع الداكن مفعل — اضغط للتبديل' : 'الوضع الفاتح مفعل — اضغط للتبديل';
    });
  }

  function toggle(){
    const current = root.getAttribute('data-theme') || 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  // ربط الأزرار
  document.addEventListener('click', (e)=>{
    const btn = e.target.closest('[data-theme-toggle]');
    if(!btn) return;
    e.preventDefault();
    toggle();
  });

  // تهيئة حالة الأزرار عند التحميل
  updateButtons(root.getAttribute('data-theme') || 'light');
})();
