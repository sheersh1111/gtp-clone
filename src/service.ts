import axios from "axios";

const API_URL = "https://api.perplexity.ai/chat/completions";
const AUTH_TOKEN = "Bearer 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";

/**
 * Function to prompt the Perplexity API with a question.
 * @param question The question to send to the API.
 * @returns A Promise with the API response.
 */
export const promptQuestion = async (question: string) => {
  const headers = {
    Authorization: AUTH_TOKEN,
    "Content-Type": "application/json",
  };

  const payload = {
    model: "sonar",
    messages: [
      { role: "system", content: "You are an expert assistant." },
      { role: "user", content: question },
    ],
    max_tokens: 500,
    temperature: 0.2,
    top_p: 0.9,
    search_domain_filter: ["perplexity.ai"],
    return_images: false,
    return_related_questions: true,
    search_recency_filter: "month",
    top_k: 0,
    stream: false,
    presence_penalty: 0,
    frequency_penalty: 1,
    response_format: null,
  };

  try {
    const response = await axios.post(API_URL, payload, { headers });
    return response.data; // Return the API response
  } catch (error: any) {
    console.error("Error prompting Perplexity API:", error.message);
    throw new Error(
      error.response?.data?.message || "Failed to get a response from the API"
    );
  }
};
