import { Form } from "antd";
import { Input, Button, Stack, HStack, Select, useToast, chakra, FormControl, FormLabel, Textarea } from '@chakra-ui/react'
import { Link, useParams } from "react-router-dom"
import { useFrappeGetDocList, useFrappeUpdateDoc, useFrappeDeleteDoc, useFrappeCreateDoc } from "frappe-react-sdk"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { useState, useRef, useEffect } from "react";
import SidebarAdmin from "../../components/sidebar-admin";
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import InlineCode from '@editorjs/inline-code'
import { useForm } from "react-hook-form";

const BlogAdd = () => {
  const [saving, setSaving] = useState(false);
  const [loadings, setLoadings] = useState([]);

  const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm()

  const { data: dataCates, isValidating } = useFrappeGetDocList('Honda Blog Category', {
    fields: ['name', 'category']
  })

  const enterLoading = (index) => {
    setSaving(true);
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
  };

  const stopLoading = (index) => {
    setSaving(false);
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = false;
      return newLoadings;
    });
  };

  const { createDoc } = useFrappeCreateDoc();
  const toast = useToast()

  const addPost = async (info) => {
    await createDoc('Honda Blogs', info)
    .then(() => {
      toast({
        title: 'Blog created',
        description: "The blog has been created.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }).catch(() => {
      toast({
        title: 'There is an error',
        description: "Sorry, it seems that there is an error while creating the blog.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    })
  }

  let editor = { isReady: false };

  useEffect(() => {
    if (!editor.isReady){
      editor = new EditorJS({ 
        holder: 'editorjs',
        placeholder: 'Your content...',
        tools: {
          header: Header,
          list: List,
          inlineCode: InlineCode
        }
      })
    }
  }, [])

  const save = () => {
    editor
      .save()
      .then(outputData => {
        console.log('Article data: ', outputData);
      })
      .catch(error => {
        console.log('Saving failed: ', error);
      });
  };

  return (
    <>
      <div className='py-16 px-40 container-admin'>
        <SidebarAdmin active={0}/>
        <chakra.form onSubmit={handleSubmit(addPost)}>
          <div className="flex justify-between">
            <div className="flex items-center gap-x-[8px] text-2xl">
              <Link to="/blog-admin" className="flex">
                <ArrowLeftOutlined />
              </Link>
              <h1 className="text-4xl font-bold">Add post</h1>
            </div>
            <div className="float-right">
              <Stack>
                <HStack>
                  <Button type="submit">Save</Button>
                </HStack>
              </Stack>
            </div>
          </div>
          <div className="block mt-10">
            <FormControl name="title">
              <Input type="text" placeholder="Your title" fontSize="40px" border={0} className="p-0 text-3xl font-bold h-[60px]" autoComplete="off" {...register('title')}/>
            </FormControl>
            <FormControl name="content">
              <div id="editorjs"></div>
              {/* <Textarea style={{resize:'none'}} placeholder="Your content..." id="content" className="p-0 text-lg" {...register('content')}/> */}
            </FormControl>
            {dataCates && (
              <FormControl name="category">
                <FormLabel>Blog category:</FormLabel>
                <Select {...register('category')}>
                  <option value="Uncategorised">Uncategorised</option>
                {dataCates.map((d) => 
                  <option value={d.category}>{d.category}</option>
                )}
                </Select>
              </FormControl>
            )}
          </div>
        </chakra.form>
      </div>
    </>
  )
}

export default BlogAdd