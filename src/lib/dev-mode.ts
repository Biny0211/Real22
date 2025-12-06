/**
 * Development mode configuration
 * Set DEV_MODE_ENABLED to true to simulate a logged-in user for preview purposes
 */

export const DEV_MODE_ENABLED = true; // Set to false to disable dev mode

export const MOCK_MEMBER = {
  _id: 'dev-user-123',
  loginEmail: 'dev@example.com',
  loginEmailVerified: true,
  status: 'APPROVED' as const,
  contact: {
    firstName: 'Dev',
    lastName: 'User',
    phones: [],
  },
  profile: {
    nickname: 'Dev User',
    photo: {
      url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DevUser',
      height: 200,
      width: 200,
    },
    title: 'Developer',
  },
  _createdDate: new Date('2024-01-01'),
  _updatedDate: new Date('2024-01-01'),
  lastLoginDate: new Date(),
};
