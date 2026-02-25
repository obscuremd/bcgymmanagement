/* eslint-disable @typescript-eslint/no-explicit-any */
// Utility functions for making API calls to the members endpoints
import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function createMember(
  memberData: Omit<Member, "_id">,
): Promise<ApiResponse<Member>> {
  try {
    const { data } = await api.post("/member/post", memberData);
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create member",
      error: error.message,
    };
  }
}

export async function getMembers(filters?: {
  status?: string;
  membershipType?: string;
  search?: string;
}): Promise<ApiResponse<Member[]>> {
  try {
    const { data } = await api.get("/member/post", {
      params: filters,
    });
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch members",
      error: error.message,
    };
  }
}

export async function getMemberById(id: string): Promise<ApiResponse<Member>> {
  try {
    const { data } = await api.get(`/member/query/${id}`);
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch member",
      error: error.message,
    };
  }
}

export async function updateMember(
  id: string,
  memberData: Partial<Member>,
): Promise<ApiResponse<Member>> {
  try {
    const { data } = await api.put(`/member/query/${id}`, memberData);
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update member",
      error: error.message,
    };
  }
}

export async function deleteMember(id: string): Promise<ApiResponse<Member>> {
  try {
    const { data } = await api.delete(`/member/query/${id}`);
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete member",
      error: error.message,
    };
  }
}
