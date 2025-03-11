"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form"
import { FiPlus, FiTrash2 } from "react-icons/fi"

export default function CreatePollForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      question: "",
      options: [{ text: "" }, { text: "" }],
      expiration: "3600",
      hideResults: false,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)

    // Validate options
    const filteredOptions = data.options.filter((opt) => opt.text.trim() !== "")
    if (filteredOptions.length < 2) {
      alert("Please enter at least 2 options")
      setIsSubmitting(false)
      return
    }

    try {
      // This would normally send data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, redirect to example poll
      router.push("/poll/example-poll")
    } catch (error) {
      console.error("Error creating poll:", error)
      alert("Failed to create poll. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddOption = () => {
    if (fields.length < 10) {
      append({ text: "" })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="question" className="block text-sm font-medium mb-2">
          Your Question
        </label>
        <input
          id="question"
          {...register("question", { required: "Question is required" })}
          placeholder="Ask something..."
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.question && <p className="mt-1 text-sm text-red-500">{errors.question.message}</p>}
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium">Options (minimum 2)</label>
          <button
            type="button"
            onClick={handleAddOption}
            disabled={fields.length >= 10}
            className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 disabled:opacity-50 flex items-center gap-1"
          >
            <FiPlus size={16} /> Add Option
          </button>
        </div>
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <input
                {...register(`options.${index}.text`, {
                  required: index < 2 ? "At least 2 options are required" : false,
                })}
                placeholder={`Option ${index + 1}`}
                className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {fields.length > 2 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-2 text-gray-500 hover:text-red-500"
                  aria-label="Remove option"
                >
                  <FiTrash2 size={18} />
                </button>
              )}
            </div>
          ))}
          {errors.options && <p className="mt-1 text-sm text-red-500">{errors.options.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="expiration" className="block text-sm font-medium mb-2">
            Poll Duration
          </label>
          <select
            id="expiration"
            {...register("expiration")}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="3600">1 hour</option>
            <option value="43200">12 hours</option>
            <option value="86400">24 hours</option>
            <option value="604800">1 week</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="hideResults"
            {...register("hideResults")}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label htmlFor="hideResults" className="ml-2 block text-sm">
            Hide results until poll ends
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md shadow transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-70"
      >
        {isSubmitting ? "Creating Poll..." : "Create Poll"}
      </button>
    </form>
  )
}

