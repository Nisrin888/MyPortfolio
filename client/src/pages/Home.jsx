import profile from '../assets/dp_pfp.png'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    return(
    <section className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-900/50 to-purple-950/30"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-800/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 space-y-6">
        <h1 className="text-7xl font-bold bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500 bg-clip-text text-transparent animate-gradient">
          Hi, I'm Nischal
        </h1>
        <p className="mt-7 text-xl text-gray-300 max-w-2xl mx-auto">
          I'm a React Developer passionate about crafting beautiful, modern web experiences.
        </p>
        
        <div className="flex justify-center mt-12">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <img src={profile} className='relative w-80 h-80 object-cover rounded-2xl border-2 border-purple-500/30' alt="Profile" />
          </div>
        </div>
        
        <div className="mt-10 flex gap-4 justify-center">
          <button 
            onClick={() => navigate('/projects')}
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-600/30"
          >
            View My Work
          </button>
          <button 
            onClick={() => navigate('/contact')}
            className="px-8 py-3 border border-purple-500 text-purple-400 hover:bg-purple-600/10 rounded-lg transition-all duration-300"
          >
            Contact Me
          </button>
        </div>
      </div>
    </section>
    )
}

export default Home;