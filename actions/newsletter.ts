'use server';

import { z } from 'zod';

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

        // In a real app, you'd save to a database like Supabase, Prisma, or a mailing list API
        console.log(`New subscriber: ${validated.email}`);

        // For now, we'll simulate success
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
