import Image from "next/image";
import Link from "next/link";

const HeaderOnAuth = () => {
  return (
    <div className="relative">
      <header className="flex w-full border-b border-gray-200 bg-white py-3 text-sm   sm:justify-start sm:py-0">
        <nav
          className="relative mx-auto w-full max-w-7xl px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex items-center justify-between">
            <Link href="/" aria-label="Brand">
              <Image
                src="/cat-banner.png"
                alt="バナー"
                width={240}
                height={80}
              />
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default HeaderOnAuth;
