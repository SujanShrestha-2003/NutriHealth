import image from '../assets/image.png';
import { Link as ScrollLink } from 'react-scroll'; 
import { Link } from 'react-router-dom';
import './Header.module.css';
import { AnimatedBackground } from 'animated-backgrounds';

function Header() {

    return (
        <div className='w-full h-[700px] flex justify-center relative'>
            <AnimatedBackground animationName="gradientWave" />
            <div className='w-[90%] h-full'>
                <nav className='w-full h-[20%] flex items-center'>
                    <span className='text-4xl text-white'>Nutri Health</span>
                    <ul className='flex ml-auto gap-x-20 text-white'>
                        <li>
                            <ScrollLink 
                                to="how-it-works" 
                                smooth={true} 
                                duration={500} 
                                offset={-80}
                                className='text-lg hover:text-blue-400 cursor-pointer transition duration-300 ease-in-out'>
                                How it works?
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink 
                                to="testimonials" 
                                smooth={true} 
                                duration={1000} 
                                offset={-80}
                                className='text-lg hover:text-blue-400 cursor-pointer transition duration-300 ease-in-out'>
                                Testimonials
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink 
                                to="get-started" 
                                smooth={true} 
                                duration={500} 
                                offset={-80}
                                className='text-lg hover:text-blue-400 cursor-pointer transition duration-300 ease-in-out'>
                                Get Started
                            </ScrollLink>
                        </li>
                    </ul>
                </nav>
                <div className='w-full h-[80%]flex'>
                    <div className='h-full w-3/5'>
                        <h1 className='text-6xl mt-36 leading-snug font-medium text-white'>
                            Personalized Supplements <br /> for a Healthier You
                        </h1>
                        <p className='text-2xl mt-2.5 text-gray-200'>
                            Our AI recommends supplements based <br /> on your preferences, health goals, and symptoms.
                        </p>
                        <Link to='/register'>
                        <button className='mt-12 text-white w-44 h-14 border rounded-xl hover:text-blue-400 cursor-pointer hover:bg-white font-medium transition duration-300 ease-in-out'>
                            Get Started
                        </button>
                        </Link>
                    </div>  
                </div>
            </div>  
            <img src={image} alt="Supplement illustration" className='w-[610px] h-[557px] absolute bottom-0 right-0'/>
        </div>
    );
}

export default Header;
