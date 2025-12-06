/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: files
 * Interface for Files
 */
export interface Files {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  fileName?: string;
  /** @wixFieldType url */
  fileUrl?: string;
  /** @wixFieldType text */
  groupId?: string;
  /** @wixFieldType text */
  keywords?: string;
  /** @wixFieldType text */
  createdBy?: string;
  /** @wixFieldType datetime */
  createdAt?: Date | string;
  /** @wixFieldType text */
  status?: string;
}


/**
 * Collection ID: groups
 * Interface for Groups
 */
export interface Groups {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  groupName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  creator?: string;
  /** @wixFieldType datetime */
  creationDate?: Date | string;
  /** @wixFieldType boolean */
  isPrivate?: boolean;
}


/**
 * Collection ID: p2pdevices
 * Interface for P2PDevices
 */
export interface P2PDevices {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  deviceName?: string;
  /** @wixFieldType text */
  userId?: string;
  /** @wixFieldType datetime */
  creationTimestamp?: Date | string;
  /** @wixFieldType text */
  deviceStatus?: string;
  /** @wixFieldType text */
  deviceType?: string;
  /** @wixFieldType datetime */
  lastSeen?: Date | string;
}


/**
 * Collection ID: pricingplans
 * Interface for PricingPlans
 */
export interface PricingPlans {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  planName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType number */
  monthlyPrice?: number;
  /** @wixFieldType number */
  annualPrice?: number;
  /** @wixFieldType number */
  storageLimitGB?: number;
  /** @wixFieldType number */
  userAccountsIncluded?: number;
  /** @wixFieldType boolean */
  prioritySupport?: boolean;
  /** @wixFieldType boolean */
  isRecommended?: boolean;
  /** @wixFieldType url */
  ctaUrl?: string;
}


/**
 * Collection ID: productfeatures
 * Interface for ProductFeatures
 */
export interface ProductFeatures {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  featureName?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  detailedDescription?: string;
  /** @wixFieldType image */
  featureImage?: string;
  /** @wixFieldType text */
  keyBenefit?: string;
  /** @wixFieldType boolean */
  isCoreFeature?: boolean;
}


/**
 * Collection ID: storages
 * Interface for Storages
 */
export interface Storages {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  storageName?: string;
  /** @wixFieldType text */
  storageType?: string;
  /** @wixFieldType text */
  userId?: string;
  /** @wixFieldType number */
  totalCapacity?: number;
  /** @wixFieldType number */
  usedCapacity?: number;
  /** @wixFieldType datetime */
  createdAt?: Date | string;
}
