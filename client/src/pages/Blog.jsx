import BlogCard from "../components/BlogCard"

import image from "../assets/book4.jpeg"
//import image2 from "../assets/7451.jpg"
const allBlog = [
  { id: 1, title: "And to uses adieu pollution een and pile by known.", desc: "Da acxetis mia duonhore ne kaj metis sovagxaj. El la vi kelke atingis paroli vin la pro sentis, knabo kiu cxu duonhore nun havante terbordon li lin plencxase. Iri boaton sed mi estis sian. Portis suda elspezus kiel la, pafadon.", Writer: "John Doe" },
  { id: 1, title: "And to uses adieu pollution een and pile by known.", desc: "Da acxetis mia duonhore ne kaj metis sovagxaj. El la vi kelke atingis paroli vin la pro sentis, knabo kiu cxu duonhore nun havante terbordon li lin plencxase. Iri boaton sed mi estis sian. Portis suda elspezus kiel la, pafadon.", Writer: "John Doe" },
  { id: 1, title: "And to uses adieu pollution een and pile by known.", desc: "Da acxetis mia duonhore ne kaj metis sovagxaj. El la vi kelke atingis paroli vin la pro sentis, knabo kiu cxu duonhore nun havante terbordon li lin plencxase. Iri boaton sed mi estis sian. Portis suda elspezus kiel la, pafadon.", Writer: "John Doe" },
  { id: 1, title: "And to uses adieu pollution een and pile by known.", desc: "Da acxetis mia duonhore ne kaj metis sovagxaj. El la vi kelke atingis paroli vin la pro sentis, knabo kiu cxu duonhore nun havante terbordon li lin plencxase. Iri boaton sed mi estis sian. Portis suda elspezus kiel la, pafadon.", Writer: "John Doe" }
]

const Blog = () => {
  return (
    <div className="flex flex-wrap justify-center items-center min-h-screen">
      {allBlog.map((blog, index) => (
        <BlogCard
          key={index}
          title={blog.title}
          desc={blog.desc}
          writer={blog.Writer}
          image={image}
        />
      ))}
    </div>
  )
}

export default Blog