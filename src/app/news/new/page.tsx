'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useFormik } from 'formik';

import { Button } from '@/shared/ui/atoms/button';
import { Input } from '@/shared/ui/atoms/input/ui';
import { Layout } from '@/widgets/layout/ui';

import styles from './page.module.scss';
import { useRef } from 'react';

export default function NewsNewPage() {
  const formik = useFormik({
    initialValues: { title: '', description: '', content: '', date: '' },
    validationSchema: null,
    onSubmit: (values) => console.log(values),
  });

  const editor = useEditor({
    immediatelyRender: false,

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

    content: formik.values.content,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Layout>
      <form className={styles.form}>
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
            editor={editor}
            // marginHeight={30}
            className={styles.editor}
            name="content"
            value={formik.values.content}
            onChange={(content) => formik.setFieldValue('content', content)}
          />
        </div>

        <div className={styles.row}>
          <input ref={fileInputRef} type="file" style={{ display: 'hidden' }} />
          {/* <div onClick={}></div> */}
          <Input
            label="Дата публикации"
            type="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            defaultValue={new Date().toISOString()}
          />
        </div>
        <Button type="submit" onClick={() => {}}>
          Опубликовать
        </Button>
      </form>
    </Layout>
  );
}
