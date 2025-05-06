// Simulates an AI response with a delay
export const getMockAIResponse = async (userMessage: string): Promise<string> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  const responses = [
    "I've added that to your notes. Is there anything else you'd like to know?",
    "That's an interesting point. Would you like me to expand on that topic?",
    "Thanks for sharing. I've processed that information. What would you like to do next?",
    "I understand what you're looking for. Let me help you organize those thoughts.",
    "Great question! Here's what I can tell you about that...",
    "I've made a note of that. Would you like me to help you research this topic further?",
  ];
  
  // Return a response based on the content of the user message
  if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
    return "Hello! How can I assist you with your notes today?";
  } else if (userMessage.toLowerCase().includes('thank')) {
    return "You're welcome! Let me know if there's anything else you need help with.";
  } else if (userMessage.toLowerCase().includes('?')) {
    return "That's a great question. Let me think about it... Based on my knowledge, I'd suggest exploring this topic by breaking it down into smaller parts. Would you like me to help with that?";
  } else {
    // Return a random response for other messages
    return responses[Math.floor(Math.random() * responses.length)];
  }
};