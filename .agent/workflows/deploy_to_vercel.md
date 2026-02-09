---
description: How to deploy this project to Vercel for continuous deployment.
---

1. Ensure you have the Vercel CLI installed. If not, follow instructions at https://vercel.com/docs/cli.
2. Initialize a git repository if you haven't already:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
3. Push your code to a remote repository (GitHub, GitLab, or Bitbucket).
4. Go to [Vercel](https://vercel.com) and sign up or log in.
5. Click "Add New..." -> "Project".
6. Import your repository.
7. Vercel will automatically detect that this is a Next.js project.
8. Configure the environment variables:
   - Add `OPENAI_API_KEY` with your OpenAI API key.
9. Click "Deploy".
10. Your project will automatically rebuild and deploy whenever you push new changes to the repository.
