import { Button, Input, Space } from "antd"
import TextArea from "antd/es/input/TextArea";
import { Link, useParams } from "react-router-dom"
import { useFrappeGetDoc, useFrappeUpdateDoc } from "frappe-react-sdk"
import { ArrowLeftOutlined } from "@ant-design/icons"

const BlogEdit = () => {
  const { id } = useParams();
  const { TextArea } = Input;

  const { data } = useFrappeGetDoc('Honda Blogs', id, {
    filter: ['name', 'title', 'content']
  })

  const { updateDoc } = useFrappeUpdateDoc();

  const savePost = (data) => {
    updateDoc('Honda Blogs', data)
    .then(() => {
      console.log("DONE")
    }).catch(() => {
      console.log("ERROR")
    })
  }
  return (
    <>
      {data && (
        <div className="p-16">
          <div>
            <div className="float-left flex items-center gap-x-[8px] text-lg">
              <Link to="/blog-admin" className="flex">
                <ArrowLeftOutlined />
              </Link>
              <h1>Edit post: {data.title}</h1>
            </div>
            <div className="float-right">
              <Space>
                <Button onClick={savePost}>Save</Button>
                <Button type="primary" danger>Delete</Button>
              </Space>
            </div>
          </div>
          <div>
            <Input type="text" defaultValue={data.title} bordered={false} style={{fontSize:"30px"}}/>
            <TextArea style={{resize:'none'}} defaultValue={data.content} autoSize bordered={false}/>
          </div>
        </div>
      )}
    </>
  )
}

export default BlogEdit