import Image from 'next/image';
import styles from './page.module.css';
import APODViewer from '../../components/APOD';
import { Cinzel } from 'next/font/google';

const cinzel = Cinzel({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className={cinzel.className}>
      <div className='HomeCard'>
        <APODViewer />
      </div>
    </div>
  );
}
