// src/cloudinary/cloudinary.service.ts (o AudioService)

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import OpenAI from 'openai';

import { VOICES } from 'src/constants';

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);
  public openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    // Configurar Cloudinary
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });

    // Configurar OpenAI
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  // Función para generar audio usando OpenAI
  async generateAudio(prompt: string, voice?: string): Promise<Buffer> {
    const selectedVoice = VOICES[voice] ?? 'alloy';
    try {
      const mp3 = await this.openai.audio.speech.create({
        model: 'tts-1',
        voice: selectedVoice,
        input: prompt,
        response_format: 'mp3',
      });

      const buffer = Buffer.from(await mp3.arrayBuffer());
      return buffer;
    } catch (error) {
      this.logger.error('Error generating audio:', error);
      throw new Error('Failed to generate audio');
    }
  }

  // Función para subir el audio a Cloudinary
  async uploadAudio(buffer: Buffer, format = 'mp3'): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'video', // Usa 'video' para manejar archivos de audio
          format,
        },
        (error, result) => {
          if (error) {
            this.logger.error('Error uploading audio to Cloudinary', error);
            return reject(error);
          }
          this.logger.log(`Audio uploaded successfully: ${result.secure_url}`);
          resolve(result.secure_url);
        },
      );

      // Subir el buffer como stream
      uploadStream.end(buffer);
    });
  }
}
