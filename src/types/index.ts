export interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  parentId?: number | null;
  subcategories?: CategoryItem[];
}

export interface PostItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string | null;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  tags?: {
    tag: {
      id: number;
      name: string;
      slug: string;
    };
  }[];
  isHero?: boolean;
  isTrending?: boolean;
  isLive?: boolean;
  publishedAt?: string | Date | null;
  author?: {
    id: number;
    name: string;
  } | null;
}

export interface AdSlotItem {
  id: number;
  slotKey: string;
  title: string;
  priceLabel?: string | null;
  buttonText?: string | null;
  imageUrl?: string | null;
  targetUrl?: string | null;
  adCode?: string | null;
  isActive: boolean;
}

export interface InTheNewsItemData {
  id: number;
  title: string;
  linkUrl: string;
  order: number;
}
