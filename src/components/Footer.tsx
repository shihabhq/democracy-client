export default function Footer() {
  return (
    <footer className="relative z-10 px-4 sm:px-6 lg:px-8 border-black bg-white mt-auto my-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 py-10 sm:grid-cols-2 gap-2 items-center">
          <img
            src="https://ik.imagekit.io/bua2b1x6j/kashful/democracy.png"
            alt="Digital Democracy"
            className="w-2/3 mx-auto h-auto object-contain"
          />
          <img
            src="https://ik.imagekit.io/bua2b1x6j/kashful/partners.png?updatedAt=1770410371507"
            alt="Partners"
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="sm:mt-0 flex justify-center">
          <img
            src="https://ik.imagekit.io/bua2b1x6j/kashful/artivism.png?updatedAt=1770410372066"
            alt="Artivism"
            className=" w-2/5 sm:max-w-52 mx-auto h-auto object-contain"
          />
        </div>
      </div>
    </footer>
  );
}
