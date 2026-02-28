# API Routes Documentation

## Overview

Complete CRUD operations for gym members with MongoDB integration.

## File Structure

```
app/
├── api/
│   └── members/
│       ├── route.ts           # POST (create), GET (list all)
│       └── [id]/
│           └── route.ts       # GET (single), PUT (update), DELETE
models/
└── Member.ts                  # MongoDB schema
lib/
├── mongodb.ts                 # Database connection (your existing file)
└── api.ts                     # Frontend API utilities
```

---

## API Endpoints

### 1. Create Member

**Endpoint:** `POST /api/members`

**Request Body:**

```json
{
  "surname": "Doe",
  "name": "John",
  "email": "john.doe@example.com",
  "phone": "+234 803 456 7890",
  "address": "123 Main Street, Lagos",
  "image": "https://example.com/image.jpg",
  "membershipType": "VIP MEMBERSHIP",
  "registrationDate": "2024-01-15",
  "cardReceivedDate": "2024-01-20",
  "duration": "1 YEAR",
  "amount": "$250,000",
  "cardIssueDate": "2024-01-20",
  "regCardType": "Gold Card",
  "paymentMethod": "Instant Bank Transfer",
  "paymentDate": "2024-01-15",
  "paymentByInstallment": "No",
  "expiryDate": "2025-01-15",
  "status": "Active"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Member created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "surname": "Doe",
    "name": "John",
    ...
  }
}
```

---

### 2. Get All Members

**Endpoint:** `GET /api/members`

**Query Parameters (optional):**

- `status` - Filter by status (Active/Expired)
- `membershipType` - Filter by membership type
- `search` - Search in name, surname, email, phone

**Examples:**

```
GET /api/members
GET /api/members?status=Active
GET /api/members?membershipType=VIP MEMBERSHIP
GET /api/members?search=john
GET /api/members?status=Active&search=doe
```

**Response:**

```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "surname": "Doe",
      "name": "John",
      ...
    }
  ]
}
```

---

### 3. Get Single Member

**Endpoint:** `GET /api/members/:id`

**Example:**

```
GET /api/members/507f1f77bcf86cd799439011
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "surname": "Doe",
    "name": "John",
    ...
  }
}
```

---

### 4. Update Member

**Endpoint:** `PUT /api/members/:id`

**Request Body (partial update supported):**

```json
{
  "status": "Expired",
  "amount": "$300,000"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Member updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "status": "Expired",
    ...
  }
}
```

---

### 5. Delete Member

**Endpoint:** `DELETE /api/members/:id`

**Example:**

```
DELETE /api/members/507f1f77bcf86cd799439011
```

**Response:**

```json
{
  "success": true,
  "message": "Member deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    ...
  }
}
```

---

## Frontend Usage Examples

### Using the API utility functions

```typescript
import {
  createMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember,
} from "@/lib/api";

// Create a new member
const handleCreateMember = async (formData) => {
  const result = await createMember(formData);

  if (result.success) {
    console.log("Member created:", result.data);
    // Show success message
  } else {
    console.error("Error:", result.message);
    // Show error message
  }
};

// Get all members
const fetchMembers = async () => {
  const result = await getMembers();

  if (result.success) {
    console.log("Members:", result.data);
    setMembers(result.data);
  }
};

// Get members with filters
const fetchActiveMembers = async () => {
  const result = await getMembers({
    status: "Active",
    search: "john",
  });

  if (result.success) {
    setMembers(result.data);
  }
};

// Get single member
const fetchMember = async (id: string) => {
  const result = await getMemberById(id);

  if (result.success) {
    setSelectedMember(result.data);
  }
};

// Update member
const handleUpdateMember = async (id: string, updates: any) => {
  const result = await updateMember(id, updates);

  if (result.success) {
    console.log("Member updated:", result.data);
    // Refresh members list
  }
};

// Delete member
const handleDeleteMember = async (id: string) => {
  const result = await deleteMember(id);

  if (result.success) {
    console.log("Member deleted");
    // Refresh members list
  }
};
```

---

## Environment Variables

Make sure you have this in your `.env.local`:

````


## Error Handling

All endpoints return a consistent error format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
````

**Common HTTP Status Codes:**

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error, duplicate email)
- `404` - Not Found
- `500` - Server Error

---

## MongoDB Schema

The Member model includes:

- **Required fields:** surname, name, email, phone, address, membershipType, registrationDate, duration, amount, paymentMethod, paymentDate, expiryDate
- **Optional fields:** image, cardReceivedDate, cardIssueDate, regCardType, paymentByInstallment
- **Auto-generated:** \_id, createdAt, updatedAt, status (defaults to "Active")
- **Unique:** email

---

## Notes

1. The database connection is automatically established for each request
2. Email addresses are automatically converted to lowercase
3. The member status defaults to "Active"
4. Timestamps (createdAt, updatedAt) are automatically managed
5. All string fields are trimmed automatically
6. Mongoose model caching prevents recompilation issues in Next.js development
