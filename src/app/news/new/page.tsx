'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useFormik } from 'formik';
import { Bold, Italic, Underline } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { afeApi } from '@/shared/sdk';
import { Button } from '@/shared/ui/atoms/button';
import { Input } from '@/shared/ui/atoms/input/ui';
import { styled } from '@/shared/utils/react';
import { Layout } from '@/widgets/layout/ui';

import styles from './page.module.scss';

export default function NewsNewPage() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      content: '',
      image: '',
      date: '',
    },
    validationSchema: null,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await afeApi.news.add({
          title: values.title,
          content: values.content,
          image: values.image,
          description: values.description,
        });

        router.push('/news');
      } catch (error) {
        console.log(error);
      }
    },
  });

  const editor = useEditor({
    immediatelyRender: false,

    onUpdate: ({ editor }) => {
      formik.setFieldValue('content', editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'bg-neutral-900 [&_li]:ml-6 outline-none min-h-72 h-full w-full p-4',
      },
    },

    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
    ],

    // content: formik.values.content,
  });

  const ActionWrapper = styled(
    'button',
    'bg-neutral-900 rounded p-1 hover:bg-neutral-800'
  );

  return (
    <Layout>
      <form
        className="flex flex-col gap-6 p-4 bg-black"
        onSubmit={(e) => {
          e.preventDefault();
          formik.submitForm();
        }}
      >
        <h1 className="text-2xl">Новая публикация</h1>
        <Input
          name="title"
          placeholder="Название"
          value={formik.values.title}
          onChange={formik.handleChange}
        />

        <Input
          name="description"
          placeholder="Описание"
          value={formik.values.description}
          onChange={formik.handleChange}
        />

        <div className={styles.editorWrapper}>
          <div className="flex align-middle  max-w-fit gap-3">
            <ActionWrapper>
              <Bold className="h-4 w-4 cursor-pointer" />
            </ActionWrapper>

            <ActionWrapper>
              <Italic className="h-4 w-4 cursor-pointer" />
            </ActionWrapper>

            <ActionWrapper>
              <Underline className="h-4 w-4 cursor-pointer" />
            </ActionWrapper>
          </div>
          <EditorContent
            name="content"
            editor={editor}
            value={formik.values.content}
          />
        </div>

        <div className={styles.row}>
          {/* <input ref={fileInputRef} type="file" style={{ display: 'hidden' }} /> */}
          {/* <div onClick={}></div> */}
          <Input
            name="image"
            placeholder="Изображение (URL)"
            value={formik.values.image}
            onChange={formik.handleChange}
          />
          <Input
            placeholder="Дата публикации"
            required
            name="date"
            type="date"
            value={formik.values.date}
            onChange={formik.handleChange}
          />
        </div>

        <Button
          className="flex max-w-fit justify-center mx-auto"
          type="submit"
          variant="default"
          onClick={() => {}}
        >
          Добавить
        </Button>
      </form>
    </Layout>
  );
}
