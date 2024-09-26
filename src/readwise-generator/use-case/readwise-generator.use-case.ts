import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ReadwiseGeneratorService } from '../readwise-generator.service';
@Injectable()
export class GenerateContentUseCase {
  constructor(
    private readonly readwiseGeneratorService: ReadwiseGeneratorService,
  ) {}
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  private async generateText(
    prompt: string,
    level: 'B2' | 'C2',
    language: string,
  ): Promise<string> {
    const systemMessage = `Generate a text in ${language} about ${prompt} with a ${level} level of competence.`;
    const response = await this.openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: prompt },
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0.5,
      max_tokens: 300,
    });
    return response.choices[0].message?.content || '';
  }
  async execute() {
    const today = new Date().toISOString().split('T')[0];
    const existingContent =
      await this.readwiseGeneratorService.findContentByDate(today);
    if (existingContent.length) {
      console.log('Content for today already exists, skipping generation.');
      return;
    }
    const topics = [
      'Sports',
      'Politics',
      'Technology News',
      'Economy',
      'Culture and Entertainment',
      'Health and Wellness',
      'Environment',
      'Science',
      'Travel and Tourism',
    ];
    for (const topic of topics) {
      const textB2 = await this.generateText(topic, 'B2', 'es');
      const textC2 = await this.generateText(topic, 'C2', 'es');
      await this.readwiseGeneratorService.saveContent(
        topic,
        textB2,
        textC2,
        'es',
      );
    }
    console.log('Daily content generated and saved.');
  }
}
