const fetchSuggestionFromChatGPT = async () => {
  const res = await fetch('/api/suggestion', {
    cache: 'no-store'
  })

  return res.json();
}

export { fetchSuggestionFromChatGPT }