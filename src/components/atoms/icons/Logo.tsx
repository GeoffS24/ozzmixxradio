import Image from "next/image";

export function Logo() {
  return (
   <div className="rounded-full overflow-hidden w-12 h-auto" >
     <Image
      src={"/logo.jpg"}
      width={400}
      height={400}
      alt="logo"
      className="w-full h-full object-contain object-center"
    />
   </div>
  );
}
