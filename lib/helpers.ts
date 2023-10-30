const azure_base_url =
  process.env.NODE_ENV.toLowerCase() == 'production'
    ? process.env.AZURE_BASE_URL
    : 'http://localhost:7071';

const fetchSuggestionFromChatGPT = async () => {
  const res = await fetch('/api/suggestion', {
    cache: 'no-store',
  });

  return res.json();
};

const fetchImages = async () => {
  const res = await fetch('/api/getImages', {
    cache: 'no-store',
  });

  return res.json();
};

export { fetchSuggestionFromChatGPT, fetchImages, azure_base_url };
