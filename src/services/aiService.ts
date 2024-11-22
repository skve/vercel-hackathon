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
      "A safety-focused analysis of an airport's suitability as a diversion option",
    prompt: `You are an aviation safety expert analyzing diversion airport options.
    
          TASK:
          Evaluate the following airport data for ${eta.toISOString()} as a potential diversion option.
          
          CRITICAL SAFETY PARAMETERS:
          1. Aircraft Type: ${flightState.airplaneModel.type}
          2. Fuel Status: ${flightState.remainingFuel.toLocaleString()} kg
          3. Range Capability: ${flightState.airplaneModel.range.toLocaleString()} km remaining
          4. Current Position: ${flightState.currentPosition.latitude.toFixed(
            4
          )}°N, ${flightState.currentPosition.longitude.toFixed(4)}°W
    
          WEATHER CONDITIONS:
          ${metar}
    
          OPERATIONAL RESTRICTIONS:
          ${notams.join("\n")}
    
          REQUIRED OUTPUT FORMAT:
          1. summary: Concise 1-2 sentence evaluation focusing on safety-critical factors
          2. notes: List all positive factors supporting this as a diversion option
          3. derogations: List all safety concerns, restrictions, or limitations
          4. isRecommended: Set false if ANY safety criteria are not met (weather minimums, fuel reserves, runway requirements, or operational restrictions)
    
          EVALUATION CRITERIA:
          - Weather must meet aircraft minimums with adequate safety margins
          - Runway length/width must be sufficient for aircraft type
          - Fuel reserves must allow for approach and go-around
          - All critical airport systems must be operational
          - NOTAMs must not restrict safe operations
    
          Be conservative in your assessment. When in doubt, prioritize safety.`,
  });

  return response;
}
