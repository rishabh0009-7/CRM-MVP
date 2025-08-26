// Test OpenRouter API connection
const apiKey = "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";

async function testOpenRouter() {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'http://localhost:5173',
        'X-Title': 'SyncAi Dashboard'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku',
        messages: [{
          role: 'user',
          content: 'Hello, this is a test message'
        }],
        max_tokens: 100
      })
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error response:', errorText);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('Success! Response:', data);
    return data;
  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
}

testOpenRouter().then(() => {
  console.log('OpenRouter test completed successfully');
}).catch(error => {
  console.error('OpenRouter test failed:', error);
});
