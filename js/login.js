/* ============================================================
   BOMBAS ÊXITO — LOGIN
   ============================================================ */

const $ = s => document.querySelector(s);

const Store = {
  get(key, fallback){
    try{ const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch{ return fallback; }
  }
};

const SESSION_KEY = 'exito_admin_session';

/* Se já tem sessão ativa, vai direto para o painel */
if(sessionStorage.getItem(SESSION_KEY) === 'ok'){
  window.location.href = 'bombasexito.html';
}

/* Garantir config base */
if(!localStorage.getItem('exito_config')){
  localStorage.setItem('exito_config', JSON.stringify(CONFIG));
}

document.addEventListener('DOMContentLoaded', () => {
  const form = $('#loginForm');
  if(!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const user = $('#loginUser').value.trim();
    const pass = $('#loginPass').value;
    const cfg = Store.get('exito_config', CONFIG);

    const adminUser = cfg.admin?.user || 'admin';
    const adminPass = cfg.admin?.pass || 'exito2025';

    if(user === adminUser && pass === adminPass){
      sessionStorage.setItem(SESSION_KEY, 'ok');
      window.location.href = 'exitoadmin.html';
    } else {
      $('#loginError').textContent = '❌ Credenciais inválidas. Tenta novamente.';
      $('#loginPass').value = '';
      $('#loginPass').focus();
    }
  });
});