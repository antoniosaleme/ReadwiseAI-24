export class CreateReadwiseGeneratorDto {
  topic: string;
  slug: string;
  levelB2: string;
  levelC2: string;
  difficultWordsB2: { word: string; translation: string }[];
  difficultWordsC2: { word: string; translation: string }[];
  audioB2Url: string;
  audioC2Url: string;
  language: string;
}
