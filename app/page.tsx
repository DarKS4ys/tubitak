import { BubbleText } from '@/components/BubbleText';
import Typewriter from '@/components/Typewriter';
import Image from 'next/image';
import BGImage from '@/public/background.jpg';
import TubitakLogo from '@/public/TÜBİTAK_logo.svg'
import Avatar from '@/components/Avatar';
import Link from 'next/link';

export default async function Home() {

  return (
    <div id="home" className="w-full p-3 h-screen overflow-hidden">
      <div className="bg-main/40 relative backdrop-blur-xl text-primary-foreground flex gap-4 justify-center items-center rounded-[2rem] w-full h-full">
        <div className="w-full hidden lg:flex flex-col items-start justify-start p-12 mt-20 xl:mt-8">
          <div className="flex awesome text-start items-start justify-start">
            <BubbleText className="italic text-[clamp(72px,17.5vw,120px)] md:text-[7rem] lg:text-[6.6rem] xl:text-[7.5rem]  2xl:text-[10rem] leading-[1] uppercase font-black font-mono">
              Y
            </BubbleText>
            <BubbleText className="whitespace-nowrap text-[clamp(72px,17.5vw,120px)] md:text-[7rem] lg:text-[6.6rem] xl:text-[7.5rem] 2xl:text-[10rem] leading-[1] uppercase font-black font-mono">
              apay Zeka
            </BubbleText>
          </div>
          <h1 className="text-[clamp(40px,10vw,65px)] md:text-[4.5rem] 2xl:text-[6.5rem] leading-[1] uppercase font-mono">
            Destekli <span className='text-[clamp(48px,11.5vw,80px)] md:text-[5.5rem] 2xl:text-[7.5rem] font-black'>Sanal Rehber</span> Uygulaması
          </h1>

          <Link className='p-4 mt-4 rounded-xl hover:bg-main/40 duration-150 shadow-xl hover:shadow-black/35 active:scale-95 transition ring-1 ring-white hover:ring hover:ring-offset-1 bg-main/70 backdrop-blur-lg' target='_blank' href='https://tr-rehber.vercel.app'>
            <Typewriter/>
          </Link>
         </div>
        <div className="w-full md:w-[65%] 2xl:w-[45%] overflow-hidden rounded-br-[2rem] h-full flex items-end relative justify-end">
          <div
            className="absolute right-0 top-0 w-full h-full drop-shadow-lg shadow-black"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 50%)',
            }}
          >
            <Avatar/>
          </div>
        </div>

        <div className='absolute top-10 left-10'>
          <Image alt='Tübitak logo' src={TubitakLogo} className='drop-shadow-xl'></Image>
        </div>
      </div>
      <div className="inset-0 w-full p-3 absolute -z-10 ">
        <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
          <div className="bg-violet-300 z-10 rounded-full w-96 blur-[60px] h-96 animate-blob absolute left-[40%]" />
          <div className="bg-violet-500 z-10 rounded-full w-96 blur-[50px] h-96 animate-blob2 absolute left-0 top-[1%]" />
          <div className="bg-violet-100 z-10 rounded-full w-96 blur-[55px] h-96 animate-blob-reverse absolute left-[1%] bottom-[15%]" />
          <div className="bg-violet-200 z-10 rounded-full w-96 blur-[60px] h-96 animate-blob absolute left-[40%]" />
          <div className="bg-violet-900 z-10 rounded-full w-96 blur-[100px] h-96 animate-blob2 absolute right-[15%] bottom-[50%]" />
          <div className="bg-blue-400 z-10 rounded-full w-96 blur-[70px] h-96 animate-blob-reverse absolute left-[50%] top-[50%]" />
          <div className="bg-emerald-400/70 z-10 rounded-full w-96 blur-[40px] h-96 animate-blob2 absolute top-0 left-[10%]" />
          <div className="bg-violet-400 z-10 rounded-full w-96 blur-[70px] h-96 animate-blob-reverse absolute right-[40%] bottom-20" />
          <div className="bg-blue-900 z-10 rounded-full w-64 blur-[80px] h-64 animate-blob2 absolute left-[10%] bottom-[5%]" />
          <div className="bg-violet-800 z-10 rounded-full w-96 blur-[70px] h-96 animate-blob-reverse absolute left-[70%] bottom-20" />
          <Image
            priority
            fill
            src={BGImage}
            className="object-cover"
            placeholder="blur"
            alt="Website background"
          />
        </div>
      </div>
    </div>
  );
}
