import axios from 'axios';

/**
 * WordPress CMS Integration
 * 
 * This module provides integration with WordPress REST API using axios
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
  private baseUrl: string;
  private apiEndpoint: string;

  constructor(siteUrl?: string) {
    this.baseUrl = siteUrl || import.meta.env.WORDPRESS_URL || 'https://example.com';
    this.apiEndpoint = `${this.baseUrl}/wp-json/wp/v2`;
  }

  /**
   * Fetch all published posts from WordPress
   */
  async getPosts(perPage: number = 10, page: number = 1): Promise<WordPressPost[]> {
    try {
      const response = await axios.get(`${this.apiEndpoint}/posts`, {
        params: {
          per_page: perPage,
          page: page,
          _embed: true
        }
      });
      return response.data;
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
      const response = await axios.get(`${this.apiEndpoint}/posts`, {
        params: {
          slug: slug,
          _embed: true
        }
      });
      return response.data.length > 0 ? response.data[0] : null;
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
      const response = await axios.get(`${this.apiEndpoint}/posts`, {
        params: {
          categories: categoryId,
          per_page: perPage,
          _embed: true
        }
      });
      return response.data;
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
      const response = await axios.get(`${this.apiEndpoint}/posts`, {
        params: {
          search: query,
          per_page: perPage,
          _embed: true
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching WordPress posts:', error);
      return [];
    }
  }
}

// Export a singleton instance
export const wpClient = new WordPressClient();
