const CONFIG = {
  empresa: {
    nome: "Bombas Êxito",
    cidade: "Quelimane",
    pais: "Moçambique",
    endereco: "Quelimane, Moçambique",
    horario: "Segunda a Domingo — 05h00 às 22h00",
    email: "bombasexito@gmail.com",
    telefone: "258871632577",
    logo: "assets/images/logo.png"
  },

  whatsapp: "258871632577",

  precos: {
    gasolina: 98.14,
    diesel: 120.70,
    lubrificante: 300
  },

  entrega: {
    ativa: true,
    gratisAcimaDe: null,
    levantamento: 30,
    zonas: [
      { nome: "Arredores",            valor: 50,  tempo: "até 1 hora" },
      { nome: "Centro de Quelimane",  valor: 80,  tempo: "até 1 hora" },
      { nome: "Subúrbio",             valor: 110, tempo: "até 1 hora" }
    ],
    premium: {
      ativo: true,
      tempo: "até 30 minutos",
      multiplicador: 2
    }
  },

  quantidade: {
    minima: 1,
    maxima: 500,
    rapida: [5, 10, 20, 30, 50],
    unidade: "L"
  },

  admin: {
    user: "gerente",
    pass: "Quelimane2026"
  },

  mensagemWhatsApp: "Olá, Bombas Êxito! Gostaria de fazer um pedido de combustível.",

  // ============ SUPABASE ============
  supabase: {
    url: "https://cioimqtlhjmnrrtympuk.supabase.co",
    key: "sb_publishable_A9FacMkYBdXXVTzFJE9tVQ_I7xo-ErH"
  }
};

const PRODUTOS_PADRAO = [
  { id: "gasolina",    nome: "Gasolina",     preco: 98.14,  unidade: "MT/L",  disponivel: true, icon: "⛽",  desc: "Gasolina premium" },
  { id: "diesel",      nome: "Diesel",       preco: 120.70, unidade: "MT/L",  disponivel: true, icon: "🛢️", desc: "Diesel rodoviário" },
  { id: "lubrificante", nome: "Lubrificante", preco: 300,   unidade: "MT/un", disponivel: true, icon: "⚙️", desc: "Óleos e lubrificantes" }
];

window.CONFIG = CONFIG;
window.PRODUTOS_PADRAO = PRODUTOS_PADRAO;