
import Blogs from "@/components/landing/blogs";
import Footer from "@/components/layout/footer-two";

export default async function BlogsPage() {
    return (
        <div>
            <Blogs first={15}/>
            <Footer/>
        </div>
    );
}