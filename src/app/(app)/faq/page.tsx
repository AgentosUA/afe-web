import { getPayload } from 'payload';

import payloadConfig from '@/payload.config';
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/shared/ui/moleculas/accordion/ui';
import { Main } from '@/widgets/layout/main/ui';

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
    <Main>
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
                {item.title}
              </AccordionTrigger>
              <AccordionContent>{item.description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Main>
  );
}
