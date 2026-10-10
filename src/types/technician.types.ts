export interface ITechnician {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  imageUrl: string;
  status: "ACTIVE" | "INACTIVE";
  technician: {
    specialization: string;
    experience: number;
    rating: number;
    totalJobs: number;
    availability: "AVAILABLE" | "UNAVAILABLE" | "BUSY";
    isVerified: boolean;
    serviceRadius: number;
    hourlyRate: number;
  };
}
