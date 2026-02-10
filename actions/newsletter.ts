'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import { WelcomeEmail } from '@/emails/welcome-email';

const resend = new Resend(process.env.RESEND_API_KEY);

const NewsletterSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export type NewsletterResponse = {
    success: boolean;
    message: string;
};

export async function subscribeNewsletter(email: string): Promise<NewsletterResponse> {
    try {
        // Validate email
        const validated = NewsletterSchema.parse({ email });

        // Simulate database delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // In a real app, you'd save to a database
        console.log(`New subscriber: ${validated.email}`);

        // Send Welcome Email via Resend
        try {
            if (process.env.RESEND_API_KEY) {
                await resend.emails.send({
                    from: 'Creator Club <onboarding@resend.dev>',
                    to: validated.email,
                    subject: 'Welcome to the club, Pablo! 🥪',
                    react: WelcomeEmail({ email: validated.email }),
                });
            } else {
                console.warn("RESEND_API_KEY not found. Skipping email send.");
            }
        } catch (emailError) {
            console.error("Failed to send welcome email:", emailError);
            // We still return success: true because the user joined the list
        }

        return {
            success: true,
            message: "Welcome to the Creator Club! Check your inbox soon.",
        };

    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                success: false,
                message: error.issues[0].message,
            };
        }

        return {
            success: false,
            message: "Something went wrong. Please try again later.",
        };
    }
}
