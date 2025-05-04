import Image from 'next/image';
import Link from 'next/link';
import { Banner as BannerType } from '../share/types';

interface BannerProps {
  banner: BannerType;
}

const Banner: React.FC<BannerProps> = ({ banner }) => {
  return (
    <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-lg">
      <div className="relative w-full h-full">
        <Image
          src={banner.image}
          alt={banner.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
          <h2 className="text-2xl md:text-4xl font-bold text-black mb-2">{banner.title}</h2>
          <p className="text-sm md:text-base text-black mb-2">{banner.subtitle}</p>
          <h3 className="text-xl md:text-3xl font-semibold text-black mb-4">{banner.description}</h3>
          <Link 
            href={banner.buttonLink} 
            className="bg-white text-gray-800 px-6 py-2 rounded uppercase text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            {banner.buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
