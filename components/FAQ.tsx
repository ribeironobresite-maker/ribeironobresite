type Q = { q: string; a: React.ReactNode };

const items: Q[] = [
  {
    q: "Quanto tempo demora uma ação trabalhista?",
    a: (
      <>
        Depende da Vara e da complexidade. Em média, uma ação
        trabalhista simples dura de <strong>6 a 12 meses</strong> em primeiro
        grau. Recursos podem estender o processo. Algumas situações se
        resolvem em audiência de conciliação, em poucos meses.
      </>
    ),
  },
  {
    q: "Tenho até quanto tempo para ajuizar uma reclamação trabalhista?",
    a: (
      <>
        O prazo é de <strong>2 anos</strong> após a saída da empresa (prazo
        bienal). Dentro desse prazo, você pode cobrar verbas dos últimos 5
        anos de trabalho (prazo quinquenal). Não deixe passar do biênio,
        senão perde o direito.
      </>
    ),
  },
  {
    q: "Como funciona o pagamento dos honorários?",
    a: (
      <>
        Trabalho com honorários combinados caso a caso. Em ações
        trabalhistas, geralmente cobro <strong>percentual do êxito</strong>{" "}
        (<strong>30% do valor ganho</strong>), sem custos iniciais. Em ações
        cíveis, pode ser misto: entrada simbólica + percentual.
      </>
    ),
  },
  {
    q: "Atuo em casos de família — divórcio, partilha e união estável?",
    a: (
      <>
        Sim. Atendo causas de direito de família, incluindo{" "}
        <strong>divórcio</strong> (consensual ou litigioso),{" "}
        <strong>partilha de bens</strong>,{" "}
        <strong>reconhecimento e dissolução de união estável</strong> e{" "}
        <strong>interdição</strong> de pessoas com incapacidade civil.
        Cada caso é analisado individualmente para encontrar o caminho mais
        rápido e menos desgastante para a família.
      </>
    ),
  },
  {
    q: "Em quais cidades você atua?",
    a: (
      <>
        Atendo presencialmente no escritório e remotamente para todo o
        Brasil (videoconferência, documentos digitais). Para causas em
        outras comarcas, atuo em parceria com correspondentes locais quando
        necessário.
      </>
    ),
  },
  {
    q: "Posso ser indenizado por cobrança indevida ou nome sujo errado?",
    a: (
      <>
        Sim. Cobrança de valor já pago, dívida que não é sua ou negativação
        sem o devido aviso geram direito a (a) retirar o nome do SPC/Serasa,
        (b) <strong>restituir em dobro</strong> o valor cobrado indevidamente
        e (c) indenização por danos morais. Em alguns casos a indenização
        ultrapassa <strong>R$ 10 mil</strong>. Faço a análise inicial sem
        custo.
      </>
    ),
  },
  {
    q: "Vale a pena entrar com ação por danos morais?",
    a: (
      <>
        Depende da gravidade, das provas e do contexto. Casos de assédio,
        negativação indevida, falha grave de prestação de serviço ou
        constrangimento público costumam ter chance real. Faço uma análise
        prévia <strong>sem custo</strong> pra dizer se vale a pena.
      </>
    ),
  },
  {
    q: "Posso ser obrigado a aceitar acordo proposto pela empresa?",
    a: (
      <>
        Não. Acordo é sempre voluntário. Avalio com você os prós e contras
        de cada proposta: valor, prazo, riscos do processo seguir.{" "}
        <strong>A decisão final é sempre sua.</strong>
      </>
    ),
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-page-2">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-[11px] uppercase tracking-[0.3em] text-accent mb-3">
            Perguntas frequentes
          </div>
          <h2
            className="font-serif text-3xl md:text-4xl mb-4"
            style={{ color: "var(--bg-dark)" }}
          >
            Dúvidas comuns
          </h2>
          <div className="gold-rule w-24 mx-auto" />
        </div>

        <div className="space-y-3">
          {items.map((it) => (
            <details
              key={it.q}
              className="rounded-xl p-5 border bg-page"
              style={{ borderColor: "var(--border-soft)" }}
            >
              <summary
                className="flex justify-between items-center font-medium"
                style={{ color: "var(--bg-dark)" }}
              >
                <span>{it.q}</span>
                <span className="faq-icon text-2xl text-accent font-light">
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-dark">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
