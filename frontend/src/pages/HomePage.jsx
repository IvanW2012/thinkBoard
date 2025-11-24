import React from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUi from '../components/RateLimitedUi'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import NoteCard from '../components/NoteCard'
import NoteNotFound from '../components/NoteNotFound'

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [notes, setNotes] = React.useState([])

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/notes')
        const data = await response.json()
        if (!response.ok) {
          if (response.status === 429) {
            setIsRateLimited(true)
          }
        } else {
          console.log(data)
          setNotes(data)
          setIsRateLimited(false)
        } 
      } catch (error) {
        console.error('Error fetching notes:', error)
        if (error.response && error.response.status === 429) {
          setIsRateLimited(true)
        } else {
          toast.error('Error fetching notes')
        }
      } finally {
        setIsLoading(false)
      }
    };

    fetchNotes();
  }, [])

  return (
    <div className='min-h-screen'>
      <Navbar />

      {isRateLimited && <RateLimitedUi />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {isLoading && <div className='text-center text-primary py-10'>loading</div>}

        {notes.length === 0 && !isRateLimited && <NoteNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage