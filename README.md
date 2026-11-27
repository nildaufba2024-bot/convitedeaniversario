# Convite digital — Camila Godoy

Convite interativo inspirado no projeto `convite-agata`. A tela inicial usa a capa rosa enviada. O toque no envelope reproduz 5 segundos do vídeo novo. Em seguida aparece a tela final interativa, com contagem regressiva atualizada em tempo real e áreas de toque sobre os botões de mapa, agenda e replay.

A tela final atual usa `dist/assets/tela-final-camila-v3.png`. As duas versões anteriores permanecem em `dist/assets/` para comparação. Uma fusão simples leva do vídeo para essa tela. No celular, o vídeo e a tela final ocupam toda a área disponível, sem margens laterais ou corte dos textos.

## Dados usados

- Aniversário de Camila Godoy — Coquette Pink Party
- 15 de dezembro de 2026, às 20h (horário de Brasília)
- Rua E, Zona Oeste, nº 225

O flyer não informa cidade nem contato para confirmação. O link de mapa pesquisa o endereço como impresso, sem adicionar uma cidade. O evento de calendário não define horário de término.

O arquivo `dist/assets/abertura-5s-camila.mp4` usa os primeiros 5 segundos de `gemini_generated_video_06756c5d.mp4`. O áudio diminui nos últimos 0,25 segundo, e a tela final entra em uma fusão de 0,3 segundo. A contagem impressa na imagem final é coberta por um painel e os números são renderizados em HTML para permanecerem atualizados.

## Abrir localmente

Sirva a pasta `dist/` com um servidor HTTP estático, por exemplo `python -m http.server 8000 --directory dist`, e abra `http://localhost:8000`.

O projeto também inclui `vercel.json` para publicação estática na Vercel, como o convite da Ágata.
