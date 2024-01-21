import Image from "next/image";

const NotFound = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/assets/images/404.png"
            alt="404"
            width={400}
            height={400}
          />
          <h1 className="text-2xl font-bold text-neutral-100">
            Oops! Page not found
          </h1>
          <p className="text-neutral-200">
            We can&apos;t seem to find the page you&apos;re looking for.
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
