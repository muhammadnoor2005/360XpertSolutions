const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const main = async() => {
    try {
        await prisma.product.createMany({
            data:[
                {name: "Phone"},
                {name: "car"},
                {name: "Bike"}
            ]
        });

        console.log("uploaded");
    } catch (err) {
        throw(err);
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());