export type ListItemType = {
  content: string;
  textStyle: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
  };
  align: "left" | "center" | "right" | "";
};
export type BlockType = {
  id: string;
  type: "heading" | "paragraph" | "image" | "list";
  content?: string;
  level?: 1 | 2 | 3;
  url?: string;
  alt?: string;
  images?: Array<{
    id: string;
    url: string;
    alt?: string;
  }>;
  listItems?: ListItemType[];
  align?: "left" | "center" | "right";
  textStyle?: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
  };
  imageSize?: "small" | "medium" | "large" | "full";
  listStyle?: {
    type: "numbered" | "bulleted";
    icon?: "disc" | "circle" | "none" | "dash" | "tick";
  };

  imageObjectPosition?: { x?: number; y?: number };
  margin?: {
    top?: number;
    bottom?: number;
  };
  listItemIndex?: number;
  formattedSpans?: Array<{
    start: number;
    end: number;
    textStyle: {
      bold: boolean;
      italic: boolean;
      underline: boolean;
    };
  }>;
};
