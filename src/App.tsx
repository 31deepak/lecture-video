import VideoPlayer from './components/VideoPlayer';
import { BookOpen } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">
              Learning Platform
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Introduction to React
          </h2>
          <p className="text-gray-600 mb-6">
            Learn the fundamentals of React and build modern web applications.
          </p>
          <VideoPlayer
            videoId="react-intro"
            url="https://www.youtube.com/watch?v=Tn6-PIqc4UM"
          />
        </div>
      </main>
    </div>
  );
}

export default App;