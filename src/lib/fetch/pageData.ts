export const getPageData = async (id: string) => {
  const url = `${process.env.NEXTAUTH_URL!}/api/page/${id}`; // Replace with your actual API endpoint

  try {
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }

    const fieldValue = await response.json();
    return fieldValue;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { massage: error, fieldValue: null };
  }
};
