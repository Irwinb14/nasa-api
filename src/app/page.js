import Image from 'next/image';
import styles from './page.module.css';
import APODViewer from '../../components/APOD';
import { News_Cycle } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

const newsCycle = News_Cycle({ weight: '400', subsets: ['latin'] });

export default function Home() {
  return (
    <div className={newsCycle.className}>
      <div className='HomeCard'>
        <APODViewer />
        <Analytics />
      </div>
    </div>
  );
}
