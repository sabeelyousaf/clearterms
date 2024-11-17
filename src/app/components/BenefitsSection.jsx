"use client";
import { CheckIcon, LightningBoltIcon, StarIcon, ShieldCheckIcon, DeviceMobileIcon } from '@heroicons/react/outline';
import { Benefit } from './Benefit';
import { motion } from 'framer-motion';

const BenefitsSection = () => (
    <motion.section
        id="benefits"
        className="bg-gray-50 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
    >
        <div className="max-w-screen-xl mx-auto text-center md:px-0 px-3">
            <h2 className="text-4xl font-bold mb-12">Key Benefits</h2>
            <div className="flex md:flex-row flex-col items-center justify-center gap-10 ">
                <Benefit 
                    icon={ShieldCheckIcon} 
                    text="Data Privacy" 
                    description="Your documents stay private and secure with no data stored." 
                />
                <Benefit 
                    icon={LightningBoltIcon} 
                    text="Instant Processing" 
                    description="Summarize and simplify complex documents with just one click." 
                />
                <Benefit 
                    icon={DeviceMobileIcon} 
                    text="No Upload Required" 
                    description="Access your documents anytime without needing uploads." 
                />
                <Benefit 
                    icon={StarIcon} 
                    text="User-Friendly Design" 
                    description="Navigate with ease and get results quickly with intuitive design." 
                />
            </div>
        </div>
    </motion.section>
);

export default BenefitsSection;
