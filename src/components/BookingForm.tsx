

"use client";

import React, { useState, useEffect, useRef } from "react";
import { serviceTypes, timeSlots, promoCodes, mainServices, vehicleTypes } from "@/Data/booking-service";
import { allCities } from "@/Data/stateMapping";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Link from "next/link";
import { toast } from "react-toastify";

// Define TypeScript interfaces
interface ServicePackage {
  id: string;
  name: string;
  price: number | string;
  description: string;
  pricingType?: string;
  includes: string[];
}

interface AdditionalService {
  id: string;
  name: string;
  price: number | string;
  description: string;
}

interface ServiceVariant {
  id: string;
  name: string;
  vehicleTypes: string[];
  packages: ServicePackage[];
  additionalServices: AdditionalService[];
}

interface ServiceType {
  id: string;
  name: string;
  vehicleTypes: string[];
  packages?: ServicePackage[];
  variants?: ServiceVariant[];
  additionalServices?: AdditionalService[];
}

interface MainService {
  id: string;
  name: string;
  description: string;
  packages: ServicePackage[];
}

// Individual Vehicle Booking Interface
interface VehicleBooking {
  id: string;
  serviceType: string;
  variant?: string;
  mainService: string;
  package: string;
  additionalServices: string[];
  vehicleType: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleColor: string;
  vehicleLength?: string;
  mobileVehicleType?: string; // For mobile detailing vehicle type selection
}

interface FormData {
  vehicleBookings: VehicleBooking[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  date: string;
  timeSlot: string;
  notes: string;
}

// Generate unique booking ID
const generateBookingId = (): string => {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `DAD-${randomNum}`; // Changed from QAC- to DAD- for Decent Auto Detailing
};

// Phone number formatting utility
const formatPhoneNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');

  let formatted = cleaned;
  if (!formatted.startsWith('1') && formatted.length > 0) {
    formatted = '1' + formatted;
  }

  if (formatted.length > 1) {
    const countryCode = formatted.substring(0, 1);
    const areaCode = formatted.substring(1, 4);
    const firstPart = formatted.substring(4, 7);
    const secondPart = formatted.substring(7, 11);

    let result = `+${countryCode}`;
    if (areaCode) result += ` (${areaCode}`;
    if (firstPart) result += `) ${firstPart}`;
    if (secondPart) result += `-${secondPart}`;

    return result;
  }

  return formatted ? `+${formatted}` : '+1';
};

const BookingForm = () => {
  const [formData, setFormData] = useState<FormData>({
    vehicleBookings: [
      {
        id: 'vehicle-1',
        serviceType: "",
        variant: "",
        mainService: "",
        package: "",
        additionalServices: [],
        vehicleType: "",
        vehicleMake: "",
        vehicleModel: "",
        vehicleYear: "",
        vehicleColor: "",
        vehicleLength: "",
      }
    ],
    firstName: "",
    lastName: "",
    email: "",
    phone: "+1 ",
    address: "",
    city: "",
    state: "",
    zip: "",
    date: "",
    timeSlot: "",
    notes: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [isManualState, setIsManualState] = useState(false);
  const [autoAppliedPromo, setAutoAppliedPromo] = useState<string | null>(null);

  // Website name - Hardcoded as requested
  const WEBSITE_NAME = "Decent Auto Detailing";

  // Helper function to filter packages based on vehicle type
  const filterPackagesByVehicleType = (packages: ServicePackage[], vehicleType: string) => {
    return packages.filter(pkg => {
      const packageId = pkg.id.toLowerCase();
      const vehicleTypeLower = vehicleType.toLowerCase();

      // Check if package id contains vehicle type keywords
      const vehicleKeywords = ['sedan', 'suv', 'truck', 'van', 'boat', 'jet-ski', 'rv', 'motorcycle'];

      for (const keyword of vehicleKeywords) {
        if (packageId.includes(keyword)) {
          return packageId.includes(vehicleTypeLower);
        }
      }

      // If no vehicle keyword found, show for all vehicle types
      return true;
    });
  };

  // Auto-detect state from city
  const autoDetectState = (city: string): string => {
    if (!city) return "";
    const normalizedCity = city.toLowerCase().trim();
    return allCities[normalizedCity] || "";
  };

  // Auto-apply promo code from sessionStorage (from discount modal)
  useEffect(() => {
    const autoApplyPromo = sessionStorage.getItem("auto_apply_promo");
    if (autoApplyPromo && !appliedPromo) {
      const foundPromo = promoCodes.find(
        (promo) => promo.code.toLowerCase() === autoApplyPromo.toLowerCase()
      );
      if (foundPromo) {
        setAppliedPromo(foundPromo);
        setPromoCode(autoApplyPromo);
        sessionStorage.removeItem("auto_apply_promo"); // Clear after applying
      }
    }
  }, []);

  // Handle phone number input with formatting
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (!value.startsWith('+1')) {
      if (value.startsWith('1')) {
        value = '+' + value;
      } else {
        value = '+1 ' + value.replace(/^\+?1?\s?/, '');
      }
    }

    const formatted = formatPhoneNumber(value);
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  // Remove whitespace from promo code and apply
  const applyPromoCode = () => {
    const cleanedPromoCode = promoCode.replace(/\s/g, '');

    if (!cleanedPromoCode.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }

    const foundPromo = promoCodes.find(
      (promo) => promo.code.toLowerCase() === cleanedPromoCode.trim().toLowerCase()
    );

    if (foundPromo) {
      setAppliedPromo(foundPromo);
      setPromoError("");
      setPromoCode(cleanedPromoCode);
    } else {
      setPromoError("Invalid promo code");
      setAppliedPromo(null);
    }
  };

  // Update promo code input with whitespace removal
  const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '');
    setPromoCode(value);
  };

  // Add new vehicle booking
  const addVehicleBooking = () => {
    const newVehicle: VehicleBooking = {
      id: `vehicle-${Date.now()}`,
      serviceType: "",
      variant: "",
      mainService: "",
      package: "",
      additionalServices: [],
      vehicleType: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: "",
      vehicleColor: "",
      vehicleLength: "",
    };
    setFormData(prev => ({
      ...prev,
      vehicleBookings: [...prev.vehicleBookings, newVehicle]
    }));
  };

  // Remove vehicle booking
  const removeVehicleBooking = (vehicleId: string) => {
    if (formData.vehicleBookings.length <= 1) {
      toast.error("At least one vehicle is required");
      return;
    }
    setFormData(prev => ({
      ...prev,
      vehicleBookings: prev.vehicleBookings.filter(v => v.id !== vehicleId)
    }));
  };

  // Update specific vehicle booking
  const updateVehicleBooking = (vehicleId: string, field: keyof VehicleBooking, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      vehicleBookings: prev.vehicleBookings.map(vehicle => 
        vehicle.id === vehicleId 
          ? { ...vehicle, [field]: value }
          : vehicle
      )
    }));
  };

  // Reset dependent fields when service type changes
  // const handleServiceTypeChange = (vehicleId: string, serviceTypeId: string) => {
  //   updateVehicleBooking(vehicleId, 'serviceType', serviceTypeId);
  //   updateVehicleBooking(vehicleId, 'variant', "");
  //   updateVehicleBooking(vehicleId, 'mainService', "");
  //   updateVehicleBooking(vehicleId, 'package', "");
  //   updateVehicleBooking(vehicleId, 'additionalServices', []);
  //   updateVehicleBooking(vehicleId, 'vehicleType', "");
  //   updateVehicleBooking(vehicleId, 'vehicleMake', "");
  //   updateVehicleBooking(vehicleId, 'vehicleModel', "");
  //   updateVehicleBooking(vehicleId, 'vehicleYear', "");
  //   updateVehicleBooking(vehicleId, 'vehicleColor', "");
  //   updateVehicleBooking(vehicleId, 'vehicleLength', "");
  // };

  // // Reset dependent fields when variant changes
  // const handleVariantChange = (vehicleId: string, variantId: string) => {
  //   updateVehicleBooking(vehicleId, 'variant', variantId);
  //   updateVehicleBooking(vehicleId, 'mainService', "");
  //   updateVehicleBooking(vehicleId, 'package', "");
  //   updateVehicleBooking(vehicleId, 'additionalServices', []);
  //   updateVehicleBooking(vehicleId, 'vehicleType', "");
  // };

  // Reset dependent fields when service type changes
const handleServiceTypeChange = (vehicleId: string, serviceTypeId: string) => {
  updateVehicleBooking(vehicleId, 'serviceType', serviceTypeId);
  updateVehicleBooking(vehicleId, 'variant', "");
  updateVehicleBooking(vehicleId, 'mainService', "");
  updateVehicleBooking(vehicleId, 'package', "");
  updateVehicleBooking(vehicleId, 'additionalServices', []);
  
  // ✅ Automatically set vehicleType based on service type
  const serviceType = serviceTypes.find(st => st.id === serviceTypeId);
  if (serviceType) {
    updateVehicleBooking(vehicleId, 'vehicleType', serviceType.name);
  } else {
    updateVehicleBooking(vehicleId, 'vehicleType', "");
  }
  
  updateVehicleBooking(vehicleId, 'vehicleMake', "");
  updateVehicleBooking(vehicleId, 'vehicleModel', "");
  updateVehicleBooking(vehicleId, 'vehicleYear', "");
  updateVehicleBooking(vehicleId, 'vehicleColor', "");
  updateVehicleBooking(vehicleId, 'vehicleLength', "");
};

// Reset dependent fields when variant changes
const handleVariantChange = (vehicleId: string, variantId: string) => {
  updateVehicleBooking(vehicleId, 'variant', variantId);
  updateVehicleBooking(vehicleId, 'mainService', "");
  updateVehicleBooking(vehicleId, 'package', "");
  updateVehicleBooking(vehicleId, 'additionalServices', []);
  
  // ✅ Automatically set vehicleType based on variant
  const vehicle = formData.vehicleBookings.find(v => v.id === vehicleId);
  if (vehicle) {
    const serviceType = serviceTypes.find(st => st.id === vehicle.serviceType);
    if (serviceType?.variants) {
      const variant = serviceType.variants.find(v => v.id === variantId);
      if (variant) {
        updateVehicleBooking(vehicleId, 'vehicleType', variant.name);
      }
    }
  }
};

  // Reset dependent fields when main service changes
  const handleMainServiceChange = (vehicleId: string, mainServiceId: string) => {
    updateVehicleBooking(vehicleId, 'mainService', mainServiceId);
    updateVehicleBooking(vehicleId, 'package', "");
    updateVehicleBooking(vehicleId, 'additionalServices', []);
  };

  // Calculate total price for all vehicles
  const calculateTotalPrice = () => {
    let total = 0;

    formData.vehicleBookings.forEach(vehicle => {
      // Find the service type
      const serviceType = serviceTypes.find(st => st.id === vehicle.serviceType);
      
      // Find main service
      const mainService = mainServices.find(ms => ms.id === vehicle.mainService);
      
      let pkg;

      if (mainService) {
        // Main Service Package
        pkg = mainService.packages.find(p => p.id === vehicle.package);
      } else if (serviceType?.variants && vehicle.variant) {
        // Variant Package
        const variant = serviceType.variants.find(v => v.id === vehicle.variant);
        pkg = variant?.packages.find(p => p.id === vehicle.package);
      } else {
        // Regular Service Package
        pkg = serviceType?.packages?.find(p => p.id === vehicle.package);
      }

      // Add package price
      if (pkg) {
        let packagePrice = typeof pkg.price === 'string' ? Number(pkg.price) || 0 : pkg.price;
        const pricingType = pkg.pricingType || "fixed";

        if (pricingType === "perFoot" && vehicle.vehicleLength) {
          packagePrice *= parseFloat(vehicle.vehicleLength);
        }
        total += packagePrice;
      }

      // Add additional services prices
      if (vehicle.additionalServices.length > 0) {
        let additionalServicesList: AdditionalService[] = [];
        
        if (serviceType?.variants && vehicle.variant) {
          const variant = serviceType.variants.find(v => v.id === vehicle.variant);
          additionalServicesList = variant?.additionalServices || [];
        } else if (serviceType?.additionalServices) {
          additionalServicesList = serviceType.additionalServices || [];
        }

        vehicle.additionalServices.forEach(addId => {
          const addService = additionalServicesList.find(a => a.id === addId);
          if (addService) {
            const price = typeof addService.price === 'string' ? Number(addService.price) || 0 : addService.price;
            total += price;
          }
        });
      }
    });

    return total;
  };

  // Calculate discount amount
  const calculateDiscount = () => {
    if (!appliedPromo) return 0;
    const totalPrice = calculateTotalPrice();
    return (totalPrice * appliedPromo.discount) / 100;
  };

  // Calculate final price after discount
  const calculateFinalPrice = () => {
    const totalPrice = calculateTotalPrice();
    const discount = calculateDiscount();
    return totalPrice - discount;
  };

  // Remove applied promo
  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoCode("");
    setPromoError("");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      handlePhoneChange(e as React.ChangeEvent<HTMLInputElement>);
    } else if (name === 'state') {
      setIsManualState(true);
      setFormData(prev => ({ ...prev, [name]: value }));
    } else if (name === 'city') {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (!value.trim() && !isManualState) {
        setFormData(prev => ({ ...prev, state: "" }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      date: date ? date.toISOString() : "",
    }));
  };

  const handleTimeSelect = (time: string) => {
    setFormData(prev => ({ ...prev, timeSlot: time }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Generate unique booking ID
    const newBookingId = generateBookingId();
    setBookingId(newBookingId);

    try {
      const totalPrice = calculateTotalPrice();
      const discountedPrice = calculateFinalPrice();

      // Prepare data according to MongoDB schema
      const bookingData = {
        bookingId: newBookingId,
        webName: WEBSITE_NAME, // Hardcoded website name
        formData: formData,
        totalPrice: totalPrice,
        discountedPrice: discountedPrice,
        discountApplied: !!appliedPromo,
        discountPercent: appliedPromo?.discount || 0,
        promoCode: appliedPromo?.code || null,
        submittedAt: new Date().toISOString(),
        vehicleCount: formData.vehicleBookings.length,
        status: "pending" // Default status as per schema
      };

      console.log("Sending booking data:", bookingData);

      const res = await fetch("https://car-detailling-dashboard.vercel.app/api/booking", { // Changed API endpoint to /api/bookings
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      console.log("Booking API response:", data);

      if (res.ok) {
        toast.success('Booking Confirmed Successfully');
        setShowConfirmation(true);
      } else {
        console.error("Booking failed:", data.error);
        toast.error(data.error || 'Booking Confirmation Error');
      }

    } catch (err) {
      console.error("Error submitting booking:", err);
      toast.error('Network error - please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
    setFormData({
      vehicleBookings: [
        {
          id: 'vehicle-1',
          serviceType: "",
          variant: "",
          mainService: "",
          package: "",
          additionalServices: [],
          vehicleType: "",
          vehicleMake: "",
          vehicleModel: "",
          vehicleYear: "",
          vehicleColor: "",
          vehicleLength: "",
        }
      ],
      firstName: "",
      lastName: "",
      email: "",
      phone: "+1 ",
      address: "",
      city: "",
      state: "",
      zip: "",
      date: "",
      timeSlot: "",
      notes: "",
    });
    setCurrentStep(1);
    setPromoCode("");
    setAppliedPromo(null);
    setPromoError("");
    setBookingId("");
    setIsManualState(false);
  };

  const getStepClass = (step: number) =>
    step <= currentStep ? "bg-sky-500" : "bg-gray-300";

  // Auto-detect state when city changes
  useEffect(() => {
    if (formData.city.trim() && !isManualState) {
      const detectedState = autoDetectState(formData.city);
      if (detectedState && detectedState !== formData.state) {
        setFormData(prev => ({ ...prev, state: detectedState }));
      }
    }
  }, [formData.city, formData.state, isManualState]);

  // Check if all vehicles have valid configurations
  const areAllVehiclesValid = formData.vehicleBookings.every(vehicle => {
    const serviceType = serviceTypes.find(st => st.id === vehicle.serviceType);
    const mainService = mainServices.find(ms => ms.id === vehicle.mainService);
    
    let pkg;
    if (mainService) {
      pkg = mainService.packages.find(p => p.id === vehicle.package);
    } else if (serviceType?.variants && vehicle.variant) {
      const variant = serviceType.variants.find(v => v.id === vehicle.variant);
      pkg = variant?.packages.find(p => p.id === vehicle.package);
    } else {
      pkg = serviceType?.packages?.find(p => p.id === vehicle.package);
    }

    const requiresLength = pkg?.pricingType === "perFoot";

    return vehicle.serviceType && 
           vehicle.mainService && 
           vehicle.package &&
           vehicle.vehicleMake &&
           vehicle.vehicleModel &&
           vehicle.vehicleYear &&
           vehicle.vehicleColor &&
           (!requiresLength || vehicle.vehicleLength);
  });

  return (
    <>
      <div className="bg-white rounded-xl shadow-xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8 px-6 pt-6">
          <div className={`flex-1 h-2 ${getStepClass(1)}`}></div>
          <div className={`flex-1 h-2 ${getStepClass(2)}`}></div>
          <div className={`flex-1 h-2 ${getStepClass(3)}`}></div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">
            Step {currentStep}:{" "}
            {currentStep === 1
              ? "Select your services"
              : currentStep === 2
                ? "Date/Time"
                : "All about you!"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* --- Step 1: Service Selection --- */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-fade-in">
              {/* Add Vehicle Button */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  Vehicle Services ({formData.vehicleBookings.length})
                </h3>
                <Button
                  type="button"
                  onClick={addVehicleBooking}
                  className="bg-sky-500 hover:bg-sky-600 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Vehicle
                </Button>
              </div>

              {/* Vehicle Booking Sections */}
              {formData.vehicleBookings.map((vehicle, index) => {
                const serviceType = serviceTypes.find(st => st.id === vehicle.serviceType);
                const mainService = mainServices.find(ms => ms.id === vehicle.mainService);
                let selectedPackage;
                let additionalServicesList: AdditionalService[] = [];

                if (mainService) {
                  selectedPackage = mainService.packages.find(p => p.id === vehicle.package);
                } else if (serviceType?.variants && vehicle.variant) {
                  const variant = serviceType.variants.find(v => v.id === vehicle.variant);
                  selectedPackage = variant?.packages.find(p => p.id === vehicle.package);
                  additionalServicesList = variant?.additionalServices || [];
                } else {
                  selectedPackage = serviceType?.packages?.find(p => p.id === vehicle.package);
                  additionalServicesList = serviceType?.additionalServices || [];
                }

                const requiresLength = selectedPackage?.pricingType === "perFoot";

                return (
                  <div key={vehicle.id} className="border rounded-lg p-6 bg-gray-50 relative">
                    {/* Remove Vehicle Button */}
                    {formData.vehicleBookings.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeVehicleBooking(vehicle.id)}
                        variant="destructive"
                        size="sm"
                        className="absolute top-4 right-4"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}

                    <h4 className="text-lg font-medium mb-4">
                      Vehicle {index + 1}
                    </h4>

                    <div className="space-y-4">
                      {/* Service Type Selection */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Service Type
                        </label>
                        <select
                          value={vehicle.serviceType}
                          onChange={(e) => handleServiceTypeChange(vehicle.id, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
                        >
                          <option value="">Select a service type</option>
                          {serviceTypes.map((service) => (
                            <option key={service.id} value={service.id}>
                              {service.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Variant Selection for Car Detailing */}
                      {serviceType?.variants && (
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Vehicle Type
                          </label>
                          <select
                            value={vehicle.variant}
                            onChange={(e) => handleVariantChange(vehicle.id, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
                          >
                            <option value="">Select vehicle type</option>
                            {serviceType.variants.map((variant) => (
                              <option key={variant.id} value={variant.id}>
                                {variant.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Main Service Selection */}
                      {(vehicle.variant || (serviceType && !serviceType.variants)) && !vehicle.mainService && (
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Premium Service Type
                          </label>
                          <select
                            value={vehicle.mainService}
                            onChange={(e) => handleMainServiceChange(vehicle.id, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
                          >
                            <option value="">Select a premium service</option>
                            {mainServices.map((service) => (
                              <option key={service.id} value={service.id}>
                                {service.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Main Service Packages */}
                      {vehicle.mainService && (
                        <div className="space-y-4">
                          <label className="block text-sm font-medium">
                            Select {mainService?.name} Package
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filterPackagesByVehicleType(mainService?.packages || [], vehicle.vehicleType).map((pkg) => {
                              const isSelected = vehicle.package === pkg.id;
                              return (
                                <div
                                  key={pkg.id}
                                  onClick={() => updateVehicleBooking(vehicle.id, 'package', pkg.id)}
                                  className={`border rounded-lg p-4 cursor-pointer transition-all ${isSelected
                                    ? "border-sky-500 bg-sky-50 shadow-md"
                                    : "border-gray-300 hover:border-sky-500 hover:shadow-sm"
                                    }`}
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <span className="font-medium text-gray-900">{pkg.name}</span>
                                    <span className="font-bold text-sky-600">
                                      ${pkg.price}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-600">{pkg.description}</p>
                                  {pkg.includes && (
                                    <div className="mt-2 text-xs text-gray-500">
                                      <span className="font-medium">Includes:</span>
                                      <ul className="list-disc list-inside mt-1">
                                        {pkg.includes.map((item, index) => (
                                          <li key={index}>{item}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  {isSelected && (
                                    <div className="mt-2 text-sky-600 flex items-center text-sm">
                                      ✓ Selected
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* Additional Services */}
                          {additionalServicesList.length > 0 && (
                            <div className="space-y-4 pt-6 border-t">
                              <label className="block text-lg font-medium">
                                Add-on Services
                              </label>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {additionalServicesList.map((svc) => (
                                  <div key={svc.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                                    <input
                                      type="checkbox"
                                      id={`${vehicle.id}-${svc.id}`}
                                      checked={vehicle.additionalServices.includes(svc.id)}
                                      onChange={() => {
                                        const newAdditionalServices = vehicle.additionalServices.includes(svc.id)
                                          ? vehicle.additionalServices.filter(id => id !== svc.id)
                                          : [...vehicle.additionalServices, svc.id];
                                        updateVehicleBooking(vehicle.id, 'additionalServices', newAdditionalServices);
                                      }}
                                      className="mt-1 h-5 w-5 accent-sky-500"
                                    />
                                    <div className="flex-1">
                                      <label htmlFor={`${vehicle.id}-${svc.id}`} className="text-sm font-medium text-gray-900 cursor-pointer">
                                        {svc.name}
                                      </label>
                                      <p className="text-sm text-gray-600">{svc.description}</p>
                                      <p className="text-sm font-semibold text-sky-600 mt-1">${svc.price}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Vehicle Details */}
                          {vehicle.package && (
                            <>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t">
                                {/* Vehicle Type Input */}
                                <div>
                                  <label htmlFor={`${vehicle.id}-vehicleType`} className="block text-gray-700 mb-1 text-sm">
                                    Vehicle Type*
                                  </label>
                                  <input
                                    type="text"
                                    id={`${vehicle.id}-vehicleType`}
                                    value={vehicle.vehicleType}
                                    onChange={(e) => updateVehicleBooking(vehicle.id, 'vehicleType', e.target.value)}
                                    placeholder="Vehicle Type *"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
                                    required
                                  />
                                </div>
                                {/* Other Vehicle Fields */}
                                {[
                                  { id: "vehicleYear", label: "Year*", placeholder: "e.g., 2023" },
                                  { id: "vehicleMake", label: "Make*", placeholder: "e.g., Toyota" },
                                  { id: "vehicleModel", label: "Model*", placeholder: "e.g., Camry" },
                                  { id: "vehicleColor", label: "Color*", placeholder: "e.g., Red" }
                                ].map((field) => (
                                  <div key={field.id}>
                                    <label htmlFor={`${vehicle.id}-${field.id}`} className="block text-gray-700 mb-1 text-sm">
                                      {field.label}
                                    </label>
                                    <input
                                      type="text"
                                      id={`${vehicle.id}-${field.id}`}
                                      value={vehicle[field.id as keyof VehicleBooking] as string}
                                      onChange={(e) => updateVehicleBooking(vehicle.id, field.id as keyof VehicleBooking, e.target.value)}
                                      placeholder={field.placeholder}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
                                      required
                                    />
                                  </div>
                                ))}
                              </div>

                              {/* Vehicle Length Input (for perFoot pricing) */}
                              {requiresLength && (
                                <div>
                                  <label htmlFor={`${vehicle.id}-vehicleLength`} className="block text-gray-700 mb-1 text-sm">
                                    Vehicle Length (feet)*
                                  </label>
                                  <input
                                    type="number"
                                    id={`${vehicle.id}-vehicleLength`}
                                    value={vehicle.vehicleLength || ""}
                                    onChange={(e) => updateVehicleBooking(vehicle.id, 'vehicleLength', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
                                    placeholder="Enter length in feet"
                                    required
                                    min="1"
                                    step="0.1"
                                  />
                                  <p className="text-sm text-gray-500 mt-1">
                                    Price will be calculated based on the length of your vehicle
                                  </p>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Total Price Display */}
              {formData.vehicleBookings.some(v => v.package) && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center font-semibold text-lg">
                    <span>Estimated Total for {formData.vehicleBookings.length} vehicle(s):</span>
                    <span>${calculateTotalPrice().toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    * Final price may vary based on actual vehicle condition and requirements
                  </p>
                </div>
              )}

              <div className="flex justify-between pt-4">
                <div></div>
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-2 rounded"
                  disabled={!areAllVehiclesValid}
                >
                  Next Step →
                </Button>
              </div>
            </div>
          )}

          {/* --- Step 2: Date & Time --- */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Date Picker */}
                <div>
                  <label className="block text-gray-700 mb-2">Select a Date*</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.date
                          ? format(new Date(formData.date), "PPP")
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.date ? new Date(formData.date) : undefined}
                        onSelect={handleDateSelect}
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return date < today || date.getDay() === 0;
                        }}
                        initialFocus
                        className={cn("p-3")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time Picker */}
                <div>
                  <label className="block text-gray-700 mb-2">Select a Time*</label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time: string) => (
                      <button
                        key={time}
                        type="button"
                        className={cn(
                          "py-2 px-3 text-sm border rounded-md text-center",
                          formData.timeSlot === time
                            ? "bg-sky-500 text-white border-sky-500"
                            : "bg-white text-gray-700 border-gray-300 hover:border-sky-500"
                        )}
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="outline"
                  className="border-gray-300"
                >
                  ← Previous Step
                </Button>
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-2 rounded"
                  disabled={!formData.date || !formData.timeSlot}
                >
                  Next Step →
                </Button>
              </div>
            </div>
          )}

          {/* --- Step 3: Personal Info --- */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: "firstName", label: "First Name*", type: "text" },
                  { id: "lastName", label: "Last Name*", type: "text" },
                  { id: "email", label: "Email*", type: "email" },
                ].map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block text-gray-700 mb-1 text-sm"
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      value={formData[field.id as keyof FormData] as string}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
                      required
                    />
                  </div>
                ))}

                {/* Phone Input with USA Format */}
                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-1 text-sm">
                    Mobile Phone*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
                    required
                    maxLength={17}
                  />
                </div>
              </div>

              {/* Address Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-gray-700 mb-1">
                    Street Address*
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-gray-700 mb-1">
                    City*
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-gray-700 mb-1">
                    State*
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
                    placeholder="State"
                    required
                  />
                  {formData.city && !formData.state && (
                    <p className="text-sm text-gray-500 mt-1">
                      State will be auto-detected when you enter city
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="zip" className="block text-gray-700 mb-1">
                    ZIP Code*
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
                    required
                    maxLength={5}
                    pattern="[0-9]{5}"
                    title="5-digit ZIP code"
                  />
                </div>
              </div>

              {/* Promo Code Section */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold text-lg mb-3">Promo Code</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={handlePromoCodeChange}
                    placeholder="Enter promo code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
                    disabled={!!appliedPromo}
                  />
                  {appliedPromo ? (
                    <Button
                      type="button"
                      onClick={removePromoCode}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Remove
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={applyPromoCode}
                      className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded"
                      disabled={!promoCode.trim()}
                    >
                      Apply
                    </Button>
                  )}
                </div>
                {promoError && (
                  <p className="text-red-500 text-sm mt-2">{promoError}</p>
                )}
                {appliedPromo && (
                  <p className="text-sky-500 text-sm mt-2">
                    ✅ Promo code applied! {appliedPromo.discount}% discount
                  </p>
                )}
              </div>

              {/* Notes */}
              <div>
                <label
                  htmlFor="notes"
                  className="block text-gray-700 mb-1 text-sm"
                >
                  Special Instructions (optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
                  placeholder="Any special requests or information we should know"
                />
              </div>

              {/* Booking Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Booking Summary</h3>
                <div className="space-y-4">
                  {formData.vehicleBookings.map((vehicle, index) => {
                    const serviceType = serviceTypes.find(st => st.id === vehicle.serviceType);
                    const mainService = mainServices.find(ms => ms.id === vehicle.mainService);
                    let selectedPackage;
                    let vehicleTotal = 0;

                    if (mainService) {
                      selectedPackage = mainService.packages.find(p => p.id === vehicle.package);
                    } else if (serviceType?.variants && vehicle.variant) {
                      const variant = serviceType.variants.find(v => v.id === vehicle.variant);
                      selectedPackage = variant?.packages.find(p => p.id === vehicle.package);
                    } else {
                      selectedPackage = serviceType?.packages?.find(p => p.id === vehicle.package);
                    }

                    if (selectedPackage) {
                      let packagePrice = typeof selectedPackage.price === 'string' ? Number(selectedPackage.price) || 0 : selectedPackage.price;
                      if (selectedPackage.pricingType === "perFoot" && vehicle.vehicleLength) {
                        packagePrice *= parseFloat(vehicle.vehicleLength);
                      }
                      vehicleTotal += packagePrice;
                    }

                    return (
                      <div key={vehicle.id} className="border-b pb-4 last:border-b-0">
                        <h4 className="font-medium mb-2">Vehicle {index + 1}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-medium">Service:</span> {mainService?.name || serviceType?.name}
                            {vehicle.variant && ` (${serviceType?.variants?.find(v => v.id === vehicle.variant)?.name})`}
                          </div>
                          <div>
                            <span className="font-medium">Package:</span> {selectedPackage?.name}
                          </div>
                          <div>
                            <span className="font-medium">Vehicle:</span> {vehicle.vehicleYear} {vehicle.vehicleMake} {vehicle.vehicleModel}
                          </div>
                          <div>
                            <span className="font-medium">Color:</span> {vehicle.vehicleColor}
                          </div>
                          {vehicle.additionalServices.length > 0 && (
                            <div className="md:col-span-2">
                              <span className="font-medium">Add-ons:</span> {vehicle.additionalServices.length} service(s)
                            </div>
                          )}
                          <div className="md:col-span-2 text-right font-medium">
                            Vehicle Total: ${vehicleTotal.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Promo Code Discount Display */}
                  {appliedPromo && (
                    <>
                      <div className="flex justify-between text-green-600">
                        <span>Promo Code ({appliedPromo.code}):</span>
                        <span>-{appliedPromo.discount}%</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Discount Amount:</span>
                        <span>-${calculateDiscount().toFixed(2)}</span>
                      </div>
                    </>
                  )}

                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Total ({formData.vehicleBookings.length} vehicles):</span>
                    <span>${calculateFinalPrice().toFixed(2)}</span>
                  </div>

                  {appliedPromo && (
                    <p className="text-sm text-gray-600 mt-1">
                      * Original price: ${calculateTotalPrice().toFixed(2)}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="outline"
                  className="border-gray-300"
                >
                  ← Previous Step
                </Button>
                <Button
                  type="submit"
                  className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-2 rounded flex items-center"
                  disabled={
                    isSubmitting ||
                    !formData.firstName ||
                    !formData.lastName ||
                    !formData.email ||
                    !formData.phone ||
                    !formData.address ||
                    !formData.city ||
                    !formData.state ||
                    !formData.zip
                  }
                >
                  {isSubmitting && (
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                  {isSubmitting ? "Processing..." : "Complete Booking"}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <Dialog open={showConfirmation} onOpenChange={closeConfirmation}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl">
                Booking Confirmed!
              </DialogTitle>
              <DialogDescription className="text-center">
                Thank you for booking with {WEBSITE_NAME}.
              </DialogDescription>
            </DialogHeader>
            <div className="p-6 space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-lg font-semibold">Booking ID: {bookingId}</p>
                <p className="text-lg mt-2">Your appointment details:</p>
                <p className="font-medium">
                  {formData.date ? format(new Date(formData.date), "PPP") : ""}{" "}
                  at {formData.timeSlot}
                </p>
                <p>
                  {formData.vehicleBookings.length} vehicle(s) booked
                </p>
                {appliedPromo && (
                  <p className="text-green-600">
                    Promo applied: {appliedPromo.code} ({appliedPromo.discount}% off)
                  </p>
                )}
              </div>
              <p className="text-sm text-center text-gray-600">
                A confirmation email has been sent to {formData.email}.
              </p>
            </div>
            <DialogFooter className="flex justify-center">
              <Link href="/">
                <Button
                  className="ml-2 bg-sky-500 hover:bg-sky-500 text-white px-6 py-2 rounded"
                >
                  Return To Home
                </Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default BookingForm;