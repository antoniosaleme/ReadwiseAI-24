import { GenerateContentUseCase } from 'src/readwise-generator/use-case';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ReadwiseGeneratorService {
  constructor(
    private readonly generateContentUseCase: GenerateContentUseCase,
  ) {}

  // @Cron('0 0 * * *') // Este cron se ejecutará todos los días a la medianoche
  // async handleCron() {
  //   console.log('Running daily content generation...');
  //   await this.generateContentUseCase.execute();
  //   console.log('Daily content generation finished.');
  // }
  @Cron('*/20 * * * *') async handleCron() {
    // Este cron se ejecutará cada minuto
    console.log(`[${new Date().toISOString()}] Running content generation...`);
    try {
      await this.generateContentUseCase.execute();
      console.log('Daily content generation finished.');
    } catch (error) {
      console.error('Error during content generation:', error);
    }
  }
}

// Run every 60 minutes for testing purposes
// cron.schedule('*/2 * * * *', async () => {
//   console.log(`[${new Date().toISOString()}] Running content generation...`);

//   try {
//     await generateContentUseCase.execute();
//     console.log('Content generation finished successfully.');
//   } catch (error) {
//     console.error('Error during content generation:', error);
//   }
// });

console.log('Cron job has been scheduled.');
