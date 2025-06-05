
import Blogs from "@/components/landing/blogs";

export default async function BlogsPage() {
    return (
        <div>
            <Blogs first={15}/>
        </div>
    );
}