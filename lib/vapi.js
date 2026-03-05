const VAPI_API_KEY = process.env.VAPI_API_KEY;
const VAPI_BASE_URL = 'https://api.vapi.ai';

if (!VAPI_API_KEY) {
  console.warn('VAPI_API_KEY not set. Vapi features will not work.');
}

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${VAPI_API_KEY}`,
};

/**
 * Create a new Vapi assistant
 * @param {Object} config - Configuration object
 * @param {string} config.name - Assistant name
 * @param {string} config.firstMessage - First message greeting
 * @param {Object} config.businessConfig - Business configuration with systemPrompt, hours, services, FAQs
 * @returns {Promise<Object>} Created assistant data
 */
export const createAssistant = async (config) => {
  const {
    name,
    firstMessage,
    businessConfig = {},
  } = config;

  if (!VAPI_API_KEY) {
    throw new Error('VAPI_API_KEY is not configured');
  }

  const payload = {
    name,
    firstMessage,
    model: {
      provider: 'openai',
      model: 'gpt-4',
    },
    voice: {
      provider: '11labs',
      voiceId: '21m00Tcm4TlvDq8ikWAM',
    },
    transcriber: {
      provider: 'deepgram',
      model: 'nova-2',
    },
    systemPrompt: businessConfig.systemPrompt || '',
    businessHours: businessConfig.hours || null,
    services: businessConfig.services || [],
    faqs: businessConfig.faqs || [],
  };

  try {
    const response = await fetch(`${VAPI_BASE_URL}/assistant`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Vapi API error: ${error.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to create Vapi assistant:', error);
    throw error;
  }
};

/**
 * Get an assistant by ID
 * @param {string} id - Assistant ID
 * @returns {Promise<Object>} Assistant data
 */
export const getAssistant = async (id) => {
  if (!VAPI_API_KEY) {
    throw new Error('VAPI_API_KEY is not configured');
  }

  try {
    const response = await fetch(`${VAPI_BASE_URL}/assistant/${id}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Vapi API error: ${error.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch Vapi assistant:', error);
    throw error;
  }
};

/**
 * List all calls for an assistant
 * @param {string} assistantId - Assistant ID
 * @returns {Promise<Array>} Array of call objects
 */
export const listCalls = async (assistantId) => {
  if (!VAPI_API_KEY) {
    throw new Error('VAPI_API_KEY is not configured');
  }

  try {
    const response = await fetch(
      `${VAPI_BASE_URL}/call?assistantId=${encodeURIComponent(assistantId)}`,
      {
        method: 'GET',
        headers,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Vapi API error: ${error.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to list Vapi calls:', error);
    throw error;
  }
};

/**
 * Get a single call with transcript
 * @param {string} callId - Call ID
 * @returns {Promise<Object>} Call data including transcript
 */
export const getCall = async (callId) => {
  if (!VAPI_API_KEY) {
    throw new Error('VAPI_API_KEY is not configured');
  }

  try {
    const response = await fetch(`${VAPI_BASE_URL}/call/${callId}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Vapi API error: ${error.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch Vapi call:', error);
    throw error;
  }
};
