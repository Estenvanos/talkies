
const Logo = () => {
  return (
    <div className="flex flex-row justify-center text-center place-items-center -mt-14 mb-4">
      <img src="/assets/icons/waves.png" alt="logo" width={30} height={30} className="absolute top-[12%] left-[21.5%] transform scale-x-[-1]" />
      <h1 className="text-white text-pacifico text-[3rem] tracking-wide">Talkies</h1>
      <img src="/assets/icons/waves.png" alt="logo" width={30} height={30} className="absolute top-[18%] left-[34.2%] rotate-45" />
    </div>
  );
};

export default Logo;
