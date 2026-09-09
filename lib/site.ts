export const site = {
  name: "Dr. Antonio C Cardozo",
  shortName: "A. Cardozo",
  tagline: "Advocacia Cível, Consumidor, Trabalhista e Família",
  url: "https://accardozo.adv.br",
  email: "cardozoadvogado@hotmail.com",
  cnpj: null as string | null,
  oab: {
    primary: "OAB/RJ 116.110",
  },
  // Estrutura mantida em array (compatibilidade com modal WhatsApp do template)
  offices: [
    {
      id: "principal",
      city: "Maricá",
      state: "RJ",
      address: "Rua Domício da Gama, 89, loja 3",
      neighborhood: "Edifício Shopping Maricá · Centro",
      zip: "24.900-815",
      whatsapp: {
        number: "5521987751070",
        display: "(21) 98775-1070",
        href: "https://wa.me/5521987751070?text=Ol%C3%A1%2C%20gostaria%20de%20uma%20orienta%C3%A7%C3%A3o%20jur%C3%ADdica.",
      },
    },
  ],
  primaryWhatsapp: {
    number: "5521987751070",
    display: "(21) 98775-1070",
    href: "https://wa.me/5521987751070?text=Ol%C3%A1%2C%20gostaria%20de%20uma%20orienta%C3%A7%C3%A3o%20jur%C3%ADdica.",
  },
  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
  },
} as const;

export type Office = {
  id: string;
  city: string;
  state: string;
  address: string;
  neighborhood: string;
  whatsapp: { number: string; display: string; href: string };
};
