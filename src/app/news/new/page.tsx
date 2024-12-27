'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useFormik } from 'formik';
import { Bold, Italic, Underline } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { afeApi } from '@/shared/sdk';
import { Button } from '@/shared/ui/atoms/button';
import { Input } from '@/shared/ui/atoms/input/ui';
import { Layout } from '@/widgets/layout/ui';

import styles from './page.module.scss';
import { styled } from '@/shared/utils/react';

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
        class: styles.editor,
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

  const ActionWrapper = styled('div', 'bg-slate-500 rounded-s');

  return (
    <Layout>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          formik.submitForm();
        }}
      >
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

            <div className="bg-slate-500">
              <Underline className="h-4 w-4 cursor-pointer" />
            </div>
          </div>
          <EditorContent
            className={styles.editor}
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
        <div className='flex align-middle w-full'>
          <Button
            className="max-w-fit align-middle"
            type="submit"
            variant="default"
            onClick={() => {}}
          >
            Добавить
          </Button>
        </div>
      </form>
    </Layout>
  );
}
