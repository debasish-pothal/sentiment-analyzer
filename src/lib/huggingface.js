import { InferenceClient } from "@huggingface/inference";

export class HuggingFace {
  constructor() {
    this.model = "distilbert/distilbert-base-uncased-finetuned-sst-2-english";
    this.provider = "hf-inference";
    this.client = new InferenceClient(import.meta.env.VITE_HF_API_TOKEN);
  }

  async textClassification(text) {
    try {
      const response = await this.client.textClassification({
        model: this.model,
        inputs: text,
        provider: this.provider,
      });
      return response;
    } catch (error) {
      throw new Error("Could not process your request. Please try again.");
    }
  }
}
