Project Title: Podorozhnyky

Podorozhnyky is a platform for people who live through their travels.

About the Project:

This project is designed for travelers and anyone who wants to share their adventures. 
The platform allows users to: Publish their own travel stories Browse stories from other users Save favorite stories Maintain a traveler profile Connect with new people and discover new destinations

Tech Stack:

Frontend:
Next.js 16 
React 19
TypeScript
TanStack React Query
Formik + Yup
Axios
React Hot Toast
TailwindCSS
React Select
React Icons
use-debounce
modern-normalize

Backend:
Node.js + Express
MongoDB + Mongoose
JWT
bcrypt
Cloudinary
Multer
Nodemailer (Brevo)
dotenv
pino-http


Features:

Authentication:
Email + password login/register
Google OAuth
Protected client routes
JWT authentication
Profile management 

Stories:
Create, edit, delete stories
Photo upload via Cloudinary
Image validation
Pagination (server-side)
Story details page
Save / unsave stories
Form validation (Formik + Yup)

Travelers:
List of travelers
Pagination “Show more”
Public traveler profile
View their stories

Pages:
/auth/register
/auth/login
/stories
/stories/[storyId]
/stories/create
/stories/[storyId]/edit
/travellers
/travellers/[travellerId]
/profile
/edit

Demo: https://project-group-6-podorozhnyky-front.vercel.app/
Back: https://github.com/RomanAnokhin-work/project-group-6-podorozhnyky-back
