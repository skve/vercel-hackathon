import { FlightState } from "@/app/types/aviation";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

const openai = createOpenAI({
  compatibility: "strict",
  apiKey: process.env.OPENAI_API_KEY,
});

// Define the schema for the structured output
const AirportAnalysisSchema = z.object({
  summary: z.string(),
  notes: z.array(z.string()),
  derogations: z.array(z.string()),
  isRecommended: z.boolean(),
});

export async function analyzeAirportData(
  metar: string,
  notams: string[],
  flightState: FlightState,
  eta: Date
) {
  const response = await generateObject({
    model: openai("gpt-4o-2024-11-20", {
      structuredOutputs: true,
    }),
    schema: AirportAnalysisSchema,
    schemaName: "AirportAnalysis",
    schemaDescription:
      "An analysis of an airport's suitability as a diversion option",
    prompt: `
      Analyze the following METAR and NOTAMs for an airport with an estimated time of arrival of ${eta.toISOString()}:

      METAR: ${metar}

      NOTAMs:
      ${notams.join("\n")}

      Note, you must take into account the current flight state and the aircraft's capabilities.
      Aircraft: ${flightState.airplaneModel.type}
      Remaining Fuel: ${flightState.remainingFuel.toLocaleString()} kg
      Range: ${flightState.airplaneModel.range.toLocaleString()} km remaining
      Current Position: ${flightState.currentPosition.latitude.toFixed(4)}°N, ${flightState.currentPosition.longitude.toFixed(4)}°W     

      Provide a brief 1-2 sentence summary of the airport's suitability as a diversion option. 
      Then, list any positive notes and negative derogations. 
      If there are any conditions that make this airport unsafe as a diversion option, clearly state that it is not recommended. 
      Be conservative in your assessment.
    `,
  });

  return response;
}
