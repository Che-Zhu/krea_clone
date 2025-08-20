export const editModels = [
  {
    id: 'flux',
    name: 'Flux',
    description: 'More tools, more control. Define exact regions to change, or expand your image',
    capabilities: ['Inpainting', 'Outpainting'],
    image: '/images/flux_inpaint.webp',
    category: 'advanced',
    provider: 'Flux',
    featured: true
  },
  {
    id: 'qwen-image-edit',
    name: 'Qwen Image Edit',
    description: 'Advanced image editing model from Alibaba',
    capabilities: ['Prompt Editing'],
    image: '/images/qwen_edit.webp',
    category: 'advanced',
    provider: 'Alibaba',
    featured: false
  },
  {
    id: 'flux-kontext-dev',
    name: 'Flux Kontext Dev',
    description: 'New frontier model designed for image editing',
    capabilities: ['Prompt Editing'],
    image: '/images/flux_kontext_dev.webp',
    category: 'frontier',
    provider: 'Flux',
    featured: false
  },
  {
    id: 'flux-kontext-pro',
    name: 'Flux Kontext Pro',
    description: 'Fast iterative editing with character consistency and local edits across scenes',
    capabilities: ['Prompt Editing'],
    image: '/images/flux_kontext_pro.webp',
    category: 'pro',
    provider: 'Flux',
    featured: true
  },
  {
    id: 'flux-kontext-max',
    name: 'Flux Kontext Max',
    description: 'Maximum performance with improved prompt adherence and typography generation',
    capabilities: ['Prompt Editing'],
    image: '/images/flux_kontext_max.webp',
    category: 'premium',
    provider: 'Flux',
    featured: true
  },
  {
    id: 'chatgpt-image',
    name: 'ChatGPT Image',
    description: "OpenAI's most advanced image model",
    capabilities: ['Prompt Editing'],
    image: '/images/openai.webp',
    category: 'advanced',
    provider: 'OpenAI',
    featured: true
  },
  {
    id: 'seededit',
    name: 'SeedEdit',
    description: 'New frontier model designed for image editing',
    capabilities: ['Prompt Editing'],
    image: '/images/seededit.webp',
    category: 'frontier',
    provider: 'SeedEdit',
    featured: false
  },
  {
    id: 'ideogram',
    name: 'Ideogram',
    description: 'New frontier model designed for image editing',
    capabilities: ['Inpainting'],
    image: '/images/ideogram.webp',
    category: 'frontier',
    provider: 'Ideogram',
    featured: false
  }
];

// Helper functions to filter and organize models
export const getModelsByCategory = (category) => {
  return editModels.filter(model => model.category === category);
};

export const getFeaturedModels = () => {
  return editModels.filter(model => model.featured);
};

export const getModelsByCapability = (capability) => {
  return editModels.filter(model => 
    model.capabilities.includes(capability)
  );
};

export const getModelById = (id) => {
  return editModels.find(model => model.id === id);
};

export const getAllCapabilities = () => {
  const capabilities = new Set();
  editModels.forEach(model => {
    model.capabilities.forEach(cap => capabilities.add(cap));
  });
  return Array.from(capabilities);
};

export const getProviders = () => {
  const providers = new Set();
  editModels.forEach(model => providers.add(model.provider));
  return Array.from(providers);
};

// Categories configuration
export const modelCategories = {
  'advanced': {
    name: 'Advanced',
    description: 'Professional-grade editing tools',
    color: 'blue'
  },
  'frontier': {
    name: 'Frontier',
    description: 'Cutting-edge experimental models',
    color: 'purple'
  },
  'pro': {
    name: 'Pro',
    description: 'Enhanced performance and features',
    color: 'green'
  },
  'premium': {
    name: 'Premium',
    description: 'Maximum performance and capabilities',
    color: 'gold'
  }
};

// Capabilities configuration
export const capabilityConfig = {
  'Inpainting': {
    description: 'Fill in or modify specific areas of an image',
    icon: '🎨',
    color: 'pink'
  },
  'Outpainting': {
    description: 'Extend images beyond their original boundaries',
    icon: '🖼️',
    color: 'blue'
  },
  'Prompt Editing': {
    description: 'Edit images using text descriptions',
    icon: '✍️',
    color: 'purple'
  }
};
