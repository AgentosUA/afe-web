import { getPayload } from 'payload';

import payloadConfig from '@/payload.config';
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/shared/ui/moleculas/accordion/ui';
import { Layout } from '@/widgets/layout/ui';

import styles from './page.module.scss';

export default async function Faq() {
  const payload = await getPayload({
    config: payloadConfig,
  });

  const { docs } = await payload.find({
    collection: 'faq',
    sort: 'createdAt',
    limit: 99999
  });

  return (
    <Layout className={styles.main}>
      <h1 className="text-2xl mb-4">FAQ</h1>
      <div className="w-2/3 max-md:w-full">
        <Accordion type="multiple">
          {docs.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="bg-black px-4"
            >
              <AccordionTrigger className="hover:no-underline hover:text-red-700">
                {item.title}
              </AccordionTrigger>
              <AccordionContent>{item.description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Layout>
  );
}
