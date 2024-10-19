import {
  createContext,
  FC,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import classNames from 'classnames';

import styles from './ui.module.scss';

type AccordionItemProps = PropsWithChildren<{
  title: ReactNode;
  className?: string;
}>;

const AccordionContext = createContext({
  activeId: '',
  setActiveId: (_: string) => {},
});

const AccordionItem: FC<AccordionItemProps> = ({ title, children }) => {
  const [id] = useState(Math.random().toString(36).substr(2, 9));
  const [isOpen, setIsOpen] = useState(false);
  const { activeId, setActiveId } = useContext(AccordionContext);

  const ref = useRef<HTMLDivElement>(null);

  const onItemClick = () => {
    if (isOpen) {
      setActiveId('');
      setIsOpen(false);

      return;
    }

    setActiveId(id);
    setIsOpen(true);
  };

  useEffect(() => {
    if (activeId === id) return;

    setIsOpen(false);
  }, [activeId]);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.style.maxHeight = isOpen
      ? `${ref.current.scrollHeight + 45}px`
      : '0';
  }, [isOpen]);

  return (
    <div className={styles.itemWrapper}>
      <button className={styles.button} onClick={onItemClick}>
        {title}
      </button>
      <div
        ref={ref}
        className={classNames(styles.content, {
          [styles.contentActive]: isOpen,
        })}
      >
        {children}
      </div>
    </div>
  );
};

type AccordionProps = PropsWithChildren<{
  className?: string;
}>;

const AccordionWrapper: FC<AccordionProps> = ({ className, children }) => {
  const [activeId, setId] = useState('');

  const setActiveId = (id: string) => {
    setId(id);
  };

  return (
    <AccordionContext.Provider value={{ activeId, setActiveId }}>
      <div className={classNames(styles.wrapper, className)}>{children}</div>
    </AccordionContext.Provider>
  );
};

const Accordion = Object.assign(AccordionWrapper, { Item: AccordionItem });

export { Accordion };
