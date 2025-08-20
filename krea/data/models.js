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