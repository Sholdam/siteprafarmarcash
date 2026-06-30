import type { Metadata } from "next";
import Link from "next/link";
import { ContentBlock } from "@/components/seo";
import { PageHeader, PageShell } from "@/components/ui";

export const metadata: Metadata = {
  title: "Politica de Privacidade - Utilia",
  description:
    "Saiba como o Utilia trata arquivos, dados tecnicos, cookies e informacoes relacionadas ao uso das ferramentas.",
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <PageHeader
          title="Politica de Privacidade"
          description="Esta politica explica quais informacoes podem ser tratadas durante o uso do Utilia e como protegemos a experiencia dos visitantes."
        />
        <p className="text-sm text-slate-500">Ultima atualizacao: 30 de junho de 2026.</p>

        <ContentBlock title="Dados informados nas ferramentas">
          <p>
            O Utilia nao exige cadastro. Telefones, mensagens, links e valores
            digitados nas ferramentas sao usados para gerar o resultado
            solicitado. O projeto nao mantem um banco de dados para armazenar
            permanentemente essas informacoes.
          </p>
          <p>
            Os arquivos escolhidos nos conversores de audio e imagem sao
            processados localmente pelo navegador. Eles nao sao enviados ao
            servidor do Utilia para realizar a conversao. O arquivo convertido
            permanece no dispositivo ate que voce o baixe ou feche a pagina.
          </p>
        </ContentBlock>

        <ContentBlock title="Dados tecnicos e hospedagem">
          <p>
            Como ocorre em servicos hospedados na internet, o provedor de
            infraestrutura pode registrar dados tecnicos necessarios para
            seguranca e operacao, como endereco IP, horario da requisicao,
            navegador, pagina acessada e status da resposta. Esses registros
            podem ser mantidos conforme as praticas e os prazos do provedor.
          </p>
        </ContentBlock>

        <ContentBlock title="Cookies, publicidade e servicos do Google">
          <p>
            O Utilia pode utilizar o Google AdSense para exibir publicidade. O
            Google e seus parceiros podem usar cookies, identificadores, endereco
            IP e tecnologias semelhantes para exibir, limitar e medir anuncios,
            inclusive com base em visitas anteriores a este ou a outros sites.
          </p>
          <p>
            Quando exigido pela regiao do visitante, uma plataforma de gestao de
            consentimento pode solicitar escolhas antes da exibicao de anuncios
            personalizados. Voce tambem pode controlar a personalizacao nas
            configuracoes de anuncios da sua Conta Google.
          </p>
          <a
            className="font-semibold text-emerald-700 hover:text-emerald-800"
            href="https://policies.google.com/technologies/partner-sites?hl=pt-BR"
            target="_blank"
            rel="noreferrer"
          >
            Como o Google usa dados de sites parceiros
          </a>
        </ContentBlock>

        <ContentBlock title="Compartilhamento e seguranca">
          <p>
            O Utilia nao vende os dados digitados nas ferramentas. Informacoes
            tecnicas podem ser tratadas por fornecedores de hospedagem,
            publicidade ou seguranca na medida necessaria para prestar seus
            servicos e cumprir obrigacoes legais.
          </p>
          <p>
            Nenhum servico online e totalmente imune a incidentes. Por isso, nao
            envie dados confidenciais, senhas ou documentos pessoais em campos
            que nao foram criados para essa finalidade.
          </p>
        </ContentBlock>

        <ContentBlock title="Seus direitos e contato">
          <p>
            Dependendo da legislacao aplicavel, voce pode solicitar informacoes,
            correcao ou exclusao de dados pessoais que estejam sob controle do
            projeto. Como as ferramentas nao mantem contas nem historico pessoal,
            pode nao existir um registro que permita identificar sua atividade.
          </p>
          <p>
            Para duvidas sobre esta politica, utilize a nossa pagina de contato.
            Esta politica pode ser atualizada para acompanhar mudancas no site,
            nos fornecedores ou na legislacao.
          </p>
          <Link className="font-semibold text-emerald-700 hover:text-emerald-800" href="/contato">
            Acessar a pagina de contato
          </Link>
        </ContentBlock>
      </main>
    </PageShell>
  );
}
