import PollResults from "@/components/poll-results"
import { notFound } from "next/navigation"

// This would normally fetch from your backend
const getPoll = async (id) => {
  // Mock data for demonstration
  const polls = {
    "example-poll": {
      id: "example-poll",
      question: "What is your favorite programming language?",
      options: [
        { id: 1, text: "JavaScript", votes: 42 },
        { id: 2, text: "Python", votes: 38 },
        { id: 3, text: "TypeScript", votes: 27 },
        { id: 4, text: "Rust", votes: 18 },
      ],
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      expiresAt: new Date(Date.now() + 3600000).toISOString(),
      hideResults: false,
      reactions: { trending: 5, like: 12 },
      totalVotes: 125,
      comments: [
        { id: 1, text: "Great poll!", createdAt: new Date(Date.now() - 1800000).toISOString() },
        { id: 2, text: "I love JavaScript!", createdAt: new Date(Date.now() - 900000).toISOString() },
      ],
    },
  }

  // Simulate API delay
//   const res = await fetch(`/api/polls/${id}`);
//   const data = await res.json()
//   return data
}

export default async function ResultsPage({ params }) {
    const {id} = await params
  const poll = await getPoll(id)

  if (!poll) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <PollResults poll={poll} />
    </div>
  )
}

