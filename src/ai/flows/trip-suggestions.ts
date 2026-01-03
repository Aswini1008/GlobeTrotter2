'use server';
/**
 * @fileOverview This file implements a Genkit flow for providing trip suggestions.
 *
 * - getTripSuggestions - A function that takes a destination and returns activity and sight-seeing suggestions.
 * - TripSuggestionsInput - The input type for the getTripSuggestions function.
 * - TripSuggestionsOutput - The return type for the getTripSuggestions function.
 * - TripSuggestion - A single suggestion item.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TripSuggestionsInputSchema = z.object({
  destination: z.string().describe('The travel destination, e.g., "Paris, France"'),
});
export type TripSuggestionsInput = z.infer<typeof TripSuggestionsInputSchema>;

const TripSuggestionSchema = z.object({
  name: z.string().describe('The name of the suggested place or activity.'),
  imageHint: z
    .string()
    .describe(
      'A 1-2 word hint for finding a suitable image, e.g., "Eiffel Tower"'
    ),
});
export type TripSuggestion = z.infer<typeof TripSuggestionSchema>;

const TripSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(TripSuggestionSchema)
    .describe('A list of 4-8 suggestions.'),
});
export type TripSuggestionsOutput = z.infer<typeof TripSuggestionsOutputSchema>;

export async function getTripSuggestions(
  input: TripSuggestionsInput
): Promise<TripSuggestionsOutput> {
  return tripSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'tripSuggestionsPrompt',
  input: { schema: TripSuggestionsInputSchema },
  output: { schema: TripSuggestionsOutputSchema },
  prompt: `You are a world-class travel expert. A user is planning a trip to {{{destination}}}.

  Generate a list of 4 to 8 popular and interesting sights or activities for this destination.
  For each suggestion, provide its name and a concise 1-2 word hint for finding a relevant image.

  Format the output as a JSON object that adheres to the provided schema.
`,
});

const tripSuggestionsFlow = ai.defineFlow(
  {
    name: 'tripSuggestionsFlow',
    inputSchema: TripSuggestionsInputSchema,
    outputSchema: TripSuggestionsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
