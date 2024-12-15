import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import image1 from '../assets/image copy.png';
import image2 from '../assets/image copy 2.png';
import image3 from '../assets/image copy 3.png';
import image4 from '../assets/image copy 4.png';
import './HeroSection.css';

function HeroSection() {

    useEffect(() => {
        const elements = document.querySelectorAll('.fade-in');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            {
                threshold: 0.1, // Element is visible when 10% enters the viewport
            }
        );

        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    return (
        <div className='w-full h-[1550px] flex justify-center custom-gradient-for-hero-section'>
            <div className='w-[90%] h-full flex flex-col items-center'>
                <h2 id="how-it-works" className='mt-20 text-4xl font-semibold text-gray-800 fade-in'>How it works?</h2>

                <div className='w-full h-[440px] mt-16 flex space-x-20'>
                    <div className="w-[22%] h-full bg-gray-100 rounded-2xl shadow-2xl px-5 flex flex-col items-center fade-in">
                        <img src={image1} alt="Personalized Questionnaire" className='w-[200px] h-[180px]'/>
                        <h3 className='mt-4 font-semibold text-xl text-gray-800'>Personalized Questionnaire</h3>
                        <p className='mt-4 custom-text-justify text-gray-700'>
                            Begin by completing a short questionnaire that gathers your dietary habits, health objectives, and any symptoms you might have. This information will help us tailor recommendations that suit your specific needs.
                        </p>
                    </div>

                    <div className="w-[22%] h-full bg-gray-100 rounded-2xl shadow-2xl px-5 flex flex-col items-center fade-in">
                        <img src={image2} alt="AI Analysis" className='w-[220px] h-[180px]'/>
                        <h3 className='mt-4 font-semibold text-xl text-gray-800'>AI Analysis</h3>
                        <p className='mt-4 custom-text-justify text-gray-700'>
                            Our advanced AI system evaluates your input against a comprehensive database of supplements. It takes into account factors such as efficacy, safety, and how well the supplements align with your health and dietary preferences.
                        </p>
                    </div>

                    <div className="w-[22%] h-full bg-gray-100 rounded-2xl shadow-2xl px-5 flex flex-col items-center fade-in">
                        <img src={image3} alt="Supplement Recommendations" className='w-[180px] h-[170px]'/>
                        <h3 className='mt-6 font-semibold text-xl text-gray-800'>Recommendations</h3>
                        <p className='mt-6 custom-text-justify text-gray-700'>
                            After analyzing your data, the AI will provide you with a customized list of supplements. These are carefully selected to address your health concerns and help you achieve your wellness goals in the most efficient way possible.
                        </p>
                    </div>

                    <div className="w-[22%] h-full bg-gray-100 rounded-2xl shadow-2xl px-5 flex flex-col items-center fade-in">
                        <img src={image4} alt="Feedback Loop" className='w-[180px] h-[170px]'/>
                        <h3 className='mt-6 font-semibold text-xl text-gray-800'>Feedback Loop</h3>
                        <p className='mt-6 custom-text-justify text-gray-700'>
                            Share your feedback on the suggested supplements. Your insights help us refine our algorithms, enabling us to improve the accuracy and relevance of future recommendations for both you and other users.
                        </p>
                    </div>
                </div>

                <h2 id="testimonials" className='mt-20 text-4xl font-semibold text-gray-800 fade-in'>What Our Users Say</h2>

                <div className='px-5 w-full h-[430px] mt-16 bg-white rounded-2xl flex flex-col justify-center gap-y-8 shadow-2xl fade-in'>
                    <div className='w-full h-[80px] border-l-[6px] border-blue-500 px-5 flex flex-col justify-between text-xl text-gray-700'>
                        <p className='italic '>"This platform completely changed my approach to health! The recommendations are spot on!"</p>
                        <span className='mt-auto italic'>- Sujan Shrestha</span>
                    </div>
                    <div className='w-full h-[80px] border-l-[6px] border-blue-500 px-5 flex flex-col justify-between text-xl text-gray-700'>
                        <p className='italic'>"I love how easy it is to get personalized advice. I feel healthier and more energized!"</p>
                        <span className='mt-auto italic'>- Nitin Sunari Thapa</span>
                    </div>
                    <div className='w-full h-[80px] border-l-[6px] border-blue-500 px-5 flex flex-col justify-between text-xl text-gray-700'>
                        <p className='italic'>"The AI really understands my needs. I highly recommend it!"</p>
                        <span className='mt-auto italic'>- Dipen Dhakal</span>
                    </div>
                </div>

                <h2 id="get-started" className='mt-20 text-4xl font-semibold text-gray-800 fade-in'>Ready to Start Your Health Journey?</h2>

                <Link to='/register'>
                <button className='mt-12 text-white w-44 h-14 border rounded-xl hover:text-blue-400 cursor-pointer hover:bg-white font-medium text-lg transition duration-300 ease-in-out'>
                    Get Started
                </button>
                </Link>
            </div>
        </div>
    );
}

export default HeroSection;
