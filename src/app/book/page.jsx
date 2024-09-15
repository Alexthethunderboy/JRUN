"use client";

import React, { useState } from "react";
import { FaCalendar, FaClock, FaHome } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function BookCleanerPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    address: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    specialInstructions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the booking submission
    console.log("Booking submitted:", formData);
    // For now, let's just move to a confirmation step
    setStep(4);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="">
            <h2 className="text-2xl font-semibold mb-4">
              Select Date and Time
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="date" className="block mb-1">
                  Date
                </Label>
                <Input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <Label htmlFor="time" className="block mb-1">
                  Time
                </Label>
                <Input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Property Details</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="address" className="block mb-1">
                  Address
                </Label>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <Label htmlFor="propertyType" className="block mb-1">
                  Property Type
                </Label>
                <Select
                  id="propertyType"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="office">Office</SelectItem>
                  </SelectContent>
                  {/* <option value=""></option>
                  <option value="apartment">Apartment</option>
                  <option value="house"></option>
                  <option value="office">Office</option> */}
                </Select>
              </div>
              <div>
                <Label htmlFor="bedrooms" className="block mb-1">
                  Number of Bedrooms
                </Label>
                <Input
                  type="number"
                  id="bedrooms"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <Label htmlFor="bathrooms" className="block mb-1">
                  Number of Bathrooms
                </Label>
                <Input
                  type="number"
                  id="bathrooms"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Additional Information
            </h2>
            <div>
              <Label htmlFor="specialInstructions" className="block mb-1">
                Special Instructions
              </Label>
              <Textarea
                id="specialInstructions"
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows="4"
              ></Textarea>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Booking Confirmed!</h2>
            <p>
              Your cleaning has been scheduled for {formData.date} at{" "}
              {formData.time}.
            </p>
            <p className="mt-4">
              We'll send you a confirmation email with more details.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-20 bg-secondary text-white">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Book a Cleaner</h1>
        <div className="max-w-2xl mx-auto bg-black rounded-lg shadow-lg p-8">
          {step < 4 && (
            <div className="flex justify-between mb-8">
              <div
                className={`flex items-center ${
                  step >= 1 ? "text-primary" : "text-gray-400"
                }`}
              >
                <FaCalendar className="mr-2" />
                <span>Date & Time</span>
              </div>
              <div
                className={`flex items-center ${
                  step >= 2 ? "text-primary" : "text-gray-400"
                }`}
              >
                <FaHome className="mr-2" />
                <span>Property Details</span>
              </div>
              <div
                className={`flex items-center ${
                  step >= 3 ? "text-primary" : "text-gray-400"
                }`}
              >
                <FaClock className="mr-2" />
                <span>Confirmation</span>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {renderStep()}
            {step < 4 && (
              <div className="mt-8 flex justify-between">
                {step > 1 && (
                  <Button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                  >
                    Back
                  </Button>
                )}
                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="bg-primary text-white px-4 py-2 rounded"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded"
                  >
                    Confirm Booking
                  </Button>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
