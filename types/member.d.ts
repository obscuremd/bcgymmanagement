interface Member {
  _id?: string;
  surname: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  image?: string;
  membershipType: string;
  registrationDate: string;
  cardReceivedDate?: string;
  duration: string;
  amount: string;
  cardIssueDate?: string;
  regCardType?: string;
  paymentMethod: string;
  paymentDate: string;
  paymentByInstallment?: string;
  expiryDate: string;
  status?: "Active" | "Expired";
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  error?: string;
}
