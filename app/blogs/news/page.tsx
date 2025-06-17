
import Blogs from "@/components/landing/blogs";

export const generateMetadata = async () => {
    return {
        title: "News",
        description: "News",
    };
};

export default async function BlogsPage() {
    return (
        <div>
            <Blogs first={15}/>
        </div>
    );
}