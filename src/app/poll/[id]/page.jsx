import PollView from "@/components/poll-view"
import { notFound } from "next/navigation"

// This would normally fetch from your backend
const getPoll = async (id) => {
  // Mock data for demonstration
//   const polls = {
//     "example-poll": {
//       id: "example-poll",
//       question: "What is your favorite programming language?",
//       options: [
//         { id: 1, text: "JavaScript", votes: 42 },
//         { id: 2, text: "Python", votes: 38 },
//         { id: 3, text: "TypeScript", votes: 27 },
//         { id: 4, text: "Rust", votes: 18 },
//       ],
//       createdAt: new Date(Date.now() - 3600000).toISOString(),
//       expiresAt: new Date(Date.now() + 3600000).toISOString(),
//       hideResults: false,
//       reactions: { trending: 5, like: 12 },
//     },
//   }

  // Simulate API delay
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/polls/${id}`);
    if (!res.ok) throw new Error("Poll not found");
    return await res.json();
  } catch (err) {
    console.error("Error fetching poll:", err);
    return null; // Handle errors
  }
}

export default async function PollPage({ params }) {
    const {id} = await params
  const poll = await getPoll(id)
    console.log(poll)
  if (!poll) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <PollView poll={poll} />
    </div>
  )
}

