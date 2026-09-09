export const site = {
  name: "Ferdinando Ribeiro Nobre",
  shortName: "Ribeiro Nobre",
  tagline: "Advocacia Cível, Consumidor, Trabalhista e Família",
  url: "https://ribeironobre.adv.br",
  email: "",
  cnpj: null as string | null,
  oab: {
    primary: "",
  },
  offices: [
    {
      id: "principal",
      city: "Rio de Janeiro",
      state: "RJ",
      address: "",
      neighborhood: "",
      zip: "",
      whatsapp: {
        number: "5521970027546",
        display: "(21) 97002-7546",
        href: "https://wa.me/5521970027546?text=Ol%C3%A1%2C%20gostaria%20de%20uma%20orienta%C3%A7%C3%A3o%20jur%C3%ADdica.",
      },
    },
  ],
  primaryWhatsapp: {
    number: "5521970027546",
    display: "(21) 97002-7546",
    href: "https://wa.me/5521970027546?text=Ol%C3%A1%2C%20gostaria%20de%20uma%20orienta%C3%A7%C3%A3o%20jur%C3%ADdica.",
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
