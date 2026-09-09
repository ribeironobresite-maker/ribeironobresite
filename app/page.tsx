import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Areas from "@/components/Areas";
import SobreOAdvogado from "@/components/SobreOAdvogado";
import QuandoProcurar from "@/components/QuandoProcurar";
import FAQ from "@/components/FAQ";
import AgendamentoSection from "@/components/AgendamentoSection";
import ArtigosSection from "@/components/ArtigosSection";
import Contato from "@/components/Contato";
import Books from "@/components/Books";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Areas />
      <SobreOAdvogado />
      <QuandoProcurar />
      <FAQ />
      <AgendamentoSection />
      <ArtigosSection />
      <Contato />
      <Books />
    </>
  );
}
