'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

import { afeApi } from '@/shared/sdk';
import { Button } from '@/shared/ui/atoms/button';
import { Input } from '@/shared/ui/atoms/input/ui';
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
          label="Название"
          value={formik.values.title}
          onChange={formik.handleChange}
        />

        <Input
          name="description"
          label="Описание"
          value={formik.values.description}
          onChange={formik.handleChange}
        />

        <div className={styles.editorWrapper}>
          <label className={styles.label} htmlFor="content">
            Текст
          </label>
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
            label="Изображение (URL)"
            value={formik.values.image}
            onChange={formik.handleChange}
          />
          <Input
            label="Дата публикации"
            required
            name="date"
            type="date"
            value={formik.values.date}
            onChange={formik.handleChange}
          />
        </div>
        <Button type="submit" onClick={() => {}}>
          Добавить
        </Button>
      </form>
    </Layout>
  );
}
