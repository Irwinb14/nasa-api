import Image from 'next/image';
import styles from './page.module.css';
import APODViewer from '../../components/APOD';

export default function Home() {
  return (
    <div className='HomeCard'>
      <APODViewer />
    </div>
  );
}
