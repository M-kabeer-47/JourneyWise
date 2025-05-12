import type { BlockType } from "@/lib/types/Block"
import BlogClasses from "@/lib/types/BlogClassess"

import { uploadToCloudinary } from "./uploadToCloudinary"

// Add this helper function at the top of your file
function cleanContentHTML(html: string): string {
  if (!html) return '';
  
  // Remove styling breakpoint spans (zero-width spaces)
  let cleaned = html.replace(/<span class="styling-breakpoint">[\u200B]?<\/span>/g, '');
  cleaned = cleaned.replace(/<span className="styling-breakpoint">[\u200B]?<\/span>/g, '');
  
  // Remove any standalone zero-width spaces
  cleaned = cleaned.replace(/\u200B/g, '');
  
  // Remove unnecessary newlines
  cleaned = cleaned.replace(/\n/g, ' ');
  
  // Clean up multiple spaces
  cleaned = cleaned.replace(/\s{2,}/g, ' ');
  
  return cleaned;
}

export default async function SaveBlog(blocks: BlockType[]): Promise<{ content: string; title: { content: string; align: string; }; blocks: BlockType[] }> {
  // Create HTML string from blocks
  let htmlOutput = "";
  let title = {
    content: "",
    align: "left",
  }
  

  // Wait for all block promises to resolve, then join them
  const blogHTMLArray = await Promise.all(
    blocks.map(async (block,index) => {
      let blockHTML = "";

      if(index === 0){
        title.content = block.content ?? "";
        title.align = block.align ?? "left";
        
      }
      
      // Clean block content first
      if (block.content) {
        block.content = cleanContentHTML(block.content);
      }
      
      // Clean list item content if present
      if (block.listItems && block.listItems.length > 0) {
        block.listItems = block.listItems.map(item => ({
          ...item,
          content: cleanContentHTML(item.content)
        }));
      }
      
      switch (block.type) {

        case "heading": {
          
          const headingLevel = block.level || 1;
          const headingTag = `h${headingLevel}`;
          const headingClass = BlogClasses.heading[`h${headingLevel}`];
          const alignClass = block.align ? BlogClasses.align[block.align] : BlogClasses.align.left;
          const marginClass = `${block.margin?.top ? `mt-[${block.margin.top}px]` : ""} ${block.margin?.bottom ? `mb-[${block.margin.bottom}px]` : "mb-6"}`;
          // Add text style classes
          let textStyleClass = "";
          if (block.textStyle?.bold) textStyleClass += ` font-[800]`;
          if (block.textStyle?.italic) textStyleClass += ` ${BlogClasses.textStyle.italic}`;
          if (block.textStyle?.underline) textStyleClass += ` ${BlogClasses.textStyle.underline}`;
          
          if(index !== 0){
          blockHTML = `<${headingTag} className="${headingClass} ${alignClass} ${marginClass} ${textStyleClass}">${block.content}</${headingTag}>`;
          }

          // Insert user info section after the first h1 tag
          
             
          
          break;
        }
        case "paragraph": {
          const paragraphClass = BlogClasses.paragraph;
          const alignClass = block.align ? BlogClasses.align[block.align] : BlogClasses.align.left;
          let textStyleClass = "";
          if (block.textStyle?.bold) textStyleClass += ` ${BlogClasses.textStyle.bold}`;
          if (block.textStyle?.italic) textStyleClass += ` ${BlogClasses.textStyle.italic}`;
          if (block.textStyle?.underline) textStyleClass += ` ${BlogClasses.textStyle.underline}`;
          const marginClass = `${block.margin?.top ? `mt-[${block.margin.top}px]` : ""} ${block.margin?.bottom ? `mb-[${block.margin.bottom}px]` : "mb-6"}`;
          blockHTML = `<p className="${paragraphClass} ${alignClass} ${marginClass} ${textStyleClass} ">${block.content}</p>`;
          break;
        }
        case "image": {
          const sizeClass = BlogClasses.image[block.imageSize || "medium"];
          const alignClass = block.align ? BlogClasses.imageAlign[block.align] : BlogClasses.align.center;
          let url = await uploadToCloudinary(block?.url);
          console.log("URL: ", url);
          const marginClass = `${block.margin?.top ? `mt-[${block.margin.top}px]` : ""} ${block.margin?.bottom ? `mb-[${block.margin.bottom}px]` : "mb-6"}`;
          blockHTML += `<div className="${sizeClass} ${block.imageSize === "full" ? "" : alignClass} ${marginClass} ${block.imageSize === "full" ? "-mx-4" : ""}">`;
          if (block.url) {
            blockHTML += `<div className="rounded-md overflow-hidden${block.imageSize === "full" ? " rounded-none" : ""}">`;
            blockHTML += `<img src="${url}" alt="${block.alt || ""}" className="${block.imageSize === "full" ? `h-[220px] w-full object-cover object-[${block.imageObjectPosition?.x}%_${block.imageObjectPosition?.y}%]` : ""}" />`;
            blockHTML += `</div>`;
            if (block.content) {
              blockHTML += `<figcaption className="${BlogClasses.image.caption}">${block.content}</figcaption>`;
            }
          } else {
            blockHTML += `<div className="flex flex-col items-center justify-center border border-light-gray/30 p-8 text-center rounded-lg h-60">`;
            blockHTML += `<p className="text-sm text-charcoal">Image not available</p>`;
            blockHTML += `</div>`;
          }
          blockHTML += `</div>`;
          break;
        }
        case "list": {
          const listType = block.listStyle?.type || "bulleted";
          const listTag = listType === "numbered" ? "ol" : "ul";
          const listClass = BlogClasses.list[listType];
          const alignClass = block.align ? BlogClasses.align[block.align] : BlogClasses.align.left;
          const marginClass = `${block.margin?.top ? `mt-[${block.margin.top}px]` : ""} ${block.margin?.bottom ? `mb-[${block.margin.bottom}px]` : "mb-6"}`;
          blockHTML = `<${listTag} className="${listClass} ${alignClass} ${marginClass}">`;
          const icon = renderBullet(block);
          if (block.listItems && block.listItems.length > 0) {
            block.listItems.forEach((item) => {
              let itemStyleClass = BlogClasses.list.item;
              if (item.textStyle?.bold) itemStyleClass += ` ${BlogClasses.textStyle.bold}`;
              if (item.textStyle?.italic) itemStyleClass += ` ${BlogClasses.textStyle.italic}`;
              if (item.textStyle?.underline) itemStyleClass += ` ${BlogClasses.textStyle.underline}`;
              blockHTML += `<li className="${itemStyleClass}">${icon}<span className="whitespace-pre-wrap">${item.content}</span></li>`;
            });
          }
          blockHTML += `</${listTag}>`;
          break;
        }
        default:
          blockHTML = "";
      }
      return blockHTML;
    })
  );

  // Join the resolved HTML strings without newlines
  const blogHTML = blogHTMLArray.filter(html => html).join("");

  // Wrap everything in a container (without unnecessary newlines)
  htmlOutput = `<section>${blogHTML}</section>`;
  
  return {
    content: htmlOutput,
    title: title,
    blocks: blocks,
  };
}

function renderBullet(block: BlockType) {
  switch (block.listStyle?.icon) {
    case "none":
      return "";
    case "dash":
      return `<span className="text-charcoal min-w-[16px]">
          <Minus className="h-3 w-3" />
        </span>`;
    case "tick":
      return `<span className="text-charcoal min-w-[16px]">
          <Check className="h-3 w-3"/>
        </span>`;
    case "disc":
      return `<span className="text-charcoal min-w-[16px]">
          <Dot className="h-5 w-5" />
        </span>`;
    default:
      return null;
  }
}
