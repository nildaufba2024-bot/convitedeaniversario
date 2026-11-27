# Convite digital — Camila Godoy

Convite interativo inspirado no projeto `convite-agata`. A tela inicial usa a capa rosa enviada. O toque no envelope reproduz 5 segundos do vídeo novo. Em seguida aparece a tela final interativa, com contagem regressiva atualizada em tempo real e áreas de toque sobre os botões de mapa, confirmação de presença e replay.

O link público `https://convitedeaniversario-psi.vercel.app/` usa `dist/assets/preview-whatsapp-camila-v2.jpg` como imagem de prévia ao compartilhar o convite no WhatsApp. Essa versão preserva a arte enviada e ocupa menos de 350 KB; o PNG original permanece em `dist/assets/preview-whatsapp-camila.png`.

O botão **Confirmar presença** escolhe aleatoriamente uma das dez mensagens fornecidas e abre uma conversa no WhatsApp com `+55 75 98211-6019`. O convidado precisa tocar em enviar no WhatsApp para concluir a confirmação.

A tela final atual usa `dist/assets/tela-final-camila-v3.png`. As duas versões anteriores permanecem em `dist/assets/` para comparação. A passagem do vídeo para essa tela apaga a imagem, mantém 0,5 segundo de preto e acende gradualmente a arte rosa, em aproximadamente 2,5 segundos. No celular, o vídeo e a tela final ocupam toda a área disponível, sem margens laterais ou corte dos textos.

## Dados usados

- Aniversário de Camila Godoy — Coquette Pink Party
- 15 de dezembro de 2026, às 20h (horário de Brasília)
- Rua E, Zona Oeste, nº 225 — Ribeira do Pombal, BA, 48400-000

O flyer não informa cidade, mas o link de localização foi fornecido depois e aponta para Rua E, 225, Ribeira do Pombal, BA. O número de confirmação também foi fornecido depois.

O arquivo `dist/assets/abertura-5s-camila.mp4` usa os primeiros 5 segundos de `gemini_generated_video_06756c5d.mp4`. O áudio diminui nos últimos 0,25 segundo. A contagem impressa na imagem final é coberta por um painel e os números são renderizados em HTML para permanecerem atualizados.

## Abrir localmente

Sirva a pasta `dist/` com um servidor HTTP estático, por exemplo `python -m http.server 8000 --directory dist`, e abra `http://localhost:8000`.

O projeto também inclui `vercel.json` para publicação estática na Vercel, como o convite da Ágata.
