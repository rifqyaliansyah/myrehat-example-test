# Prompt Log — Task B (MyRehat)

## Prompt 1
Prompt: Scaffold Next.js + Elysia + Drizzle + Better-Auth + oRPC pakai create-better-t-stack
Hasil: Struktur monorepo dengan apps/web, apps/server, packages/{db,api,auth,ui,config}
Yang saya lakukan: Dipakai persis sesuai perintah koordinator

## Prompt 2
Prompt: Terapkan 5 patch deploy wajib (env dummy, msgpackr-extract, docker-compose, rewrites, cookie)
Hasil: 6 file diubah, patch lengkap
Yang saya lakukan: Dipakai persis, commit pertama sebagai "chore: scaffold + lima patch deploy"

## Prompt 3
Prompt: varlock crash saat pnpm install di Windows (`UV_HANDLE_CLOSING`)
Hasil: Bug libuv Windows (varlock issue #229), bukan kode. Workaround: `--ignore-scripts` + manual varlock codegen
Yang saya lakukan: Dipakai untuk install lokal. Deploy Docker (Linux) tidak kena bug ini

## Prompt 4
Prompt: Schema tabel `listing` di DB koordinator beda dari docs (price=text, contact_wa bukan whatsapp, no user_id)
Hasil: Schema Drizzle disesuaikan dengan DB → db:push no-op
Yang saya lakukan: Dipakai, verifikasi langsung via query DB

## Prompt 5
Prompt: F1 kode — schema listing, listing-schema (Zod), router listing, form, list
Hasil: 8 file diimplementasikan, `check-types` 6/6 hijau
Yang saya lakukan: Dipakai, minor adjust (price text, no user_id) sesuai DB

## Prompt 6
Prompt: F2 webhook WAHA + validasi Zod + buildReply terpisah supaya bisa di-unit test
Hasil: `waha.ts` (pure logic) + `route.ts` (AI SDK + OpenRouter)
Yang saya lakukan: Dipakai, test ditulis untuk validasi + format reply

## Prompt 7
Prompt: F3 polish script pakai ai-sdk-provider-opencode-sdk + mock test
Hasil: `scripts/polish.ts` + test mock generateText
Yang saya lakukan: Dipakai, mock test 3/3 hijau tanpa panggilan AI live

## Prompt 8
Prompt: F4 hero heading + mobile responsive
Hasil: `page.tsx` diganti, heading "Book homestays directly with hosts", class `text-3xl sm:text-5xl`
Yang saya lakukan: Dipakai

## Prompt 9
Prompt: Test wajib — validasi webhook, 4 kategori diterima + 1 ditolak, format reply
Hasil: 3 file test, total 16 test
Yang saya lakukan: Dipakai, `bunx vitest run` 16/16 hijau

## Prompt 10
Prompt: Strategi deploy tanpa WSL (Windows + varlock crash lokal)
Hasil: Koding di Windows, validasi logic via vitest + tsc, verifikasi integrasi di URL live Dokploy (Linux)
Yang saya lakukan: Dipakai, tidak install WSL, on-track deadline