import { getPayload } from 'payload';

import payloadConfig from '@/payload.config';
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/shared/ui/moleculas/accordion/ui';
import { Layout } from '@/widgets/layout/ui';

export default async function Faq() {
  const payload = await getPayload({
    config: payloadConfig,
  });

  const { docs } = await payload.find({
    collection: 'faq',
    sort: 'createdAt',
    limit: 99999,
  });

  return (
    <Layout>
      <h1 className="text-2xl mb-4 mx-auto">FAQ</h1>
      <div className="w-2/3 max-md:w-full mx-auto">
        <Accordion type="multiple">
          {docs.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="bg-black px-4"
            >
              <AccordionTrigger className="hover:no-underline hover:text-red-700">
                {item.titleRU}
              </AccordionTrigger>
              <AccordionContent>{item.descriptionRU}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Layout>
  );
}
