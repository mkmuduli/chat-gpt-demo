

export const getSuggestions = async (prompt, apiKey, count = 1) => {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: prompt,
                }
            ],
            n: count,
            temperature: 1,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0.9,
        })
    });

    if (!response.ok) {
        const {error} = await response.json()
        throw(error)
    }

    const {choices} = await response.json()

   return choices


}