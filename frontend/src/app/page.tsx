// app/page.tsx
import { redirect } from 'next/navigation'

export default function Home() {
  // Redirige automáticamente a /login cuando se accede a /
  redirect('/login')
}
