# ImpreX AI

A Next.js application that estimates verified impressions and engagements for X (Twitter) creators using AI-based approximation.

## Features

- **AI-Powered Analysis**: Uses OpenAI Vision (GPT-4o) to read analytics screenshots.
- **Heuristic Estimation**: Calculates verified reach based on engagement patterns.
- **Privacy First**: No images are stored permanently.
- **Responsive Design**: Mobile-first glassmorphism UI.

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- OpenAI API

## Setup

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment**:
   Copy `.env.local.example` to `.env.local` and add your OpenAI API Key.
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local`:
   ```env
   OPENAI_API_KEY=sk-your-key-here
   ```
4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3](000http://localhost:3000) inside of this AI preview environment.

## Usage

1. Go to your X (Twitter) Analytics dashboard.
2. Take a screenshot of the "Tweets" summary or a specific tweet's details showing Impressions and Engagements.
3. Upload the screenshot to the app.
4. Enter your username.
5. Get your estimated verified impact report.

## Deployment

Deploy easily with [Vercel](https://imprex-ai.vercel.app) for automatic continuous deployment:

1. Push your code to a Git repository (GitHub, GitLab, Bitbucket).
2. Import the project into Vercel.
3. Add your `OPENAI_API_KEY` in the Environment Variables settings.
4. Deploy!

For verified manual setup, see `.agent/workflows/deploy_to_vercel.md`.

Or deploy directly from the command line:
```bash
# Run this if 'npx vercel' fails
node node_modules/vercel/dist/vc.js deploy
```

## GitHub Setup
To push this project to GitHub:
1. Create a new repository named `imprex-ai` on [GitHub](https://github.com/new).
2. Run the following command:
   ```bash
   git branch -M main
   git push -u origin main
   ```
   *(Note: The remote origin has already been configured for you locally)*

## Disclaimer

This tool provides **estimates** based on general engagement patterns. It has no official connection to X Corp and cannot access private verified data. Results are for informational purposes only.
