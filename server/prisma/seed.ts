import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@inventory.com' },
    update: {},
    create: {
      email: 'admin@inventory.com',
      username: 'admin',
      password: hashedPassword,
      firstName: 'System',
      lastName: 'Administrator',
      role: 'ADMIN'
    }
  });

  console.log(' Created admin user:', adminUser.email);

  // Create default warehouses
  const mainWarehouse = await prisma.warehouse.upsert({
    where: { code: 'MAIN' },
    update: {},
    create: {
      name: 'Main Warehouse',
      code: 'MAIN',
      address: '123 Main Street',
      city: 'Business City',
      state: 'State',
      country: 'Country',
      zipCode: '12345',
      description: 'Primary warehouse location'
    }
  });

  const secondaryWarehouse = await prisma.warehouse.upsert({
    where: { code: 'SEC' },
    update: {},
    create: {
      name: 'Secondary Warehouse',
      code: 'SEC',
      address: '456 Secondary Avenue',
      city: 'Business City',
      state: 'State', 
      country: 'Country',
      zipCode: '12346',
      description: 'Secondary storage location'
    }
  });

  console.log('🏭 Created warehouses:', mainWarehouse.name, secondaryWarehouse.name);

  // Create categories
  const electronics = await prisma.category.upsert({
    where: { id: 'electronics-id' },
    update: {},
    create: {
      id: 'electronics-id',
      name: 'Electronics',
      description: 'Electronic devices and components'
    }
  });

  const office = await prisma.category.upsert({
    where: { id: 'office-id' },
    update: {},
    create: {
      id: 'office-id',
      name: 'Office Supplies',
      description: 'Office and business supplies'
    }
  });

  console.log(' Created categories:', electronics.name, office.name);

  // Create sample items
  const laptop = await prisma.item.upsert({
    where: { sku: 'LAPTOP-001' },
    update: {},
    create: {
      sku: 'LAPTOP-001',
      name: 'Business Laptop',
      description: 'High-performance laptop for business use',
      categoryId: electronics.id,
      unitOfMeasure: 'piece',
      costPrice: 800.00,
      sellingPrice: 1200.00,
      minStockLevel: 5,
      maxStockLevel: 50,
      reorderPoint: 10,
      barcode: '1234567890123',
      createdById: adminUser.id
    }
  });

  const mouse = await prisma.item.upsert({
    where: { sku: 'MOUSE-001' },
    update: {},
    create: {
      sku: 'MOUSE-001',
      name: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse',
      categoryId: electronics.id,
      unitOfMeasure: 'piece',
      costPrice: 15.00,
      sellingPrice: 25.00,
      minStockLevel: 20,
      maxStockLevel: 200,
      reorderPoint: 30,
      barcode: '1234567890124',
      createdById: adminUser.id
    }
  });

  console.log('📦 Created items:', laptop.name, mouse.name);

  // Create initial stock in warehouses
  await prisma.itemWarehouse.createMany({
    data: [
      {
        itemId: laptop.id,
        warehouseId: mainWarehouse.id,
        currentStock: 25,
        reservedStock: 0,
        availableStock: 25
      },
      {
        itemId: laptop.id,
        warehouseId: secondaryWarehouse.id,
        currentStock: 15,
        reservedStock: 0,
        availableStock: 15
      },
      {
        itemId: mouse.id,
        warehouseId: mainWarehouse.id,
        currentStock: 100,
        reservedStock: 0,
        availableStock: 100
      }
    ],
    skipDuplicates: true
  });

  console.log(' Created initial stock levels');

  // Create sample customers and suppliers
  const customer = await prisma.customer.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      name: 'Astra Entreprise',
      email: 'customer@example.com',
      phone: '+1-555-0123',
      address: '789 Customer Lane',
      city: 'Customer City',
      state: 'State',
      country: 'Country',
      zipCode: '12347'
    }
  });

  const supplier = await prisma.supplier.upsert({
    where: { email: 'supplier@example.com' },
    update: {},
    create: {
      name: 'Tech Supplier Inc',
      email: 'supplier@example.com',
      phone: '+1-555-0124',
      address: '321 Supplier Street',
      city: 'Supplier City',
      state: 'State',
      country: 'Country',
      zipCode: '12348'
    }
  });

  console.log(' Created customer and supplier');
  console.log(' Database seed completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(' Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });