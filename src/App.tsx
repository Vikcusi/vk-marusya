import { QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import './components/FormField/FormField.css'
import { queryClient } from './api/queryClient'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { GenrePage } from './pages/GenrePage/GenrePage'
import { MainPage } from './pages/MainPage/MainPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AccountPage } from './pages/AccountPage/AccountPage'
import { FilmPage } from './pages/FilmPage/FilmPage'
import { CertainGenrePage } from './pages/CertainGenrePage/CertainGenrePage'

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Header />
        <main>
          <section>
            <div className='container'>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/genres" element={<GenrePage />} />
                <Route path="/genres/:genre" element={<CertainGenrePage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/movie/:id" element={<FilmPage />} />
              </Routes>
            </div>
          </section>
        </main>
        <Footer />
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
