# Utilia - Handoff do projeto

Atualizado em **27/06/2026** após a criação do conversor de áudio, além do redesign da Home, melhorias de SEO e configuração do Google Search Console.

Este é o documento principal para continuar o projeto em outro computador, outra sessão do Codex ou outro ambiente.

## Resumo executivo

- Repositório: `Sholdam/siteprafarmarcash`
- Branch oficial: `main`
- Produto público: **Utilia**
- Site: `https://utilia.up.railway.app`
- Deploy: Railway, automático a partir da `main`
- Stack: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4 e Node 22
- Fonte de verdade: **GitHub `main`**
- Base visual da Home: commit `5ac4473` (`Redesign Utilia home`)

A pasta local não é a fonte oficial e pode ser recriada a partir do GitHub. Nunca trocar a marca pública para `siteprafarmarcash`; esse é somente o nome técnico do repositório e do serviço.

## Estado atual do produto

O site está funcionando e publicado no Railway. A Home foi refeita com aparência mais profissional, responsiva e preparada para tráfego orgânico.

Ferramentas ativas:

- QR Code para WhatsApp: `/qr-code-whatsapp`
- QR Code para links: `/qr-code-link`
- Calculadora de margem e preço de venda: `/calculadora-margem`
- Conversor de áudio: `/converter`

Rotas de apoio:

- Home: `/`
- Sitemap XML: `/sitemap.xml`
- Sitemap em texto: `/sitemap.txt`
- Robots: `/robots.txt`
- Verificação do Google: `/google75a1152dbd43ecb3.html`
- Ads.txt dinâmico: `/ads.txt`

### Conversor

O conversor foi reativado por pedido explícito do dono do projeto em 27/06/2026. A primeira aba ativa é **Áudio**; as abas Imagem e Documento aparecem desabilitadas como possibilidades futuras.

Funcionalidades atuais:

- Entrada: MP3, MP4, OGG, WAV e M4A
- Saída: MP3, WAV e OGG
- MP4 é aceito para extração da faixa de áudio
- Limite por arquivo: 200 MB
- Processamento local no navegador com `ffmpeg.wasm`
- O arquivo não é enviado nem armazenado no Railway
- O motor WebAssembly de aproximadamente 31 MB é carregado somente quando a conversão começa
- Interface com upload, arrastar e soltar, progresso, cancelamento, reprodução e download

Pacotes envolvidos:

- `@ffmpeg/ffmpeg@0.12.15`
- `@ffmpeg/util@0.12.2`

O core é carregado sob demanda a partir do jsDelivr na versão `@ffmpeg/core@0.12.10`. A conversão depende de o navegador conseguir acessar esse CDN na primeira utilização.

Validação realizada no Chrome com o build de produção:

- WAV para MP3: aprovado
- WAV para OGG: aprovado
- WAV para WAV: aprovado

Evitar mover o processamento para o Railway sem necessidade, pois isso aumentaria custo, uso de disco e complexidade de privacidade.

## Home e identidade visual

O redesign publicado no commit `5ac4473` inclui:

- Header sticky, menu desktop e menu compacto no celular
- Marca Utilia em destaque
- Hero com headline orientada para SEO
- CTAs para começar e visualizar as ferramentas
- Cards com ícones e estados de interação
- Seções de benefícios, funcionamento e conteúdo SEO
- Footer com links das ferramentas e assinatura Pangeia/Famulus
- Anúncios laterais e banners visualmente mais discretos
- Biblioteca de ícones `lucide-react`

Metadata atual da Home:

- Title: `Utilia — Ferramentas online rápidas e grátis`
- Description: `Use ferramentas online simples para criar QR Code de WhatsApp, gerar QR Code de links e calcular margem de venda.`
- H1: `Ferramentas online simples para resolver tarefas rápidas`

Não transformar a Home em uma página cheia de banners. O produto e as ferramentas devem continuar chamando mais atenção que os anúncios.

## Google Search Console e indexação

Estado em 26/06/2026:

- Propriedade `https://utilia.up.railway.app/` verificada no Google Search Console
- Arquivo de verificação publicado e respondendo normalmente
- `robots.txt` publicado
- `sitemap.xml` publicado e válido no navegador
- O Search Console inicialmente não conseguiu ler o sitemap XML
- `sitemap.txt` foi enviado como alternativa e apareceu com status **Processado**
- O limite diário da inspeção manual de URLs foi atingido
- A busca `site:utilia.up.railway.app` ainda não mostrava resultados na última conferência

Isso não indica defeito no site. A indexação de um domínio novo pode levar alguns dias. Não enviar o sitemap repetidamente.

Próximas ações no Search Console:

1. No dia seguinte, inspecionar a Home `https://utilia.up.railway.app/`.
2. Se estiver disponível, clicar em **Solicitar indexação**.
3. Repetir para as quatro páginas de ferramentas, incluindo `/converter`, respeitando o limite diário.
4. Conferir depois de alguns dias a seção **Indexação > Páginas**.
5. Testar no Google: `site:utilia.up.railway.app`.

Não existe garantia de aparecer imediatamente para buscas competitivas como “gerar QR Code para WhatsApp”. Primeiro o Google precisa descobrir, processar e indexar as páginas; depois o posicionamento melhora com tempo, conteúdo e autoridade.

## SEO já implementado

- Metadata específica na Home e nas páginas de ferramentas
- Um único H1 por página
- Conteúdo explicativo e perguntas frequentes
- Dados estruturados JSON-LD de `WebApplication` e `FAQPage`
- Sitemap XML e sitemap em texto
- Robots apontando para os dois sitemaps
- Conteúdo voltado para buscas como QR Code de WhatsApp, QR Code de link, conversor de áudio e calculadora de margem

Commits relacionados:

- `981c1da` - Arquivo de verificação do Google Search Console
- `d6e0328` - Sitemap XML e robots estáticos
- `7aab42a` - Sitemap em texto como fallback
- `28d9581` - Conteúdo SEO e dados estruturados
- `5ac4473` - Redesign da Home e metadata atualizada

## Monetização e AdSense

A estrutura de anúncios existe, mas os anúncios reais ainda dependem de uma conta AdSense, aprovação e IDs oficiais.

Arquivos principais:

- `src/components/ads.tsx`
- `src/components/adsense-unit.tsx`
- `src/app/ads.txt/route.ts`

Variáveis esperadas no Railway:

```env
NEXT_PUBLIC_ENABLE_ADS=true
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-SEU_ID
NEXT_PUBLIC_ADSENSE_SLOT_RAIL=ID_DO_SLOT_LATERAL
NEXT_PUBLIC_ADSENSE_SLOT_BANNER=ID_DO_SLOT_BANNER
NEXT_PUBLIC_SITE_URL=https://utilia.up.railway.app
```

Enquanto os anúncios não estiverem totalmente configurados, o site apresenta placeholders discretos. Não usar pop-up, overlay, anúncio fixo ou anúncio dentro dos cards de ferramentas.

Fluxo recomendado:

1. Aguardar e acompanhar a indexação no Search Console.
2. Continuar melhorando conteúdo e adicionando ferramentas úteis.
3. Considerar comprar e conectar um domínio próprio.
4. Criar ou acessar a conta AdSense.
5. Solicitar a revisão do site.
6. Após aprovação, criar slots de banner e lateral.
7. Configurar as variáveis oficiais no Railway.
8. Fazer redeploy e conferir `/ads.txt`.

O `/ads.txt` é gerado dinamicamente. Com `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-123`, ele publica:

```txt
google.com, pub-123, DIRECT, f08c47fec0942fa0
```

Um domínio próprio não é obrigatório para o funcionamento técnico, mas é recomendado para marca, SEO e confiança antes de investir mais na monetização.

## Railway

Arquivos de deploy:

- `railway.json`
- `nixpacks.toml`
- `package.json`

Configuração esperada:

- Build: `npm run build`
- Start: `npm run start -- -p $PORT`
- Host: `0.0.0.0`
- Node: `22.x`
- Branch conectada: `main`

### Histórico do erro 502

O app já apresentou `502 Bad Gateway` porque o processo estava na porta `8080`, mas o domínio público do Railway apontava para a porta `2021`.

Se o erro voltar:

1. Abrir Railway.
2. Ir em **Settings > Networking**.
3. Comparar a porta do domínio público com a porta mostrada nos logs.
4. Ajustar o domínio para a mesma porta do processo.

Exemplo de log correto:

```txt
next start -H 0.0.0.0 -p 8080
Ready
```

## Estrutura principal

- `src/app/page.tsx` - Home e metadata da Home
- `src/app/layout.tsx` - Layout global, metadata padrão e script do AdSense
- `src/app/globals.css` - Estilos globais
- `src/app/qr-code-whatsapp/page.tsx` - Página SEO do QR para WhatsApp
- `src/app/qr-code-link/page.tsx` - Página SEO do QR para links
- `src/app/calculadora-margem/page.tsx` - Página SEO da calculadora
- `src/app/converter/page.tsx` - Página SEO e abas da seção de conversores
- `src/components/ui.tsx` - Header, footer e componentes compartilhados
- `src/components/ads.tsx` - Layout e slots de anúncio
- `src/components/seo.tsx` - JSON-LD e blocos SEO
- `src/components/whatsapp-qr-tool.tsx` - Ferramenta de WhatsApp
- `src/components/link-qr-tool.tsx` - Ferramenta de QR link
- `src/components/margin-calculator.tsx` - Calculadora
- `src/components/audio-converter.tsx` - Conversor local de MP3, MP4, OGG, WAV e M4A
- `src/lib/tools.ts` - Lista base das ferramentas ativas
- `public/sitemap.xml` - Sitemap XML
- `public/sitemap.txt` - Sitemap em texto aceito pelo Search Console
- `public/robots.txt` - Regras para rastreadores

## Como continuar em outro computador

1. Clonar o repositório:

```bash
git clone https://github.com/Sholdam/siteprafarmarcash.git
cd siteprafarmarcash
```

2. Confirmar que está na versão oficial:

```bash
git checkout main
git pull origin main
git status -sb
```

3. Instalar dependências:

```bash
npm install
```

4. Rodar localmente:

```bash
npm run dev
```

5. Validar qualquer mudança antes de publicar:

```bash
npm run lint
npm run build
```

6. Publicar:

```bash
git add -A
git commit -m "Mensagem curta"
git push origin main
```

O Railway deve iniciar um novo deploy automaticamente após o push.

## Diretrizes do produto

- Manter a marca pública **Utilia**.
- Tratar o GitHub `main` como fonte de verdade.
- Preservar as ferramentas existentes durante mudanças visuais.
- Priorizar mobile, velocidade, clareza e confiança.
- Evitar aparência de site de spam ou página feita só para anúncios.
- Manter os anúncios discretos e depois do conteúdo principal.
- Priorizar ferramentas leves, úteis e indexáveis.
- Não criar login, banco de dados, pagamentos ou painel administrativo nesta fase.
- Não armazenar arquivos ou dados dos usuários; o conversor deve continuar local no navegador.
- Não adicionar bibliotecas pesadas sem necessidade.
- Preservar o carregamento sob demanda do FFmpeg para não pesar a abertura da Home.

## Próximas ferramentas sugeridas

Prioridade sugerida por simplicidade e potencial de busca:

1. Gerador de link do WhatsApp sem QR Code
2. Calculadora de porcentagem
3. Calculadora de desconto
4. Contador de caracteres e palavras
5. Calculadora de juros simples
6. Gerador de senha simples
7. Formatador de CPF, CNPJ e telefone

Evitar por enquanto:

- PDF pesado
- OCR
- Uploads persistentes
- Ferramentas que exijam servidor caro
- Uma suíte grande de conversão de arquivos

## Checklist para o próximo agente

1. Ler este arquivo inteiro.
2. Confirmar `git status -sb` e trabalhar sobre `main` atualizada.
3. Conferir `https://utilia.up.railway.app` antes de editar.
4. Não mover o conversor para processamento no servidor sem pedido explícito e análise de custo.
5. Preservar as funcionalidades existentes.
6. Rodar `npm run lint` e `npm run build` antes de publicar código.
7. Fazer commit e push para o GitHub; não deixar a única versão em arquivos locais.
8. Confirmar o domínio público após o deploy.

## Próxima tarefa recomendada

Aguardar a liberação do limite diário do Search Console e solicitar a indexação da Home e das quatro ferramentas, incluindo `https://utilia.up.railway.app/converter`. Enquanto o Google processa o site, a próxima evolução de produto recomendada é criar uma ferramenta leve com busca específica, começando pelo **gerador de link do WhatsApp sem QR Code**.

O AdSense deve continuar como etapa posterior, preferencialmente depois dos primeiros sinais de indexação e, se possível, da conexão de um domínio próprio.
