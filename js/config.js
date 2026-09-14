const CONFIG = {
  empresa: {
    nome: "Bombas Êxito",
    cidade: "Quelimane",
    pais: "Moçambique",
    endereco: "Quelimane, Moçambique",
    horario: "Segunda a Domingo — 06h00 às 22h00",
    email: "geral@bombasexito.co.mz",
    telefone: "258871632577",
    logo: "assets/images/logo.png"
  },

  whatsapp: "25871632577",

  // ============ PREÇOS OFICIAIS (Quelimane / ARENE) ============
  precos: {
    gasolina: 98.14,
    diesel: 120.70,
    querosene: 97.56,
    lubrificante: 300
  },

  // ============ ENTREGA ============
  entrega: {
    ativa: true,
    gratisAcimaDe: null,   // 50L ou mais = entrega grátis
    levantamento: 30,    // valor do levantamento no estabelecimento

    // Zonas (valor normal, entrega até 1 hora)
    zonas: [
      { nome: "Arredores",            valor: 50,  tempo: "até 1 hora" },
      { nome: "Centro de Quelimane",  valor: 80,  tempo: "até 1 hora" },
      { nome: "Subúrbio",             valor: 110, tempo: "até 1 hora" }
    ],

    // Modo premium: entrega em até 30 min, valor = dobro da zona
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
    user: "admin",
    pass: "exito2025"
  },

  mensagemWhatsApp: "Olá, Bombas Êxito! Gostaria de fazer um pedido de combustível.",
};

const PRODUTOS_PADRAO = [
  { id: "gasolina",    nome: "Gasolina",     preco: 98.14,  unidade: "MT/L",  disponivel: true, icon: "⛽",  desc: "Gasolina premium" },
  { id: "diesel",      nome: "Diesel",       preco: 120.70, unidade: "MT/L",  disponivel: true, icon: "🛢️", desc: "Diesel rodoviário" },
  { id: "querosene",   nome: "Querosene",    preco: 97.56,  unidade: "MT/L",  disponivel: true, icon: "🔥",  desc: "Querosene doméstico" },
  { id: "lubrificante", nome: "Lubrificante", preco: 300,   unidade: "MT/un", disponivel: true, icon: "⚙️", desc: "Óleos e lubrificantes" }
];

window.CONFIG = CONFIG;
window.PRODUTOS_PADRAO = PRODUTOS_PADRAO;