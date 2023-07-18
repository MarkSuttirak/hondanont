import { Button, Form, Input, Space, Upload, notification, Typography } from "antd"
import TextArea from "antd/es/input/TextArea";
import { Link, useParams } from "react-router-dom"
import { useFrappeGetDoc, useFrappeUpdateDoc, useFrappeDeleteDoc } from "frappe-react-sdk"
import { ArrowLeftOutlined, UploadOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { useEffect, useState, useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';

const BlogEdit = () => {
  const [api, contextHolder] = notification.useNotification();
  const [loadings, setLoadings] = useState([]);

  const { Paragraph } = Typography;

  const editorRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
      document.getElementById("content").value = editorRef.current.getContent();
      console.log(editorRef.current.getContent());
    }
  };

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
  };

  const stopLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = false;
      return newLoadings;
    });
  };

  const openNotificationUpdateSuccess = () => {
    api.success({
      message: 'Post updated',
      description:
        'The post has been updated.',
    });
  };

  const openNotificationUpdateError = () => {
    api.error({
      message: 'There is an error',
      description:
        'Sorry, there is an error while updating the post.',
    });
  };

  const openNotificationDeleteSuccess = () => {
    api.success({
      message: 'Post deleted',
      description:
        'The post has been deleted.',
    });
  };

  const openNotificationDeleteError = () => {
    api.error({
      message: 'There is an error',
      description:
        'Sorry, there is an error while deleting the post.',
    });
  };

  const { id } = useParams();
  const { TextArea } = Input;

  const { data } = useFrappeGetDoc('Honda Blogs', id, {
    filter: ['name', 'blogimage', 'title', 'content']
  })

  const { updateDoc } = useFrappeUpdateDoc();
  const { deleteDoc } = useFrappeDeleteDoc();

  const savePost = async (info) => {
    if (editorRef.current) {
      await updateDoc('Honda Blogs', id, {
        title: info.title,
        content: editorRef.current.getContent()
      }).then(() => {
        stopLoading(0);
        openNotificationUpdateSuccess();
      }).catch(() => {
        stopLoading(0);
        openNotificationUpdateError();
      })
    }
  }

  const deletePost = async (info) => {
    await deleteDoc('Honda Blogs', id, info)
    .then(() => {
      stopLoading(0);
      openNotificationDeleteSuccess();
      location.href = "/blog-admin"
    }).catch(() => {
      stopLoading(0);
      openNotificationDeleteError();
    })
  }

  return (
    <>
      {data && (
        <div className='py-16 px-40'>
          {contextHolder}
          <Form onFinish={savePost}>
            <div className="flex justify-between">
              <div className="flex items-center gap-x-[8px] text-lg">
                <Link to="/blog-admin" className="flex">
                  <ArrowLeftOutlined />
                </Link>
                <h1 className="text-xl">Edit post: {data.title}</h1>
              </div>
              <div className="float-right">
                <Space>
                  <Link to={`/blog-view/${id}`}>
                    <Button>View</Button>
                  </Link>
                  <Button htmlType="submit" onClick={() => enterLoading(0)}>Save</Button>
                  <Button type="primary" danger onClick={deletePost}>Delete</Button>
                </Space>
              </div>
            </div>
            {data && (
              <div className="block mt-10">
                <Form.Item name="title">
                  <Input type="text" placeholder="Your title" id="title" defaultValue={data.title} bordered={false} className="p-0 text-3xl font-bold h-[60px]" autoComplete="off"/>
                </Form.Item>
                <Form.Item name="content">
                  <Editor
                    initialValue={data.content}
                    onInit={(evt, editor) => editorRef.current = editor}
                    onKeyDown={log}
                    init={{
                      height: 500,
                      menubar: false,
                      plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                      ],
                      toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                      content_style: 'body { font-family:Sukhumvit Set,Arial,sans-serif; font-size:14px }'
                    }}
                  />
                  <TextArea style={{resize:'none',display:'none'}} placeholder="Your content..." id="content" defaultValue={data.content} className="p-0 text-lg" autoSize bordered={false}/>
                </Form.Item>
              </div>
            )}
          </Form>
        </div>
      )}
    </>
  )
}

export default BlogEdit