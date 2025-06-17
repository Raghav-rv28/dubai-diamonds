// "use client"
// import { MenuItem, ShopifyMenu } from "@/lib/shopify/types"
// import { Diamond } from "lucide-react"
// import Link from "next/link"
// import { useState } from "react"

// export default function DashingMenu({menu}: {menu: ShopifyMenu}) {
//     const [open, setOpen] = useState<string | null>(null)
//     return (
//         <div className="" onMouseLeave={() => setOpen(null)}>
//             <div className="flex gap-2">
//             {menu.items.map((item) => (
//                     <Link href={item.url} key={item.id} onMouseEnter={() => {setOpen(`${item.url}-${item.title}`); console.log(item.id)}} className="flex items-center gap-2 p-4 hover:underline bg-transparent">
//                         <span>{item.title}</span>
//                     </Link>
//                 ))}
//             </div>
//             <div>
//                 {open && (
//                         <div className="min-h-[30vh] w-full flex-row flex justify-start">
//                             <div className="w-full flex items-center gap-2">
//                                 <span className="text-sm font-semibold">100% Diamond Guarantee<Diamond className="inline"/></span>
//                                 <span className="text-sm font-semibold">Best in GTA</span>
//                             </div>
//                             {
//                                 menu.items.find((item) => `${item.url}-${item.title}` === open)?.items?.map((subItem) => (
//                                     <>
//                                     <Link href={subItem.url} key={subItem.id} className="block p-2 hover:underline">
//                                         {subItem.title}
//                                     </Link>
//                                     <AnotherLayer items={subItem.items} />
//                                     </>
//                                 ))
//                             }
//                         </div>
//                     )}
//                 </div>
//         </div>
//     )
// }

// export function AnotherLayer({items}: {items: MenuItem[]}) {
//     return (
//         <div className="border-l-2 border-l-gray-200 ml-2 pl-2">
//             {items.map((item) => (
//                 <Link href={item.url} key={item.id} className="block p-2 hover:underline">
//                     {item.title}
//                 </Link>
//             ))}
//         </div>
//     )
// }
"use client"
import { MenuItem, ShopifyMenu } from "@/lib/shopify/types"
import { ChevronRight, Diamond } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function DashingMenu({menu}: {menu: ShopifyMenu}) {
    const [open, setOpen] = useState<string | null>(null)
    
    return (
        <div className="w-full">
            {/* Main Navigation */}
            <div className="flex items-center justify-center gap-1 px-6 py-4 border-b">
                {menu.items.map((item) => (
                    <div key={item.id} className="relative group">
                        <Link 
                            href={item.url}
                            onMouseEnter={() => {if(item.items.length > 0) {setOpen(`${item.url}-${item.title}`)}}}
                            className="relative flex items-center gap-2 px-6 py-3 font-medium text-foreground transition-all duration-300 ease-out hover:text-muted-foreground group"
                        >
                            <span className="relative z-10">{item.title}</span>
                            
                            {/* Animated underline */}
                            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-foreground transition-all duration-300 ease-out group-hover:w-full"></div>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Submenu Dropdown - Full Width */}
            <div 
                className={`w-full bg-background border-b transition-all duration-500 ease-out overflow-hidden ${
                    open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
                onMouseEnter={() => {}}
                onMouseLeave={() => setOpen(null)}
            >
                <div className="w-full px-6 py-8">
                    {/* Premium Badge */}
                    <div className="flex items-center justify-center gap-6 mb-8 pb-6 border-b">
                        <div className="flex items-center gap-2">
                            <Diamond className="w-4 h-4 text-foreground animate-pulse" />
                            <span className="text-sm font-semibold text-foreground">
                                100% Diamond Guarantee
                            </span>
                        </div>
                        <div className="text-sm font-semibold text-foreground">
                            Best in GTA
                        </div>
                    </div>

                    {/* Submenu Items */}
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {open && menu.items.find((item) => `${item.url}-${item.title}` === open)?.items?.map((subItem, index) => (
                                <div 
                                    key={subItem.id}
                                    className="group animate-fadeInUp"
                                    style={{animationDelay: `${index * 100}ms`}}
                                >
                                    <Link 
                                        href={subItem.url}
                                        className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted transition-all duration-300 group"
                                    >
                                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                                        <span className="font-medium text-foreground transition-colors duration-300">
                                            {subItem.title}
                                        </span>
                                    </Link>
                                    
                                    {/* Third Level Items */}
                                    {subItem.items && subItem.items.length > 0 && (
                                        <AnotherLayer items={subItem.items} delay={index * 100 + 200} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function AnotherLayer({items, delay = 0}: {items: MenuItem[], delay?: number}) {
    return (
        <div className="mt-3 ml-4 space-y-2 animate-fadeInUp" style={{animationDelay: `${delay}ms`}}>
            {items.map((item, index) => (
                <Link 
                    href={item.url} 
                    key={item.id}
                    className="flex items-center gap-2 p-3 pl-6 rounded-md hover:bg-muted transition-all duration-300 border-l-2 border-border hover:border-foreground group animate-slideInLeft"
                    style={{animationDelay: `${delay + (index * 50)}ms`}}
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground group-hover:bg-foreground transition-colors duration-300"></div>
                    <span className="text-sm text-foreground transition-colors duration-300">
                        {item.title}
                    </span>
                </Link>
            ))}
        </div>
    )
}

// Add these custom animations to your global CSS or Tailwind config
const styles = `
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0;
}

.animate-slideInLeft {
    animation: slideInLeft 0.4s ease-out forwards;
    opacity: 0;
}
`