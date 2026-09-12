const CONFIG = {
  empresa: {
    nome: "Bombas Êxito",
    cidade: "Quelimane",
    pais: "Moçambique",
    endereco: "Quelimane, Moçambique",
    horario: "Segunda a Domingo — 06h00 às 22h00",
    email: "bombasexitoquelimane@gmail.com",
    telefone: "+25871632577",
    logo: "assents/images/logo.png"
  },

  whatsapp: "258871632577",

  // Preços por litro (base Quelimane + 20)
  precos: {
    gasolina: 118,
    diesel: 140,
    lubrificante: 300
  },

  // Delivery automático
  entrega: {
    ativa: true,
    gratisAcimaDe: 50,
    zonas: [
      { nome: "Centro de Quelimane", valor: 40 },
      { nome: "Arredores", valor: 20 },
      { nome: "Zona 3 — Bairros próximos", valor: 30 },
      { nome: "Zona 4 — Periferia", valor: 60 }
    ]
  },

  quantidade: {
    minima: 1,
    maxima: 500,
    rapida: [5 , 10, 20, 30, 50],
    unidade: "L"
  },

  admin: {
    user: "admin",
    pass: "casanovatrap1#"
  },

  mensagemWhatsApp: "Olá, Bombas Êxito! Gostaria de fazer um pedido de combustível.",
};

const PRODUTOS_PADRAO = [
  { id: "gasolina",    nome: "Gasolina",     preco: 118, unidade: "MT/L", disponivel: true, icon: "⛽", desc: "Gasolina premium" },
  { id: "diesel",      nome: "Diesel",       preco: 140, unidade: "MT/L", disponivel: true, icon: "🛢️", desc: "Diesel rodoviário" },
  { id: "lubrificante", nome: "Lubrificante", preco: 300, unidade: "MT/un", disponivel: true, icon: "⚙️", desc: "Óleos e lubrificantes" }
];

window.CONFIG = CONFIG;
window.PRODUTOS_PADRAO = PRODUTOS_PADRAO;