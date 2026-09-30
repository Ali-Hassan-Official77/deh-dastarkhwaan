import './globals.css';
import type { ReactNode } from 'react';
import {AppProvider} from '@/components/providers';
export const runtime = 'edge';
export const metadata={title:'Deh Dastarkhwan',description:'Desi Fire. Village Soul.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:ReactNode}){return <html lang="en"><body className="site-rustic"><AppProvider>{children}</AppProvider>
<script src="https://cdn.zanderio.ai/widget/loader.js" data-id="wdg_mB7hdtkSA2EfMNWLJBfNg0f9" defer></script>
</body></html>}
