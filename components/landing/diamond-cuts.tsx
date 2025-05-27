"use server"
import { getMetaObjects } from "@/lib/shopify";
export default async function DiamondCuts() {
    const metaobjects = await getMetaObjects("diamond_cut");
    return (
        <section className="w-full px-4">
            <h2 className="text-6xl font-semibold mb-4 w-full text-center">
                Diamond Cuts
            </h2>
            {metaobjects.map((metaobject) => (
                <div key={metaobject.id}>
                    {metaobject.handle}: {metaobject.fields?.[0]?.value}
                </div>
            ))}
        </section>
    );
}