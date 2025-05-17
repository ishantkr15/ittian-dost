import { motion } from 'framer-motion';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export default function SolutionBox({ solution }) {
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`mt-8 p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
    >
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-3">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
        <h2 className="text-xl font-bold">AI-Generated Solution</h2>
      </div>
      
      <div className={`prose max-w-none ${darkMode ? 'prose-invert' : ''}`}>
        {solution.split('\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="font-medium mb-2">Was this helpful?</h3>
        <div className="flex space-x-4">
          <button className="px-4 py-2 rounded-lg bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 hover:bg-green-200 dark:hover:bg-green-800">
            👍 Yes
          </button>
          <button className="px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 hover:bg-red-200 dark:hover:bg-red-800">
            👎 No
          </button>
        </div>
      </div>
    </motion.div>
  );
}