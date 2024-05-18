import axios from "axios";

export const getPageData = async (id: string) => {
  const url = `${process.env.NEXTAUTH_URL!}/api/page/public-page-data`; // Replace with your actual API endpoint

  try {
    const response = await axios.post(url, { id });

    if (response.status !== 200) {
      throw new Error(`Error fetching data: ${response.status}`);
    }

    const fieldValue = await response.data.fieldValue;
    return fieldValue;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { massage: error, fieldValue: null };
  }
};
