
import Image from "next/image";

const Logo = () => {
    return ( <div>


        <Image 
        src="/logo-no-background.png" 
        width={150} 
        height={150} 
        alt="logo"
        />
    
    </div> );
}
 
export default Logo;