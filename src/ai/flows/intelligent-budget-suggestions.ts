'use server';

/**
 * @fileOverview This file implements the Genkit flow for providing intelligent budget suggestions.
 *
 * - intelligentBudgetSuggestions - A function that takes planned activities and destinations as input and returns budget optimization suggestions.
 * - IntelligentBudgetSuggestionsInput - The input type for the intelligentBudgetSuggestions function.
 * - IntelligentBudgetSuggestionsOutput - The return type for the intelligentBudgetSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentBudgetSuggestionsInputSchema = z.object({
  tripName: z.string().describe('The name of the trip.'),
  destination: z.string().describe('The destination city for the trip.'),
  activities: z
    .array(
      z.object({
        title: z.string().describe('The title of the activity.'),
        estimatedCost: z.number().describe('The estimated cost of the activity.'),
        duration: z.string().describe('The duration of the activity.'),
      })
    )
    .describe('The list of planned activities.'),
  totalBudget: z.number().describe('The total budget for the trip.'),
});
export type IntelligentBudgetSuggestionsInput = z.infer<
  typeof IntelligentBudgetSuggestionsInputSchema
>;

const IntelligentBudgetSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(
      z.object({
        activity: z.string().describe('The activity the suggestion applies to.'),
        suggestion: z.string().describe('The budget optimization suggestion.'),
      })
    )
    .describe('A list of budget optimization suggestions.'),
});
export type IntelligentBudgetSuggestionsOutput = z.infer<
  typeof IntelligentBudgetSuggestionsOutputSchema
>;

export async function intelligentBudgetSuggestions(
  input: IntelligentBudgetSuggestionsInput
): Promise<IntelligentBudgetSuggestionsOutput> {
  return intelligentBudgetSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentBudgetSuggestionsPrompt',
  input: {schema: IntelligentBudgetSuggestionsInputSchema},
  output: {schema: IntelligentBudgetSuggestionsOutputSchema},
  prompt: `You are a travel budget optimization expert.

  Based on the trip details below, provide suggestions to optimize the budget.

  Trip Name: {{{tripName}}}
  Destination: {{{destination}}}
  Total Budget: {{{totalBudget}}}

  Activities:
  {{#each activities}}
  - Title: {{{title}}}, Estimated Cost: {{{estimatedCost}}}, Duration: {{{duration}}}
  {{/each}}

  Provide specific and actionable suggestions, such as recommending affordable alternatives or suggesting free activities.
  Format the output as a JSON object with a list of suggestions, each including the activity and the suggestion.
`,
});

const intelligentBudgetSuggestionsFlow = ai.defineFlow(
  {
    name: 'intelligentBudgetSuggestionsFlow',
    inputSchema: IntelligentBudgetSuggestionsInputSchema,
    outputSchema: IntelligentBudgetSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
