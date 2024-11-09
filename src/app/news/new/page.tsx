'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useFormik } from 'formik';

import { Button } from '@/shared/ui/atoms/button';
import { Layout } from '@/widgets/layout/ui';

import styles from './page.module.scss';

export default function NewsNewPage() {
  const formik = useFormik({
    initialValues: { title: '', content: '' },
    onSubmit: (values) => console.log(values),
  });

  const editor = useEditor({
    immediatelyRender: false,

    extensions: [StarterKit],
  });

  return (
    <Layout>
      <form className={styles.form}>
        <input
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
        />

        <EditorContent editor={editor} className={styles.editor} />

        <Button type="submit" onClick={() => {}}>
          Зберегти
        </Button>
      </form>
    </Layout>
  );
}
