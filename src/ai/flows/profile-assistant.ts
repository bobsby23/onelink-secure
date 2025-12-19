
// src/ai/flows/profile-assistant.ts
'use server';
/**
 * @fileOverview A profile assistant AI agent. The agent takes a simple prompt and creates an initial profile with relevant information, links, and suggested content blocks.
 *
 * - generateProfile - A function that handles the profile generation process.
 * - GenerateProfileInput - The input type for the generateProfile function.
 * - GenerateProfileOutput - The return type for the generateProfile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProfileInputSchema = z.object({
  prompt: z.string().describe('A simple prompt describing the desired profile, e.g., \'Software Engineer\'.'),
});
export type GenerateProfileInput = z.infer<typeof GenerateProfileInputSchema>;

const GenerateProfileOutputSchema = z.object({
  profileData: z
    .string()
    .describe(
      'A JSON string containing the initial profile data, including relevant information, links, and suggested content blocks.'
    ),
});
export type GenerateProfileOutput = z.infer<typeof GenerateProfileOutputSchema>;

export async function generateProfile(input: GenerateProfileInput): Promise<GenerateProfileOutput> {
  return generateProfileFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProfilePrompt',
  input: {schema: GenerateProfileInputSchema},
  output: {schema: GenerateProfileOutputSchema},
  prompt: `You are a profile creation assistant. Your goal is to create an initial profile with relevant information, links, and suggested content blocks based on the user's prompt. The output should be a JSON string.

User Prompt: {{{prompt}}}

Profile Data (JSON string):`,
});

const generateProfileFlow = ai.defineFlow(
  {
    name: 'generateProfileFlow',
    inputSchema: GenerateProfileInputSchema,
    outputSchema: GenerateProfileOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
