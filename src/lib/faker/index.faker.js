import { faker } from "@faker-js/faker";
import { faker as fakerIn } from "@faker-js/faker/locale/en_IN";
import { genDummyFile } from "@/lib/actions";

export const dummyDataAndFileGen = () => {
  const getRandomDateWithinLast60Days = () => {
    const now = new Date();
    const past = new Date(now);
    past.setDate(now.getDate() - 60);
    return new Date(
      past.getTime() + Math.random() * (now.getTime() - past.getTime())
    );
  };

  function generateRandomOrder() {
    const pageId = faker.string.uuid();
    const orderId = faker.string.uuid();
    const amount = faker.commerce.price();

    const dummyOrder = {
      _id: orderId,
      customerInfo: {
        "Full Name": faker.person.fullName(),
        "Phone Number": faker.phone.number(),
        Email: faker.internet.email(),
      },
      isPaid: faker.datatype.boolean(),
      rzrPayOrderId: faker.string.uuid(),
      amount,
      ofPage: [pageId],
      createdAt: getRandomDateWithinLast60Days(),
    };

    const dummyPage = {
      _id: pageId,
      metaData: {
        metaTitle: faker.commerce.product(),
      },
      pagePrice: amount,
      pageOrders: [orderId],
      creator: faker.string.uuid(),
      isPublished: faker.datatype.boolean(),
      createdAt: getRandomDateWithinLast60Days(),
    };

    return {
      dummyOrder,
      dummyPage,
    };
  }

  const ordersD = [];
  const pageD = [];
  for (let i = 0; i < 1000; i++) {
    const dummyData = generateRandomOrder();
    ordersD.push(dummyData.dummyOrder);
    pageD.push(dummyData.dummyPage);
  }

  console.log(ordersD);
  console.log(pageD);

  const orderJson = JSON.stringify(ordersD, null, 2);
  const pageJson = JSON.stringify(pageD, null, 2);

  genDummyFile({ orderJson, pageJson });
};

export const indianNameAndCityGenerator = () => {
  const firstName = fakerIn.person.firstName();
  const lastName = fakerIn.person.lastName()
  const indianCity = fakerIn.location.city();

  return {
    indianName: `${firstName} ${lastName}`,
    indianCity,
  };
};
