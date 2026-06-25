# Utilia

Ferramentas rapidas, simples e uteis.

Utilia e um MVP de site low-cost com ferramentas online simples, pensado para SEO, trafego organico e monetizacao futura com anuncios discretos. O nome do repositorio nao e usado como marca publica.

## Ferramentas do MVP

- QR Code para WhatsApp com telefone, mensagem opcional, link copiavel e download em PNG.
- QR Code para links com validacao simples, preview, copia e download em PNG.
- Conversor simples com texto para PDF, texto para DOCX e imagens PNG/JPG para PDF.
- Calculadora de margem e preco de venda para pequenos negocios.

## Como rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Build e producao

```bash
npm run build
npm run start
```

O projeto usa Next.js com App Router, TypeScript e Tailwind CSS. O comando `next start` respeita a porta definida pelo ambiente de deploy, incluindo `PORT` no Railway.

## Publicacao no Railway

1. Conecte o repositorio `Sholdam/siteprafarmarcash` no Railway.
2. Use `npm install` como instalacao.
3. Use `npm run build` como build.
4. Use `npm run start` como start.
5. Configure o dominio publico quando estiver pronto.

Nenhum secret real deve ser versionado. Use variaveis de ambiente do Railway quando necessario.

## Anuncios

O MVP nao integra AdSense real. A estrutura esta pronta com componentes reutilizaveis:

- `AdSlot`
- `AdRail`
- `AdBanner`
- `AdPlaceholder`
- `MonetizedLayout`

Hoje os componentes mostram placeholders discretos. Para preparar o ambiente:

```env
NEXT_PUBLIC_ADSENSE_CLIENT=
NEXT_PUBLIC_ENABLE_ADS=false
```

Quando houver dominio aprovado e codigo oficial, a renderizacao real pode ser adicionada dentro de `AdSlot`. O codigo ja deixa um comentario indicando o ponto futuro de integracao.

## Limitacoes atuais

- Nao ha login, banco de dados ou painel administrativo.
- Arquivos nao sao salvos permanentemente.
- PDF para texto aparece como recurso em breve.
- Nao ha OCR.
- Nao ha promessa de conversao perfeita ou PDF para Word avancado.
- As conversoes do MVP sao simples e leves para manter estabilidade.

## Proximos passos sugeridos

- Configurar dominio publico.
- Adicionar Search Console e analytics.
- Integrar AdSense apenas depois da aprovacao.
- Criar novas ferramentas a partir de buscas long tail.
- Adicionar sugestao de nova ferramenta.
- Melhorar PDF para texto com biblioteca leve, se ficar estavel.

## Assinatura

Utilia - um produto do ecossistema Pangeia/Famulus.
