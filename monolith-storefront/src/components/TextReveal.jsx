import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * TextReveal component.
 * Splits text into words or characters, animating them on view using framer-motion.
 */
export default function TextReveal({ children, as: Tag = 'h2', className, splitBy = 'words' }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  if (typeof children !== 'string') {
    return <Tag className={className}>{children}</Tag>;
  }

  // If splitBy is characters, preserve spaces properly.
  const items = splitBy === 'characters' 
    ? children.split('') 
    : children.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: splitBy === 'characters' ? 0.02 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <Tag ref={containerRef} className={className}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="inline-block"
      >
        {items.map((item, index) => (
          <span key={index} className="inline-block overflow-hidden">
            <motion.span
              variants={itemVariants}
              className="inline-block"
            >
              {item === ' ' ? '\u00A0' : item}
            </motion.span>
            {splitBy === 'words' && index < items.length - 1 && '\u00A0'}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
