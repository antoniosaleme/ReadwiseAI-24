// src/readwise-generator.use-case.ts

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ReadwiseGeneratorService } from '../readwise-generator.service';
import { TOPICS } from 'src/constants/topics';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class GenerateContentUseCase {
  constructor(
    private readonly cloudinaryService: CloudinaryService,

    // Using forwardRef to avoid circular dependency
    @Inject(forwardRef(() => ReadwiseGeneratorService))
    private readonly readwiseGeneratorService: ReadwiseGeneratorService,
  ) {}

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
        const textB2 = await this.generateTextByDifficulty(primaryText, 'B2');
        const textC2 = await this.generateTextByDifficulty(primaryText, 'C2');
        const difficultWordsB2 = await this.getDifficultWordsWithTranslations(
          textB2,
          'B2',
        );
        const difficultWordsC2 = await this.getDifficultWordsWithTranslations(
          textC2,
          'C2',
        );

        console.log('difficultWordsB2: ', difficultWordsB2);

        // const formattedDifficultWordsB2 = difficultWordsB2.map(
        //   (wordObj) => `${wordObj.word}: ${wordObj.translation}`,
        // );
        // const formattedDifficultWordsC2 = difficultWordsC2.map(
        //   (wordObj) => `${wordObj.word}: ${wordObj.translation}`,
        // );

        const audioB2Buffer = await this.cloudinaryService.generateAudio(
          textB2,
          'nova',
        );
        const audioC2Buffer = await this.cloudinaryService.generateAudio(
          textC2,
          'nova',
        );

        const audioB2Url =
          await this.cloudinaryService.uploadAudio(audioB2Buffer);
        const audioC2Url =
          await this.cloudinaryService.uploadAudio(audioC2Buffer);

        await this.readwiseGeneratorService.saveContent(
          topic,
          textB2,
          textC2,
          difficultWordsB2,
          difficultWordsC2,
          audioB2Url,
          audioC2Url,
          'de',
        );
      }
      console.log('Daily content generated and saved.');
    } catch (error) {
      console.error('Error during content generation:', error);
    }
  }

  private async generateText(
    prompt: string,
    language: string,
  ): Promise<string> {
    const systemMessage = `As an expert writer in ${language}, generate a text about current news related to "${prompt}".`;
    const response =
      await this.cloudinaryService.openai.chat.completions.create({
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
    language: string = 'de',
  ): Promise<string> {
    const response =
      await this.cloudinaryService.openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `As an expert writer in German, rewrite the text in ${language} at a ${difficulty} level so that it can be understood by non-native german speakers.`,
          },
          { role: 'user', content: prompt },
        ],
        model: 'gpt-3.5-turbo',
        temperature: 0.5,
        max_tokens: 700,
      });
    return response.choices[0].message?.content || '';
  }

  private async getDifficultWordsWithTranslations(
    prompt: string,
    difficulty: string,
  ): Promise<{ word: string; translation: string }[]> {
    const response =
      await this.cloudinaryService.openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `Please identify and list words from the following text that may be difficult for learners with a ${difficulty} level of German proficiency. For each difficult word, provide its translation into English. Return the result as a valid JSON array of objects where each object has a "word" and a "translation" property. Do not include markdown or other formatting.`,
          },
          { role: 'user', content: prompt },
        ],
        model: 'gpt-3.5-turbo',
        temperature: 0.5,
        max_tokens: 700,
      });

    const result = response.choices[0].message?.content || '';

    // Imprimir el resultado devuelto por OpenAI
    console.log('OpenAI Response:', result);

    try {
      // Intentar parsear el resultado como JSON
      return JSON.parse(result);
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      return []; // Retornar un array vacío si el parseo falla
    }
  }
}
