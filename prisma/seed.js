const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    const initialTasks = [
        {
            title: 'Setup Project',
            description: 'Initial project structure with Express and Quasar',
        },
        {
            title: 'Database Migration',
            description: 'Connect to Supabase and push Prisma schema',
        },
        {
            title: 'Cloud Deployment',
            description: 'Deploy Backend to Render and Frontend to Netlify',
        },
        {
            title: 'ศิริรัตน์ คชสาร',
            description: '6604101382',
        },
    ];

    for (const t of initialTasks) {
        const existing = await prisma.task.findFirst({
            where: { title: t.title }
        });

        if (!existing) {
            const task = await prisma.task.create({
                data: t,
            });
            console.log(`Created task: ${task.title}`);
        } else {
            console.log(`Task already exists: ${t.title}`);
        }
    }

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
