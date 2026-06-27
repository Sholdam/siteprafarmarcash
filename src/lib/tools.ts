export const tools = [
  {
    title: "QR Code para WhatsApp",
    description: "Crie um QR Code com numero e mensagem personalizada.",
    href: "/qr-code-whatsapp",
    cta: "Criar QR Code",
  },
  {
    title: "QR Code para links",
    description: "Transforme qualquer link em um QR Code para baixar e compartilhar.",
    href: "/qr-code-link",
    cta: "Gerar QR Code",
  },
  {
    title: "Calculadora de margem",
    description: "Calcule preco de venda, lucro, custos e margem estimada.",
    href: "/calculadora-margem",
    cta: "Calcular margem",
  },
  {
    title: "Conversor de arquivos",
    description: "Converta áudios e imagens diretamente no navegador.",
    href: "/converter",
    cta: "Abrir conversor",
  },
];

export type FaqItem = {
  question: string;
  answer: string;
};
