import { useState, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import Head from 'next/head';
import { motion } from 'framer-motion';
import DarkModeToggle from '../components/DarkModeToggle';
import AnimatedNotebook from '../components/AnimatedNotebook';
import SolutionBox from '../components/SolutionBox';

export default function SolvePage() {
  const { darkMode } = useContext(ThemeContext);
  const [input, setInput] = useState('');
  const [image, setImage] = useState(null);
  const [solution, setSolution] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() && !image) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real implementation, you would call your backend API here
      // which would then call the DeepSeek API
      const response = await fetch('/api/solve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          problem: input,
          // For image, you would typically upload to storage first and send URL
        }),
      });
      
      if (!response.ok) throw new Error('Failed to get solution');
      
      const data = await response.json();
      setSolution(data.solution);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Head>
        <title>Solve Problems | IITian Dost</title>
        <meta name="description" content="Get AI-powered solutions for JEE problems" />
      </Head>

      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center mr-3">
            <span className="text-white font-bold">ID</span>
          </div>
          <h1 className="text-xl font-bold">IITian Dost</h1>
        </div>
        <DarkModeToggle />
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-6">Solve JEE Problems Instantly</h1>
          
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="mb-4">
              <label htmlFor="problem-input" className="block mb-2 font-medium">
                Enter your problem:
              </label>
              <textarea
                id="problem-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={`w-full p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
                rows="5"
                placeholder="Type or paste your JEE problem here..."
                disabled={isLoading}
              />
            </div>
            
            <div className="mb-6">
              <label className="block mb-2 font-medium">Or upload an image:</label>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative border-2 border-dashed ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-lg p-8 text-center cursor-pointer`}
              >
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isLoading}
                />
                <div className="flex flex-col items-center justify-center">
                  <svg className={`w-12 h-12 mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className={`mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>PNG, JPG (MAX. 5MB)</p>
                </div>
              </motion.div>
              {image && (
                <div className="mt-4 flex items-center">
                  <img src={image} alt="Uploaded problem" className="h-20 object-contain rounded border" />
                  <button 
                    type="button" 
                    onClick={() => setImage(null)}
                    className="ml-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            
            <motion.button
              type="submit"
              disabled={isLoading || (!input.trim() && !image)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-6 py-3 rounded-lg font-medium ${isLoading || (!input.trim() && !image) ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'} text-white flex items-center justify-center`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Solving...
                </>
              ) : (
                'Get Solution'
              )}
            </motion.button>
          </form>
          
          {error && (
            <div className="p-4 mb-6 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100">
              {error}
            </div>
          )}
          
          {solution ? (
            <SolutionBox solution={solution} />
          ) : isLoading ? (
            <AnimatedNotebook />
          ) : null}
        </motion.div>
      </main>
    </div>
  );
}