# Deh Dastarkhwan

Premium responsive food-ordering frontend with an Edge-compatible orders API.

## What was upgraded

- Premium editorial desi-food visual system
- Fully responsive desktop/tablet/mobile layouts
- Sticky mobile navigation and improved mobile header
- New branded SVG logo + SVG favicon
- Fixed menu category mismatch (`bbq`)
- Fixed localStorage hydration overwrite bug
- Fixed favorites stale-state behavior
- Better cart, checkout, menu, product and account layouts
- Dark mode retained and redesigned
- Google Maps embed retained
- `poweredByHeader` disabled
- Orders API runs on Edge Runtime

## Cloudflare

The API route at `app/api/orders/route.ts` explicitly contains:

```ts
export const runtime = 'edge';
```

Keep Edge-compatible code inside API routes: do not add Node-only modules such as `fs`, `net`, or native database drivers to an Edge route.

For a Cloudflare deployment, use Cloudflare's current Next.js/OpenNext deployment flow and configure the project through the Cloudflare dashboard or Wrangler/OpenNext as required by the deployment target.

## Local

```bash
npm install
npm run dev
```

Production:

```bash
npm run build
npm start
```

The project is intentionally kept on the existing Next.js/React dependency versions so the existing backend contract remains intact.
