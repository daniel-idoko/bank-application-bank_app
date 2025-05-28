import dynamic from 'next/dynamic';

const DashBoard = dynamic(() => import('./components/DashBoard'), { ssr: false });

export default function Page() {
  return <DashBoard />;
}