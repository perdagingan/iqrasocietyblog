import WPAPI from 'wpapi';

/**
 * WordPress CMS Integration
 * 
 * This module provides integration with WordPress REST API
 * Configure your WordPress site URL in environment variables
 */

export interface WordPressPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  slug: string;
  featured_media?: number;
  author?: number;
  tags?: number[];
  categories?: number[];
}

export class WordPressClient {
  private wp: any;

  constructor(siteUrl?: string) {
    const wpUrl = siteUrl || import.meta.env.WORDPRESS_URL || 'https://example.com';
    this.wp = new WPAPI({ endpoint: `${wpUrl}/wp-json` });
  }

  /**
   * Fetch all published posts from WordPress
   */
  async getPosts(perPage: number = 10, page: number = 1): Promise<WordPressPost[]> {
    try {
      const posts = await this.wp.posts()
        .perPage(perPage)
        .page(page)
        .get();
      return posts;
    } catch (error) {
      console.error('Error fetching WordPress posts:', error);
      return [];
    }
  }

  /**
   * Fetch a single post by slug
   */
  async getPostBySlug(slug: string): Promise<WordPressPost | null> {
    try {
      const posts = await this.wp.posts().slug(slug).get();
      return posts.length > 0 ? posts[0] : null;
    } catch (error) {
      console.error(`Error fetching WordPress post ${slug}:`, error);
      return null;
    }
  }

  /**
   * Fetch posts by category
   */
  async getPostsByCategory(categoryId: number, perPage: number = 10): Promise<WordPressPost[]> {
    try {
      const posts = await this.wp.posts()
        .categories(categoryId)
        .perPage(perPage)
        .get();
      return posts;
    } catch (error) {
      console.error('Error fetching WordPress posts by category:', error);
      return [];
    }
  }

  /**
   * Search posts
   */
  async searchPosts(query: string, perPage: number = 10): Promise<WordPressPost[]> {
    try {
      const posts = await this.wp.posts()
        .search(query)
        .perPage(perPage)
        .get();
      return posts;
    } catch (error) {
      console.error('Error searching WordPress posts:', error);
      return [];
    }
  }
}

// Export a singleton instance
export const wpClient = new WordPressClient();
