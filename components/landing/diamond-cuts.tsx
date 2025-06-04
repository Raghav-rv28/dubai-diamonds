import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const diamondCuts = {
    "oval": "https://cdn.shopify.com/s/files/1/0633/2714/2125/files/oval.png?v=1749062157",
    "heart": "https://cdn.shopify.com/s/files/1/0633/2714/2125/files/heart.png?v=1749062156",
    "marquise": "https://cdn.shopify.com/s/files/1/0633/2714/2125/files/marquise.png?v=1749062156",
    "emerald": "https://cdn.shopify.com/s/files/1/0633/2714/2125/files/emerald.png?v=1749062157",
    "princess": "https://cdn.shopify.com/s/files/1/0633/2714/2125/files/Princess.png?v=1749062156",
    "Pear": "https://cdn.shopify.com/s/files/1/0633/2714/2125/files/Pear_2.png?v=1749062157",
    "Radiant": "https://cdn.shopify.com/s/files/1/0633/2714/2125/files/radiant.png?v=1749062157",
    "Cushion": "https://cdn.shopify.com/s/files/1/0633/2714/2125/files/cushion.png?v=1749062156",
}

export default async function DiamondCuts() {
    return (
        <section className="w-full px-4 py-8 lg:py-16">
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-semibold mb-8 lg:mb-12 text-center text-foreground">
                Diamond Cuts
            </h2>
           
            {/* Horizontal scroll for all screen sizes */}
                <div className="flex gap-8 pb-4 container mx-auto justify-center overflow-x-auto">
                    {Object.entries(diamondCuts).map(([key, value]) => {
                        const imageUrl = value;
                        return (
                            <Link 
                                target="_blank" 
                                href={`/collections/${key}`} 
                                key={key} 
                                className="inline-block"
                            >
                                <Card className="flex-shrink-0 min-w-[120px] lg:min-w-[140px] border-none shadow-none bg-transparent mx-2 hover:bg-accent/50 transition-colors duration-300">
                                    <CardHeader className="p-0">
                                        <CardTitle className="text-base lg:text-lg font-medium text-center capitalize leading-tight text-foreground">
                                            {key}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-col items-center p-0">
                                        <div className="mb-3 lg:mb-4">
                                            {imageUrl ? (
                                                <Image
                                                    src={imageUrl}
                                                    alt={key}
                                                    width={100}
                                                    height={100}
                                                    className="lg:w-38 lg:h-38 object-contain hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <Card className="w-25 h-25 lg:w-28 lg:h-28 flex items-center justify-center">
                                                    <CardContent className="p-0">
                                                        <span className="text-muted-foreground text-xs">No Image</span>
                                                    </CardContent>
                                                </Card>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
        </section>
    );
}