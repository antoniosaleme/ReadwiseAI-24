import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ReadwiseGeneratorService } from '../readwise-generator.service';
import { TOPICS } from 'src/constants/topics';
import { VOICES } from 'src/constants';

@Injectable()
export class GenerateContentUseCase {
  constructor(
    private readonly readwiseGeneratorService: ReadwiseGeneratorService,
  ) {}

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  private async textToAudio(prompt: string, voice: string): Promise<Buffer> {
    try {
      const selectedVoice = VOICES[voice] ?? 'alloy';

      const mp3 = await this.openai.audio.speech.create({
        model: 'tts-1',
        voice: selectedVoice,
        input: prompt,
        response_format: 'mp3',
      });

      const buffer = Buffer.from(await mp3.arrayBuffer());

      return buffer;
    } catch (error) {
      console.error('Error generating audio:', error);
      throw new Error('Failed to generate audio from OpenAI');
    }
  }

  private async generateText(
    prompt: string,
    language: string,
  ): Promise<string> {
    const systemMessage = `As an expert writer in ${language}, generate a text about current news related to "${prompt}". `;
    const response = await this.openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: prompt },
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0.5,
      max_tokens: 700,
    });
    return response.choices[0].message?.content || '';
  }

  private async generateTextByDifficulty(
    prompt: string,
    difficulty: string,
  ): Promise<string> {
    const response = await this.openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `As an expert writer in German, rewrite the text at a ${difficulty} level so that it can be understood by non-native speakers with an intermediate level of German. After generating the text, at the end, provide translations into Spanish for the words that you think might be difficult to understand.`,
        },
        { role: 'user', content: prompt },
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0.5,
      max_tokens: 700,
    });
    return response.choices[0].message?.content || '';
  }

  async execute() {
    try {
      const date = new Date().toISOString().split('T')[0];
      const existingContent =
        await this.readwiseGeneratorService.findContentByDate(date);
      if (existingContent.length) {
        console.log('Content for today already exists, skipping generation.');
        return;
      }

      for (const topic of TOPICS) {
        const primaryText = await this.generateText(topic, 'de');
        const textB2 = await this.generateTextByDifficulty(primaryText, 'C2');
        const textC2 = await this.generateTextByDifficulty(primaryText, 'B2');
        const audioB2 = await this.textToAudio(textB2, 'nova');
        const audioC2 = await this.textToAudio(textC2, 'nova');
        await this.readwiseGeneratorService.saveContent(
          topic,
          textB2,
          textC2,
          audioB2,
          audioC2,
          'de',
        );
      }
      console.log('Daily content generated and saved.');
    } catch (error) {
      console.error('Error during content generation:', error);
    }
  }
}
