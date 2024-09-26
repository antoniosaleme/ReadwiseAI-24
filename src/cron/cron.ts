import * as cron from 'node-cron';
import { ReadwiseGeneratorService } from 'src/readwise-generator/readwise-generator.service';
import { GenerateContentUseCase } from 'src/readwise-generator/use-case';

const contentService = new ReadwiseGeneratorService();
const generateContentUseCase = new GenerateContentUseCase(contentService);

// cron.schedule('0 0 * * *', async () => {
//   console.log('Running daily content generation...');
//   await generateContentUseCase.execute();
//   console.log('Daily content generation finished.');
// });

// Run every 3 minutes for testing purposes
cron.schedule('*/3 * * * *', async () => {
  console.log(`[${new Date().toISOString()}] Running content generation...`);

  try {
    await generateContentUseCase.execute();
    console.log('Content generation finished successfully.');
  } catch (error) {
    console.error('Error during content generation:', error);
  }
});

console.log('Cron job has been scheduled.');
