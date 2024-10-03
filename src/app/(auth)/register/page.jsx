'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function RegisterOptionPage() {
  const [selectedOption, setSelectedOption] = useState(null);
  const router = useRouter();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleCreateAccount = () => {
    if (selectedOption) {
      router.push(`/register/${selectedOption}`);
    }
  };

  return (
    <div className="container mx-auto px-4 min-h-screen flex items-center justify-center ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <Card className="bg-secondary border-0 text-card-foreground overflow-hidden">
          <CardContent className="p-8">
            <motion.div
              className="absolute top-0 left-0 w-full h-2 bg-secondary"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <h2 className="text-3xl font-bold text-center text-primary mb-8">Join JRun as a client or worker</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card 
                  className={`cursor-pointer transition-all text-white bg-secondary border-0 duration-300 ${selectedOption === 'user' ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => handleOptionSelect('user')}
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <User size={48} className="mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2">I'm a client, looking for services</h3>
                    <p className="text-center text-muted-foreground">Find workers for cleaning, laundry, car wash, and more</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 text-white bg-secondary border-0  ${selectedOption === 'worker' ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => handleOptionSelect('worker')}
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Briefcase size={48} className="mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2">I'm a worker, offering services</h3>
                    <p className="text-center text-muted-foreground">Offer your skills in cleaning, laundry, car wash, and more</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            <div className="flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full max-w-md"
              >
                <Button
                  onClick={handleCreateAccount}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={!selectedOption}
                >
                  Create Account
                </Button>
              </motion.div>
              <p className="mt-4 text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="text-primary hover:underline">
                  Log In
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}