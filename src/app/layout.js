import Navbar from '@/components/ui/Navbar'
import { AuthProvider } from '@/context/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

export const metadata = {
  title: 'XeroBrokerage | No Commission Property Platform',
  description: 'Find your perfect home with zero brokerage fees',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='bg-[#faf7e7] '>
        {/* bg-[#faf7e7]  */}
        <AuthProvider>
          <Navbar />
          <main className='max-h-[90vh] max-w-screen relative sm:top-[79px] top-15'>
            {children}
          </main>
        </AuthProvider>
        <ToastContainer />
      </body>
    </html>
  )
}
