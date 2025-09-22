import { Request, Response } from 'express';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

// Data for the help sections - in a real app this would likely come from a database
const helpSections = [
  {
    title: "Getting Started",
    items: [
      {
        icon: "Book",
        title: "User Guide",
        description: "Complete guide to get started",
        action: "guide",
        badge: "Popular",
        url: "/help/user-guide"
      },
      {
        icon: "Video",
        title: "Video Tutorials",
        description: "Step-by-step video guides",
        action: "videos",
        url: "/help/tutorials"
      },
      {
        icon: "Lightbulb",
        title: "Quick Tips",
        description: "Pro tips and shortcuts",
        action: "tips",
        url: "/help/tips"
      }
    ]
  },
  {
    title: "Support",
    items: [
      {
        icon: "MessageCircle",
        title: "Live Chat",
        description: "Chat with our support team",
        action: "chat",
        status: "Online",
        url: "/support/chat"
      },
      {
        icon: "Mail",
        title: "Email Support",
        description: "Send us your questions",
        action: "email",
        url: "mailto:support@yourcompany.com"
      },
      {
        icon: "Phone",
        title: "Phone Support",
        description: "Call our support line",
        action: "phone",
        url: "tel:+1-800-123-4567"
      }
    ]
  },
  {
    title: "Resources",
    items: [
      {
        icon: "FileText",
        title: "Knowledge Base",
        description: "Search our help articles",
        action: "kb",
        url: "/help/knowledge-base"
      },
      {
        icon: "Users",
        title: "Community Forum",
        description: "Connect with other users",
        action: "forum",
        url: "/community"
      },
      {
        icon: "ExternalLink",
        title: "API Documentation",
        description: "Developer resources",
        action: "api",
        url: "/developers/api"
      }
    ]
  }
];

const quickActions = [
  "How to create an item?",
  "Setting up inventory tracking",
  "Managing sales orders",
  "Generating reports"
];

// Get help center content
export const getHelpContent = async (req: AuthenticatedRequest, res: Response) => {
  try {
    res.json({
      helpSections,
      quickActions,
      supportStatus: {
        online: true,
        availability: "24/7",
        averageResponseTime: "5 minutes"
      }
    });
  } catch (error) {
    console.error('Get help content error:', error);
    res.status(500).json({ error: 'Failed to fetch help content' });
  }
};

// Search help articles
export const searchHelpArticles = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { q } = req.query;
    const query = (q as string || '').toLowerCase();
    
    if (!query || query.length < 2) {
      return res.json({ results: [] });
    }
    
    // In a real app, this would search a database of help articles
    // For demonstration, we'll return mock results
    const articles = [
      {
        id: '1',
        title: 'How to create an item',
        category: 'Inventory Management',
        preview: 'Learn how to add new items to your inventory...',
        url: '/help/articles/create-item'
      },
      {
        id: '2',
        title: 'Setting up inventory tracking',
        category: 'Getting Started',
        preview: 'Configure your inventory tracking settings to...',
        url: '/help/articles/inventory-tracking'
      },
      {
        id: '3',
        title: 'Managing sales orders',
        category: 'Sales',
        preview: 'Create and manage sales orders efficiently...',
        url: '/help/articles/sales-orders'
      },
      {
        id: '4',
        title: 'Generating reports',
        category: 'Reporting',
        preview: 'Learn how to create customized reports...',
        url: '/help/articles/reports'
      }
    ];
    
    const results = articles.filter(article => 
      article.title.toLowerCase().includes(query) || 
      article.preview.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query)
    );
    
    res.json({ results });
  } catch (error) {
    console.error('Search help articles error:', error);
    res.status(500).json({ error: 'Failed to search help articles' });
  }
};