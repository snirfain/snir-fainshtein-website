// Local entities system - replaces Base44
import { ProductAPI, UserAPI, EmailAPI, OrderAPI, AIAPI, SiteContentAPI, PolicyPagesAPI, FAQAPI, CouponAPI } from '@/services/mockData';

export const Product = ProductAPI;
export const User = UserAPI;
export const SendEmail = EmailAPI.send;
export const Order = OrderAPI;
export const InvokeLLM = AIAPI.chat;
export const SiteContent = SiteContentAPI;
export const PolicyPages = PolicyPagesAPI;
export const FAQ = FAQAPI;

// AI Tools related entities (mock implementations)
export const UserFavorite = {
  filter: async () => [],
  create: async (data) => ({ id: Date.now(), ...data }),
  delete: async (id) => ({ success: true })
};

export const UserSubscription = {
  filter: async () => [],
  create: async (data) => ({ id: Date.now(), ...data }),
  getAll: async () => []
};

export const AILink = {
  filter: async () => [],
  getAll: async () => [],
  getById: async (id) => null
};

// Coupon entity
export const Coupon = CouponAPI;

export const Review = {
  filter: async () => [],
  create: async (data) => ({ id: Date.now(), ...data }),
  getAll: async () => []
};

export const Download = {
  filter: async () => [],
  create: async (data) => ({ id: Date.now(), ...data }),
  getAll: async () => [],
  getById: async (id) => null
};
