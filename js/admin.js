/* ============================================================
   BOMBAS ÊXITO — ADMIN
   ⚠️ Verifica sessão no início. Se não estiver logado → login.html
   ============================================================ */

const SESSION_KEY = 'exito_admin_session';

/* ---------- VERIFICAÇÃO DE SESSÃO (ANTES DE TUDO) ---------- */
if(sessionStorage.getItem(SESSION_KEY) !== 'ok'){
  window.location.replace('login.html');
}

/* ---------- HELPERS ---------- */
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const Store = {
  get(key, fallback){
    try{ const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch{ return fallback; }
  },
  set(key, v){ localStorage.setItem(key, JSON.stringify(v)); }
};

/* ---------- GARANTIR DADOS BASE ---------- */
function ensureData(){
  if(!localStorage.getItem('exito_config'))    Store.set('exito_config', CONFIG);
  if(!localStorage.getItem('exito_produtos'))  Store.set('exito_produtos', PRODUTOS_PADRAO);
  if(!localStorage.getItem('exito_pedidos'))   Store.set('exito_pedidos', []);
}
ensureData();

/* ---------- MOSTRAR PAINEL (só após confirmar sessão) ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const app = $('#adminApp');
  if(app) app.style.visibility = 'visible';

  // Boas-vindas
  const d = new Date();
  const dataFmt = d.toLocaleDateString('pt-PT', {
    weekday:'long', day:'numeric', month:'long', year:'numeric'
  });
  const horaFmt = d.toLocaleTimeString('pt-PT', {hour:'2-digit', minute:'2-digit'});
  const wd = $('#welcomeDate');
  if(wd) wd.textContent = `${dataFmt} · ${horaFmt}`;

  renderTudo();
});

/* ---------- LOGOUT ---------- */
$('#logoutBtn')?.addEventListener('click', () => {
  sessionStorage.removeItem(SESSION_KEY);
  window.location.replace('login.html');
});

/* ---------- RENDER GERAL ---------- */
function renderTudo(){
  renderSwitches();
  renderPendentes();
  renderHistorico();
}

/* ---------- SWITCHES ---------- */
function renderSwitches(){
  const lista = Store.get('exito_produtos', PRODUTOS_PADRAO);
  const el = $('#switchList');
  if(!el) return;

  el.innerHTML = lista.map(p => `
    <div class="switch-row">
      <div class="switch-info">
        <span class="sw-icon">${p.icon}</span>
        <div>
          <b>${p.nome}</b>
          <small>${p.disponivel ? '🟢 Disponível' : '⚪ Indisponível'}</small>
        </div>
      </div>
      <label class="switch">
        <input type="checkbox" data-id="${p.id}" ${p.disponivel ? 'checked' : ''}/>
        <span class="slider"></span>
      </label>
    </div>
  `).join('');

  $$('[data-id]').forEach(chk => {
    chk.addEventListener('change', () => {
      const lista = Store.get('exito_produtos', PRODUTOS_PADRAO);
      const p = lista.find(x => x.id === chk.dataset.id);
      if(p){ p.disponivel = chk.checked; Store.set('exito_produtos', lista); }
      renderSwitches();
    });
  });
}

/* ---------- PEDIDOS PENDENTES ---------- */
function renderPendentes(){
  const pedidos = Store.get('exito_pedidos', []);
  const pendentes = pedidos.filter(p =>
    p.status === 'PENDENTE' || p.status === 'PREPARACAO' || p.status === 'CAMINHO'
  );

  $('#pendentesCount').textContent = pendentes.length;

  const container = $('#pendentesList');
  if(!container) return;

  if(!pendentes.length){
    container.innerHTML = `<p class="empty">✅ Nenhum pedido pendente. Bom trabalho!</p>`;
    return;
  }

  container.innerHTML = pendentes.map(p => {
    const label = {
      PENDENTE:   { txt:'Pendente',       color:'#FFD200' },
      PREPARACAO: { txt:'Em preparação',  color:'#4D9FFF' },
      CAMINHO:    { txt:'A caminho',      color:'#FFA84D' }
    }[p.status] || { txt:'Pendente', color:'#FFD200' };

    return `
      <div class="receipt pending">
        <div class="receipt-head">
          <span class="receipt-id">${p.id.slice(-6)}</span>
          <span class="receipt-date">${new Date(p.data).toLocaleString('pt-PT')}</span>
        </div>
        <div class="receipt-body">
          <div class="receipt-row"><span>Cliente</span><b>${p.cliente}</b></div>
          <div class="receipt-row"><span>Telefone</span><b>${p.telefone}</b></div>
          <div class="receipt-row"><span>Produto</span><b>${p.produto}</b></div>
          <div class="receipt-row"><span>Qtd</span><b>${p.quantidade} ${p.unidade || 'L'}</b></div>
          <div class="receipt-row"><span>Modo</span><b>${p.modo === 'entrega' ? '🚚 Entrega' : '🏪 Levantamento'}</b></div>
          ${p.modo === 'entrega' ? `
            <div class="receipt-row"><span>Local</span><b>${p.endereco || '—'}</b></div>
            ${p.referencia ? `<div class="receipt-row"><span>Ref.</span><b>${p.referencia}</b></div>` : ''}
          ` : ''}
          <div class="receipt-row"><span>Entrega</span><b>${p.entrega === 0 ? 'GRÁTIS' : p.entrega + ' MT'}</b></div>
          <div class="receipt-row total"><span>TOTAL</span><b>${p.total} MT</b></div>
        </div>
        <div class="receipt-foot">
          <span class="status-dot" style="background:${label.color}"></span>
          <span style="color:${label.color};font-weight:600">${label.txt}</span>

          <div class="action-buttons">
            ${p.status !== 'CAMINHO' ? `
              <select class="mini-select" data-status="${p.id}">
                <option value="PREPARACAO" ${p.status==='PREPARACAO'?'selected':''}>Em preparação</option>
                <option value="CAMINHO" ${p.status==='CAMINHO'?'selected':''}>A caminho</option>
              </select>
            ` : ''}
            <button class="btn-action btn-entregue" data-entregue="${p.id}">✅ Entregue</button>
            <button class="btn-action btn-cancelar" data-cancelar="${p.id}">❌ Cancelado</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  $$('[data-entregue]').forEach(b => {
    b.addEventListener('click', () => {
      if(!confirm('Confirmar que este pedido foi ENTREGUE?')) return;
      atualizarStatus(b.dataset.entregue, 'ENTREGUE');
    });
  });

  $$('[data-cancelar]').forEach(b => {
    b.addEventListener('click', () => {
      if(!confirm('Cancelar este pedido?')) return;
      atualizarStatus(b.dataset.cancelar, 'CANCELADO');
    });
  });

  $$('[data-status]').forEach(sel => {
    sel.addEventListener('change', () => {
      atualizarStatus(sel.dataset.status, sel.value);
    });
  });
}

/* ---------- HISTÓRICO ---------- */
function renderHistorico(){
  const pedidos = Store.get('exito_pedidos', []);
  const historico = pedidos.filter(p =>
    p.status === 'ENTREGUE' || p.status === 'CANCELADO'
  );

  const entregues  = historico.filter(p => p.status === 'ENTREGUE').length;
  const cancelados = historico.filter(p => p.status === 'CANCELADO').length;

  $('#entreguesCount').textContent  = `${entregues} entregues`;
  $('#canceladosCount').textContent = `${cancelados} cancelados`;

  const body = $('#historicoBody');
  if(!body) return;

  if(!historico.length){
    body.innerHTML = `<tr><td colspan="8" class="empty">Ainda sem histórico.</td></tr>`;
    return;
  }

  body.innerHTML = historico.map(p => {
    const isEntregue = p.status === 'ENTREGUE';
    return `
      <tr>
        <td><b>${p.id.slice(-6)}</b></td>
        <td>${new Date(p.data).toLocaleDateString('pt-PT')}</td>
        <td>${p.cliente}</td>
        <td>${p.produto}</td>
        <td>${p.quantidade} ${p.unidade || 'L'}</td>
        <td>${p.modo === 'entrega' ? '🚚' : '🏪'}</td>
        <td><b>${p.total} MT</b></td>
        <td><span class="badge ${isEntregue ? 'badge-entregue' : 'badge-cancelado'}">
          ${isEntregue ? '✅ Entregue' : '❌ Cancelado'}
        </span></td>
      </tr>
    `;
  }).join('');
}

/* ---------- ATUALIZAR STATUS ---------- */
function atualizarStatus(id, novoStatus){
  const pedidos = Store.get('exito_pedidos', []);
  const p = pedidos.find(x => x.id === id);
  if(!p) return;
  p.status = novoStatus;
  Store.set('exito_pedidos', pedidos);
  renderPendentes();
  renderHistorico();
}

/* ---------- LIMPAR HISTÓRICO ---------- */
$('#clearHistory')?.addEventListener('click', () => {
  if(!confirm('Remover todos os pedidos finalizados do histórico?')) return;
  const pedidos = Store.get('exito_pedidos', []).filter(p =>
    p.status !== 'ENTREGUE' && p.status !== 'CANCELADO'
  );
  Store.set('exito_pedidos', pedidos);
  renderHistorico();
});

/* ---------- RECARREGAR CONFIG ---------- */
$('#resetBtn')?.addEventListener('click', () => {
  if(!confirm('Isto vai recarregar preços e produtos do config.js. Continuar?')) return;
  localStorage.removeItem('exito_config');
  localStorage.removeItem('exito_produtos');
  Store.set('exito_config', CONFIG);
  Store.set('exito_produtos', PRODUTOS_PADRAO);
  location.reload();
});