import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting seed...')

    // Clear existing data
    await prisma.pantryProduct.deleteMany()
    await prisma.category.deleteMany()
    await prisma.shoppingItem.deleteMany()

    // 1. Create Categories
    console.log('Creating categories...')
    const categoriesData = [
        { name: 'Dairy & Eggs', color: '#FFF8E1', icon: '🥛' },
        { name: 'Fruits & Vegetables', color: '#E8F5E9', icon: '🍎' },
        { name: 'Meat & Fish', color: '#FFEBEE', icon: '🥩' },
        { name: 'Bakery', color: '#FFF3E0', icon: '🍞' },
        { name: 'Pantry Essentials', color: '#EFEBE9', icon: '🥫' },
        { name: 'Drinks', color: '#E3F2FD', icon: '🥤' },
        { name: 'Snacks', color: '#F3E5F5', icon: '🍿' },
        { name: 'Cleaning', color: '#E0F7FA', icon: '🧹' }
    ]

    const categories = []
    for (const cat of categoriesData) {
        const category = await prisma.category.create({
            data: cat
        })
        categories.push(category)
    }

    // 2. Create Pantry Products
    console.log('Creating pantry products...')

    // Helper to find category id by name
    const findCatId = (name: string) => categories.find(c => c.name === name)?.id

    await prisma.pantryProduct.createMany({
        data: [
            { name: 'Milk', quantity: 2, categoryId: findCatId('Dairy & Eggs')!, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
            { name: 'Cheddar Cheese', quantity: 1, categoryId: findCatId('Dairy & Eggs')! },
            { name: 'Apples', quantity: 6, categoryId: findCatId('Fruits & Vegetables')! },
            { name: 'Carrots', quantity: 5, categoryId: findCatId('Fruits & Vegetables')! },
            { name: 'Chicken Breast', quantity: 2, categoryId: findCatId('Meat & Fish')!, expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) },
            { name: 'Sourdough Bread', quantity: 1, categoryId: findCatId('Bakery')! },
            { name: 'Rice', quantity: 1, categoryId: findCatId('Pantry Essentials')! },
            { name: 'Pasta', quantity: 3, categoryId: findCatId('Pantry Essentials')! },
            { name: 'Olive Oil', quantity: 1, categoryId: findCatId('Pantry Essentials')! },
            { name: 'Orange Juice', quantity: 1, categoryId: findCatId('Drinks')! },
            { name: 'Potato Chips', quantity: 2, categoryId: findCatId('Snacks')! },
            { name: 'Dish Soap', quantity: 1, categoryId: findCatId('Cleaning')! }
        ]
    })

    // 3. Create Shopping List Items
    console.log('Creating shopping list items...')
    await prisma.shoppingItem.createMany({
        data: [
            { name: 'Eggs', quantity: 12, checked: false },
            { name: 'Bananas', quantity: 6, checked: true },
            { name: 'Toothpaste', quantity: 1, checked: false },
            { name: 'Paper Towels', quantity: 2, checked: false }
        ]
    })

    console.log('✅ Seed completed successfully!')
}

main()
    .catch((e) => {
        console.error('❌ Error seeding data:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
