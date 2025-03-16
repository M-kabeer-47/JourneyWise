import { BlockType } from "@/lib/types/block";
import BlogClasses from "@/lib/types/BlogClassess"
export default function SaveBlog(blocks: BlockType[]): string {
    // Create HTML string from blocks
    let htmlOutput = '';
    const blogHTML = blocks.map(block => {
      let blockHTML = '';
      
      switch (block.type) {
        case 'heading': {
          const headingLevel = block.level || 1;
          const headingTag = `h${headingLevel}`;
          const headingClass = BlogClasses.heading[`h${headingLevel}`];
          const alignClass = block.align ? BlogClasses.align[block.align] : BlogClasses.align.left;
          
          // Add text style classes
          let textStyleClass = '';
          if (block.textStyle?.bold) textStyleClass += ` ${BlogClasses.textStyle.bold}`;
          if (block.textStyle?.italic) textStyleClass += ` ${BlogClasses.textStyle.italic}`;
          if (block.textStyle?.underline) textStyleClass += ` ${BlogClasses.textStyle.underline}`;
          
          blockHTML = `<${headingTag} className="${headingClass} ${alignClass}${textStyleClass}">${block.content}</${headingTag}>`;
          break;
        }
        
        case 'paragraph': {
          const paragraphClass = BlogClasses.paragraph;
          const alignClass = block.align ? BlogClasses.align[block.align] : BlogClasses.align.left;
          
          // Add text style classes
          let textStyleClass = '';
          if (block.textStyle?.bold) textStyleClass += ` ${BlogClasses.textStyle.bold}`;
          if (block.textStyle?.italic) textStyleClass += ` ${BlogClasses.textStyle.italic}`;
          if (block.textStyle?.underline) textStyleClass += ` ${BlogClasses.textStyle.underline}`;
          
          blockHTML = `<p className="${paragraphClass} ${alignClass}${textStyleClass}">${block.content}</p>`;
          break;
        }
        
        case 'image': {
          
          const sizeClass = BlogClasses.image[block.imageSize || 'medium'];
          const alignClass = block.align ? BlogClasses.imageAlign[block.align] : BlogClasses.align.center;
          
          // Start with figure container
          
          
          // Add image wrapper with size and alignment
          blockHTML += `<div className="${sizeClass} ${alignClass}">`;
          
          // Different approach if URL exists vs placeholder
          if (block.url) {
            // Add image with rounded overflow wrapper
            blockHTML += `<div className="rounded-md overflow-hidden${block.imageSize === 'full' ? ' rounded-none' : ''}">`;
            blockHTML += `<img src="${block.url}" alt="${block.alt || ''}" className="w-full object-cover" />`;
            blockHTML += `</div>`;
            
            // Add caption if exists
            if (block.content) {
              blockHTML += `<figcaption className="${BlogClasses.image.caption}">${block.content}</figcaption>`;
            }
          } else {
            // Placeholder for missing image
            blockHTML += `<div className="flex flex-col items-center justify-center border border-light-gray/30 p-8 text-center rounded-lg h-60">`;
            blockHTML += `<p className="text-sm text-charcoal">Image not available</p>`;
            blockHTML += `</div>`;
          }
          
          blockHTML += `</div>`;
          break;
        }
        
        case 'list': {
          const listType = block.listStyle?.type || 'bulleted';
          const listTag = listType === 'numbered' ? 'ol' : 'ul';
          const listClass = BlogClasses.list[listType];
          const alignClass = block.align ? BlogClasses.align[block.align] : BlogClasses.align.left;
          
          // Start list container
          blockHTML = `<${listTag} className="${listClass} ${alignClass}">`;
          
          // Add each list item
          if (block.listItems && block.listItems.length > 0) {
            block.listItems.forEach(item => {
              // Add text style classes for item
              let itemStyleClass = BlogClasses.list.item;
              if (item.textStyle?.bold) itemStyleClass += ` ${BlogClasses.textStyle.bold}`;
              if (item.textStyle?.italic) itemStyleClass += ` ${BlogClasses.textStyle.italic}`;
              if (item.textStyle?.underline) itemStyleClass += ` ${BlogClasses.textStyle.underline}`;
              
              blockHTML += `<li className="${itemStyleClass}">${item.content}</li>`;
            });
          }
          
          blockHTML += `</${listTag}>`;
          break;
        }
        
        default:
          blockHTML = '';
      }
      
      return blockHTML;
    }).join('\n');
    
    // Wrap everything in a container
    htmlOutput = `<article className="${BlogClasses.container}">\n${blogHTML}\n</article>`;
    
    console.log("Generated HTML:", htmlOutput);
    
    // You could save this to your backend or copy to clipboard
    // For now, let's save to localStorage as an example
    localStorage.setItem('savedBlogHTML', htmlOutput);
    
    // Display success message
    alert("Blog saved as HTML!");
    
    return htmlOutput;
  }