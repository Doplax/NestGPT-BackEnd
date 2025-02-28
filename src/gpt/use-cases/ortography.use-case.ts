interface Options {
  prompt: string;
}

export const ortographyCheckUseCase = async (options: Options) => {
  const { prompt } = options;
  return { prompt: prompt, apiKey: process.env.OPEN_API_KEY };
};
