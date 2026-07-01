# Utilia

Ferramentas rapidas, simples e uteis.

Utilia e um MVP de site low-cost com ferramentas online simples, pensado para SEO, trafego organico e monetizacao com anuncios discretos. O nome do repositorio nao e usado como marca publica.

## Ferramentas do MVP

- QR Code para WhatsApp com telefone, mensagem opcional, link copiavel e download em PNG.
- QR Code para links com validacao simples, preview, copia e download em PNG.
- Calculadora de margem e preco de venda para pequenos negocios.
- Conversor de audio e imagem executado localmente no navegador.
- Paginas institucionais de privacidade, termos, contato e apresentacao do projeto.

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
5. Dominio publico temporario atual: `https://utilia.up.railway.app`.
6. Conecte um dominio proprio depois, quando a marca estiver pronta.

Nenhum secret real deve ser versionado. Use variaveis de ambiente do Railway quando necessario.

## Anuncios

O MVP esta preparado para AdSense real por variaveis de ambiente, mas mantem placeholders discretos quando os dados oficiais ainda nao estiverem configurados.

Fluxo recomendado antes do AdSense:

1. Manter o site funcionando no Railway.
2. Usar o dominio publico temporario do Railway.
3. Conectar dominio proprio depois.
4. Adicionar o site no Google Search Console.
5. Confirmar `sitemap.xml` e `robots.txt`.
6. So entao conectar AdSense para revisao.

- `AdSlot`
- `AdRail`
- `AdBanner`
- `AdPlaceholder`
- `MonetizedLayout`

Para preparar o ambiente:

```env
NEXT_PUBLIC_ADSENSE_CLIENT=
NEXT_PUBLIC_ADSENSE_SLOT_RAIL=
NEXT_PUBLIC_ADSENSE_SLOT_BANNER=
NEXT_PUBLIC_ENABLE_ADS=false
NEXT_PUBLIC_SITE_URL=https://utilia.up.railway.app
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

Para ativar o Google Analytics, configure `NEXT_PUBLIC_GA_MEASUREMENT_ID` com o ID do fluxo da Web, no formato `G-...`.

Quando houver conta e site aprovado no AdSense, preencha `NEXT_PUBLIC_ADSENSE_CLIENT` com o ID `ca-pub-...`, adicione os IDs dos slots e mude `NEXT_PUBLIC_ENABLE_ADS=true` no Railway.

O projeto publica `/ads.txt` automaticamente quando `NEXT_PUBLIC_ADSENSE_CLIENT` estiver preenchido. O conteudo segue o formato:

```txt
google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
```

## Limitacoes atuais

- Nao ha login, banco de dados ou painel administrativo.
- Arquivos nao sao salvos permanentemente.
- Nao ha OCR.
- Conversoes muito grandes dependem da memoria e do desempenho do dispositivo do usuario.

## Proximos passos sugeridos

- Configurar dominio publico.
- Adicionar o dominio atual no Google Search Console.
- Enviar `https://utilia.up.railway.app/sitemap.xml` no Search Console.
- Se o Search Console continuar com erro temporario no XML, enviar `https://utilia.up.railway.app/sitemap.txt`, que tambem e um formato aceito pelo Google.
- Acompanhar Search Console e Google Analytics.
- Ativar AdSense depois da aprovacao do site.
- Criar novas ferramentas a partir de buscas long tail.
- Adicionar sugestao de nova ferramenta.

## Assinatura

Utilia - um produto do ecossistema Pangeia/Famulus.
