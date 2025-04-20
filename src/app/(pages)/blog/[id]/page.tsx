

import axios from "axios";

import parse from "html-react-parser"
import {Check,Dot,Minus} from "lucide-react"
import { redirect } from "next/navigation";
import  generateSkeleton  from "@/utils/functions/generateBlogSkeletons";

import ShareButton from "@/components/ui/ShareButton";

export default async function BlogPage({params}:{params: {id: string}}){
    const { id } = await params;
    
    let isFetching = true;
    let blog = { title: { content: "", align: "" }, content: "", blocks: [], createdAt: ""};


    const options = {
        replace: (domNode: any) => {
            
            if(domNode.name === "check"){
                return <Check className="h-4 w-4" />
            }
            else if(domNode.name === "dot"){
                return <Dot className="h-5 w-5" />
            }
            else if(domNode.name === "minus"){
                return <Minus className="h-4 w-4" />
            }
        }
    }

    const fetchBlog = async () => {

        blog  = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/?id=${id}`).then(res => res.data).catch(err => {
            redirect("/not-found");
        });
        isFetching = false;   
    }
    
   await fetchBlog();
    return(
            <>
            {isFetching ? (
<>
                {parse(generateSkeleton())}
                
                </> 
            ) : (
      <article className="max-w-full px-[300px] py-[50px]">
        <h1  className={`text-3xl md:text-5xl font-[800] mb-6 font-raleway text-black text-${blog?.title?.align}`}> 
          {parse(blog?.title?.content)}
        </h1>
        
      <div className="flex items-center space-x-4 mb-8 mt-4 pb-4 border-b border-gray-100">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src="https://xsgames.co/randomusers/assets/avatars/male/46.jpg" 
                      alt="Author avatar" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    Muhammad Kabeer
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                <ShareButton />
              </div>
              {parse(blog?.content,options)}
      
      <div>
        
      </div>
      
      <div>
        
      </div>
      </article>
    )}
            </>
    )
}

