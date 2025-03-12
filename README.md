```markdown
# AnyPoll

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://any-poll.vercel.app/)

AnyPoll is a privacy-focused polling application that allows users to create anonymous, time-limited polls without requiring any login. Designed for simplicity and user privacy, AnyPoll ensures that your polls are both private and ephemeral.

## Features

- **Anonymous Voting**: No registration or login required to create or participate in polls.
- **Time-Limited Polls**: Polls automatically expire after a set duration (1 hour, 12 hours, 24 hours, or 1 week).
- **Optional Result Visibility**: Choose to hide results until the poll ends to prevent bias.
- **Real-Time Reactions**: Engage with polls using reactions like "Trending" and "Like".
- **Responsive Design**: Seamless experience across devices with dark/light mode support.

## Live Demo

Explore the live application here: [AnyPoll Live](https://any-poll.vercel.app/)

## Tech Stack

- **Next.js**: React framework for server-side rendering and static site generation.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **React Hook Form**: Simplifies form handling with React hooks.
- **React Icons**: Collection of popular icons as React components.
- **MongoDB**: NoSQL database for flexible and scalable data storage.
- **REST API**: Backend architecture for handling HTTP requests and responses.

## Getting Started

To run AnyPoll locally, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/gaznafis007/any-poll.git
   cd any-poll
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables**:

   Create a `.env.local` file in the root directory and add your MongoDB connection string:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the Development Server**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

- `/public`: Static assets like images and icons.
- `/src`:
  - `/app`: Main application components and pages.
  - `/components`: Reusable UI components.
  - `/lib`: Utility functions and database connection logic.
  - `/styles`: Global and component-specific styles.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code adheres to the project's coding standards and includes relevant tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [MongoDB](https://www.mongodb.com/)
- [Vercel](https://vercel.com/) for deployment and hosting.

---

*Note: This project is a work in progress. Feedback and suggestions are appreciated to improve AnyPoll further.*
``` 