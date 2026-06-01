/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ServiceType = 'residential' | 'automotive' | 'corporate' | 'safe';

export type BookingStatus = 'idle' | 'details' | 'locating' | 'confirmed' | 'dispatched' | 'arriving' | 'arrived' | 'completed';

export interface Locksmith {
  id: string;
  name: string;
  rating: number;
  completedJobs: number;
  specialty: string[];
  distance: number; // in km
  eta: number; // in minutes
  avatar: string;
  vehicle: string;
  plate: string;
  phone: string;
}

export interface ServiceRequest {
  id: string;
  serviceType: ServiceType;
  subType: string;
  address: string;
  lat?: number;
  lng?: number;
  customNotes?: string;
  securityLevel: 'standard' | 'high' | 'ultra';
  hasPhoto: boolean;
  contactName: string;
  contactPhone: string;
  estimatedPrice: number;
  status: BookingStatus;
  selectedLocksmith?: Locksmith;
}

export interface ServicePackage {
  id: ServiceType;
  title: string;
  description: string;
  basePrice: number;
  features: string[];
  subTypes: string[];
  iconName: string;
}
