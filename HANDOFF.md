# Utilia - Handoff do projeto

Este documento resume o estado atual do projeto para continuar em outro PC, outra sessao do Codex ou outro ambiente.

## Resumo rapido

- Repositorio GitHub: `Sholdam/siteprafarmarcash`
- Branch principal: `main`
- Produto publico: **Utilia**
- Slogan: `Ferramentas rapidas, simples e uteis.`
- Deploy Railway: `https://utilia.up.railway.app`
- Stack: Next.js App Router, TypeScript, Tailwind CSS, React 19, Node 22 no Railway.
- Fonte de verdade: **GitHub `main`**. A pasta local pode ser apagada ou recriada a partir do GitHub.

Importante: o nome publico nunca deve ser `siteprafarmarcash`. Esse e apenas o nome do repositorio/servico. A marca do site e **Utilia**.

## Estado atual

O MVP esta publicado no GitHub e conectado ao Railway. O projeto foi criado do zero porque a pasta local inicial estava vazia e sem Git.

Ferramentas atualmente ativas:

- QR Code para WhatsApp: `/qr-code-whatsapp`
- QR Code para links: `/qr-code-link`
- Calculadora de margem e preco de venda: `/calculadora-margem`

O Conversor foi removido do MVP por decisao do dono do projeto. Nao recolocar sem pedido explicito.

Rotas de apoio:

- Home: `/`
- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`
- Ads.txt dinamico: `/ads.txt`

## Historico importante de commits

- `19f86c6` - Criacao inicial do MVP Utilia.
- `9d265ef` - Configuracao do dominio publico como URL base.
- `4ea657e` - Configuracao de deploy no Railway.
- `c04382b` - Configuracao explicita de Nixpacks/Node 22.
- `e27f643` - Remocao do Conversor e preparacao do AdSense.

O documento atual deve estar em commit posterior a esses.

## Railway

Arquivos de deploy:

- `railway.json`
- `nixpacks.toml`
- `package.json`

Configuracao esperada:

- Build: `npm run build`
- Start: `npm run start -- -p $PORT`
- Host: `0.0.0.0`
- Node: `22.x`

Observacao critica: em um momento o Railway mostrava o app rodando em `8080`, mas o dominio publico apontava para a porta `2021`, causando `502 Bad Gateway`.

Se voltar a aparecer 502:

1. Abrir Railway.
2. Ir em **Settings > Networking**.
3. Verificar o dominio publico.
4. Garantir que a porta do dominio publico e a mesma porta mostrada nos logs do deploy.
5. No log, procurar algo como:

```txt
next start -H 0.0.0.0 -p 8080
Ready
```

Se o log mostrar porta `8080`, o dominio publico precisa apontar para `8080`. Se mostrar outra porta, ajustar para essa porta.

## Monetizacao e AdSense

O site ja tem estrutura para anuncios, mas o AdSense real ainda depende de conta, aprovacao e slots oficiais.

Fluxo combinado em 2026-06-26:

1. Site funcionando no Railway.
2. Dominio publico temporario do Railway ativo: `https://utilia.up.railway.app`.
3. Conectar dominio proprio depois.
4. Colocar o site no Google Search Console.
5. Conferir sitemap e robots.
6. So entao conectar AdSense para revisao.

Nao pular direto para AdSense antes de Search Console/sitemap, porque o site ainda esta no inicio e precisa ganhar sinais basicos de indexacao e confianca.

Componentes envolvidos:

- `src/components/ads.tsx`
- `src/components/adsense-unit.tsx`
- `src/app/ads.txt/route.ts`

Variaveis esperadas no Railway:

```env
NEXT_PUBLIC_ENABLE_ADS=true
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-SEU_ID
NEXT_PUBLIC_ADSENSE_SLOT_RAIL=ID_DO_SLOT_LATERAL
NEXT_PUBLIC_ADSENSE_SLOT_BANNER=ID_DO_SLOT_BANNER
NEXT_PUBLIC_SITE_URL=https://utilia.up.railway.app
```

Enquanto `NEXT_PUBLIC_ENABLE_ADS` nao for `true`, ou enquanto faltarem client/slots, o site mostra placeholders discretos de publicidade.

O `/ads.txt` e gerado dinamicamente. Se `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-123`, o arquivo publica:

```txt
google.com, pub-123, DIRECT, f08c47fec0942fa0
```

Proximo passo recomendado para monetizacao:

1. Primeiro configurar Google Search Console.
2. Enviar `https://utilia.up.railway.app/sitemap.xml`.
3. Conferir `https://utilia.up.railway.app/robots.txt`.
4. Depois criar ou acessar conta Google AdSense.
5. Adicionar o dominio Railway ou, idealmente, um dominio proprio.
6. Aguardar aprovacao.
7. Criar blocos de anuncio para banner e lateral.
8. Configurar as variaveis no Railway.
9. Fazer redeploy.
10. Conferir `/ads.txt`.

Recomendacao: considerar um dominio proprio antes de pedir aprovacao definitiva no AdSense. O dominio `up.railway.app` funciona tecnicamente, mas um dominio proprio tende a ser melhor para marca, SEO e confianca.

## Estrutura do projeto

Arquivos principais:

- `src/app/page.tsx` - Home.
- `src/app/layout.tsx` - Metadata, shell global e script do AdSense quando ativo.
- `src/app/qr-code-whatsapp/page.tsx` - Pagina SEO do QR para WhatsApp.
- `src/app/qr-code-link/page.tsx` - Pagina SEO do QR para links.
- `src/app/calculadora-margem/page.tsx` - Pagina SEO da calculadora.
- `src/components/whatsapp-qr-tool.tsx` - Ferramenta de WhatsApp.
- `src/components/link-qr-tool.tsx` - Ferramenta de QR link.
- `src/components/margin-calculator.tsx` - Calculadora.
- `src/components/ads.tsx` - Layout e slots de anuncio.
- `src/lib/tools.ts` - Lista de ferramentas exibida na home.

## Como continuar em outro PC

1. Clonar o repositorio:

```bash
git clone https://github.com/Sholdam/siteprafarmarcash.git
cd siteprafarmarcash
```

2. Instalar dependencias:

```bash
npm install
```

3. Rodar localmente:

```bash
npm run dev
```

4. Validar antes de publicar:

```bash
npm run lint
npm run build
```

5. Publicar:

```bash
git add -A
git commit -m "Mensagem curta"
git push
```

O Railway deve redeployar automaticamente a branch `main`.

## Diretrizes de produto

- Manter a interface simples, rapida e confiavel.
- Evitar visual de site de spam.
- Mobile-first.
- Anuncios discretos, nunca pop-up, overlay ou algo que atrapalhe a ferramenta.
- Priorizar ferramentas com SEO long tail e baixa complexidade.
- Nao criar login, banco, pagamentos ou painel admin nesta fase.
- Nao adicionar conversores complexos sem necessidade clara.
- Nao salvar arquivos de usuarios.
- Preservar a marca publica **Utilia**.

## Ideias boas para proximas ferramentas

Priorizar ferramentas leves e indexaveis:

- Gerador de link WhatsApp sem QR.
- Contador de caracteres e palavras.
- Calculadora de porcentagem.
- Calculadora de juros simples.
- Calculadora de desconto.
- Gerador de senha simples.
- Formatador de CPF/CNPJ/telefone.
- Gerador de texto para bio/descricoes curtas.

Evitar por enquanto:

- PDF pesado.
- OCR.
- Uploads persistentes.
- Ferramentas que exijam servidor caro.
- Suite grande estilo iLovePDF.

## Checklist do proximo agente

Ao assumir o projeto:

1. Tratar `GitHub main` como fonte de verdade.
2. Rodar `git status -sb`.
3. Verificar se o Railway esta apontando para a branch `main`.
4. Conferir se o dominio publico responde.
5. Se houver 502, checar porta em **Railway > Settings > Networking**.
6. Antes de mexer em anuncios reais, confirmar se ja existe conta AdSense aprovada e quais sao os IDs oficiais.
7. Rodar `npm run lint` e `npm run build` antes de qualquer push.

## Estado final desta sessao

O projeto esta funcional localmente e publicado no GitHub. A monetizacao esta preparada no codigo, mas depende de configuracao externa do AdSense e possivelmente de um dominio proprio para melhorar aprovacao e confianca.
