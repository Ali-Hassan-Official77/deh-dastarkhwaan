import './globals.css';
import {AppProvider} from '@/components/providers';
export const metadata={title:'Deh Dastarkhwan',description:'Desi Fire. Village Soul.',icons:{icon:'/icon.png'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className="site-rustic"><AppProvider>{children}</AppProvider></body></html>}
