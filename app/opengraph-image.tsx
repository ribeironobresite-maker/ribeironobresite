import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Dr. Antonio C. Cardozo — Advocacia em Maricá";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(150deg, #2e0c0c 0%, #5a1c1c 55%, #3a1010 100%)",
          position: "relative",
        }}
      >
        {/* Borda dourada interna */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            border: "1px solid rgba(193,158,74,0.35)",
            display: "flex",
          }}
        />

        {/* OAB / Localização */}
        <div
          style={{
            color: "rgba(193,158,74,0.75)",
            fontSize: 15,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            marginBottom: 28,
            display: "flex",
          }}
        >
          OAB/RJ 116.110 · Maricá · RJ
        </div>

        {/* Nome */}
        <div
          style={{
            color: "#f5f0e8",
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.1,
            textAlign: "center",
            marginBottom: 20,
            display: "flex",
          }}
        >
          Dr. Antonio C. Cardozo
        </div>

        {/* Linha dourada */}
        <div
          style={{
            width: 72,
            height: 2,
            background: "rgba(193,158,74,0.65)",
            marginBottom: 24,
            display: "flex",
          }}
        />

        {/* Áreas */}
        <div
          style={{
            color: "rgba(193,158,74,0.9)",
            fontSize: 22,
            letterSpacing: "0.08em",
            textAlign: "center",
            display: "flex",
          }}
        >
          Cível · Consumidor · Trabalhista · Família
        </div>

        {/* Subtítulo */}
        <div
          style={{
            color: "rgba(245,240,232,0.5)",
            fontSize: 16,
            marginTop: 28,
            letterSpacing: "0.1em",
            display: "flex",
          }}
        >
          +25 anos de atuação · Atendimento direto com o advogado
        </div>

        {/* URL do site */}
        <div
          style={{
            position: "absolute",
            bottom: 44,
            color: "rgba(245,240,232,0.35)",
            fontSize: 14,
            letterSpacing: "0.12em",
            display: "flex",
          }}
        >
          accardozo.adv.br
        </div>
      </div>
    ),
    { ...size }
  );
}
