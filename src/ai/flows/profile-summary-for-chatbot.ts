
'use server';

/**
 * @fileOverview A profile summary AI agent for chatbot interactions.
 *
 * - profileSummaryForChatbot - A function that generates a summary of a user's public profile for use in a chatbot.
 * - ProfileSummaryForChatbotInput - The input type for the profileSummaryForChatbot function.
 * - ProfileSummaryForChatbotOutput - The return type for the profileSummaryForChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProfileSummaryForChatbotInputSchema = z.object({
  profileData: z
    .string()
    .describe("The user's public profile data, containing information to be summarized."),
});
export type ProfileSummaryForChatbotInput = z.infer<typeof ProfileSummaryForChatbotInputSchema>;

const ProfileSummaryForChatbotOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise summary of the user profile, suitable for providing context to a chatbot answering visitor queries.'
    ),
});
export type ProfileSummaryForChatbotOutput = z.infer<typeof ProfileSummaryForChatbotOutputSchema>;

export async function profileSummaryForChatbot(
  input: ProfileSummaryForChatbotInput
): Promise<ProfileSummaryForChatbotOutput> {
  return profileSummaryForChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'profileSummaryForChatbotPrompt',
  input: {schema: ProfileSummaryForChatbotInputSchema},
  output: {schema: ProfileSummaryForChatbotOutputSchema},
  prompt: `You are an AI assistant designed to create summaries of user profiles for use in a chatbot.

  Given the following user profile data, create a concise and informative summary that highlights key information
  relevant to answering visitor questions. Focus on details about the user's background, skills, interests, and offerings.

  Profile Data:
  {{profileData}}

  Summary:`, // Use Handlebars templating language. Do not use Jinja or Django templates.
});

const profileSummaryForChatbotFlow = ai.defineFlow(
  {
    name: 'profileSummaryForChatbotFlow',
    inputSchema: ProfileSummaryForChatbotInputSchema,
    outputSchema: ProfileSummaryForChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
