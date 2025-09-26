import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create default organization
  const organization = await prisma.organization.create({
    data: {
      name: 'Default Organization',
    },
  });

  // Create default subscription
  await prisma.subscription.create({
    data: {
      organizationId: organization.id,
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
      status: 'active',
    },
  });

  // Hash password for default users
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // Create default admin user
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@system.com',
      password: hashedPassword,
      firstName: 'System',
      lastName: 'Admin',
      role: 'admin',
      organizationId: organization.id,
    },
  });

  // Create default user
  const defaultUser = await prisma.user.create({
    data: {
      email: 'user@system.com',
      password: hashedPassword,
      firstName: 'Default',
      lastName: 'User',
      role: 'user',
      organizationId: organization.id,
    },
  });

  // Create warehouses
  const mainWarehouse = await prisma.warehouse.create({
    data: {
      name: 'Main Warehouse',
      code: 'MAIN-001',
      address: '123 Warehouse St',
      city: 'Industrial City',
      state: 'CA',
      country: 'USA',
      zipCode: '12345',
    },
  });

  const secondaryWarehouse = await prisma.warehouse.create({
    data: {
      name: 'Secondary Warehouse',
      code: 'SEC-001',
      address: '456 Storage Ave',
      city: 'Storage City',
      state: 'TX',
      country: 'USA',
      zipCode: '67890',
    },
  });

  // Create categories
  const electronicsCategory = await prisma.category.create({
    data: {
      name: 'Electronics',
      description: 'Electronic devices and components',
    },
  });

  const clothingCategory = await prisma.category.create({
    data: {
      name: 'Clothing',
      description: 'Apparel and accessories',
    },
  });

  // Create items with proper user references
  const laptop = await prisma.item.create({
    data: {
      sku: 'LAPTOP-001',
      name: 'Gaming Laptop',
      description: 'High-performance gaming laptop',
      categoryId: electronicsCategory.id,
      unitOfMeasure: 'piece',
      costPrice: 800.00,
      sellingPrice: 1200.00,
      minStockLevel: 5,
      maxStockLevel: 50,
      reorderPoint: 10,
      barcode: '1234567890123',
      createdById: adminUser.id, // Reference the created user
    },
  });

  const smartphone = await prisma.item.create({
    data: {
      sku: 'PHONE-001',
      name: 'Smartphone',
      description: 'Latest model smartphone',
      categoryId: electronicsCategory.id,
      unitOfMeasure: 'piece',
      costPrice: 300.00,
      sellingPrice: 599.99,
      minStockLevel: 10,
      maxStockLevel: 100,
      reorderPoint: 20,
      barcode: '1234567890124',
      createdById: adminUser.id,
    },
  });

  const tshirt = await prisma.item.create({
    data: {
      sku: 'SHIRT-001',
      name: 'Cotton T-Shirt',
      description: 'Comfortable cotton t-shirt',
      categoryId: clothingCategory.id,
      unitOfMeasure: 'piece',
      costPrice: 5.00,
      sellingPrice: 19.99,
      minStockLevel: 20,
      maxStockLevel: 200,
      reorderPoint: 50,
      barcode: '1234567890125',
      createdById: defaultUser.id,
    },
  });

  // Create item-warehouse relationships with stock
  await prisma.itemWarehouse.createMany({
    data: [
      {
        itemId: laptop.id,
        warehouseId: mainWarehouse.id,
        currentStock: 25,
        availableStock: 25,
      },
      {
        itemId: smartphone.id,
        warehouseId: mainWarehouse.id,
        currentStock: 50,
        availableStock: 45,
        reservedStock: 5,
      },
      {
        itemId: tshirt.id,
        warehouseId: secondaryWarehouse.id,
        currentStock: 150,
        availableStock: 150,
      },
    ],
  });

  // Create customers
  const customer1 = await prisma.customer.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1234567890',
      address: '789 Customer St',
      city: 'Customer City',
      state: 'NY',
      country: 'USA',
      zipCode: '54321',
    },
  });

  // Create suppliers
  const supplier1 = await prisma.supplier.create({
    data: {
      name: 'Tech Supplier Inc',
      email: 'contact@techsupplier.com',
      phone: '+9876543210',
      address: '321 Supplier Blvd',
      city: 'Supplier Town',
      state: 'CA',
      country: 'USA',
      zipCode: '98765',
    },
  });

  // Create some inventory movements
  await prisma.movement.createMany({
    data: [
      {
        type: 'IN',
        itemId: laptop.id,
        warehouseId: mainWarehouse.id,
        quantity: 25,
        unitCost: 800.00,
        reference: 'INITIAL-STOCK',
        referenceType: 'MANUAL',
        userId: adminUser.id,
      },
      {
        type: 'IN',
        itemId: smartphone.id,
        warehouseId: mainWarehouse.id,
        quantity: 50,
        unitCost: 300.00,
        reference: 'INITIAL-STOCK',
        referenceType: 'MANUAL',
        userId: adminUser.id,
      },
    ],
  });

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });