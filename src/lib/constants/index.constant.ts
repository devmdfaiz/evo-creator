import { TValidFiles } from "../types/index.type";

export const pageThemeProvider = (theme: string) =>
  `${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`;

export const pageInputThemeProvider = (theme: string) =>
  `${
    theme === "light"
      ? "bg-gray-200/60 text-white"
      : "bg-white-200/60 text-black"
  }`;

export const pageCarouselThemeProvider = (theme: string) =>
  `${
    theme === "light"
      ? "bg-white-200/60 hover:bg-black-200/60 hover:text-black text-white border-black text-black"
      : "bg-black-200/60 hover:bg-white-200/60 hover:text-white text-black border-white text-white"
  }`;

export const pageInputBackgroundThemeProvider = (theme: string) =>
  `${
    theme === "dark"
      ? "bg-black text-white border-white/50"
      : "bg-white text-black border-black/50"
  }`;

export const pageStrikeTextThemeProvider = (theme: string) =>
  `${theme === "dark" ? "text-white/60" : "text-black/60"}`;

export const SUPPORTED_IMAGE_FORMATES: TValidFiles = {
  formates: ["image/gif", "image/jpeg", "image/png", "image/webp", "image/jpg"],
  size: 3,
};

export const COMPRESSED_FILE: TValidFiles = {
  formates: ["application/x-zip-compressed"],
  size: 100,
};

export const luciedConf = {
  size: 16,
  strokeWidth: 1,
};

export const CATEGORIES_DATA: string[] = [
  "Finance",
  "Education",
  "Food",
  "Jobs",
  "Entertainment",
  "Travel",
  "Art & Crafts",
  "Fitness & Wellness",
  "Home & Wellness",
  "Fiction & Fantasy",
  "Comedy",
  "History & Culture",
  "Theatre",
  "Environment",
  "Relationships",
  "Marketing",
  "Fitness",
  "Business",
  "Photography",
  "News and Politics",
  "Astrology",
  "Beauty and Makeup",
  "Cartoons",
  "Crypto",
  "Dance",
  "Design",
  "Fashion & Lifestyle",
  "Gaming",
  "Health",
  "Hobbies",
  "Mentorship",
  "Motivation",
  "Music",
  "Non-profit",
  "Parenting",
  "Pets & Animals",
  "Religion",
  "Spirituality",
  "Startups",
  "Technology",
];

export const BUSINESS_TYPE = [
  { text: "Business", value: "business" },
  { text: "Individual", value: "individual" },
  { text: "Proprietorship", value: "proprietorship" },
  { text: "Partnership", value: "partnership" },
  { text: "Private Limited Company", value: "private_limited_company" },
  { text: "Public Limited Company", value: "public_limited_company" },
  {
    text: "Limited Liability Partnership",
    value: "limited_liability_partnership",
  },
  { text: "Society", value: "society" },
  { text: "Trust", value: "trust" },
  { text: "NGO", value: "ngo" },
  { text: "Other", value: "other" },
];

export const BUSINESS_CATEGORY = {
  text: "E-commerce",
  value: "ecommerce",
  subcategories: [
    { text: "E-commerce Marketplace", value: "ecommerce_marketplace" },
    // { text: "Digital Goods", value: "digital_goods" },
    { text: "Fashion and Lifestyle", value: "fashion_and_lifestyle" },
    { text: "Electronics and Furniture", value: "electronics_and_furniture" },
    { text: "Books", value: "books" },
    { text: "Office Supplies", value: "office_supplies" },
    { text: "Grocery", value: "grocery" },
    { text: "Pet Products", value: "pet_products" },
    { text: "Sports Products", value: "sports_products" },
    { text: "Arts and Collectibles", value: "arts_and_collectibles" },
    { text: "Gifting", value: "gifting" },
    { text: "Drop Shipping", value: "drop_shipping" },
    { text: "Rental", value: "rental" },
    { text: "Baby Products", value: "baby_products" },
    { text: "Office Equipment", value: "office_equipment" },
    {
      text: "Automobile Parts and Equipments",
      value: "automobile_parts_and_equipments",
    },
    { text: "Agriculture", value: "agriculture" },
    { text: "Wholesale", value: "wholesale" },
    { text: "Coupons", value: "coupons" },
    { text: "Fashion and Lifestyle", value: "fashion_and_lifestyle" },
    { text: "Religious Products", value: "religious_products" },
    { text: "Sexual Wellness Products", value: "sexual_wellness_products" },
    { text: "Crypto Machinery", value: "crypto_machinery" },
    { text: "Tobacco", value: "tobacco" },
    { text: "Weapons and Ammunitions", value: "weapons_and_ammunitions" },
    { text: "Stamps and Coins Stores", value: "stamps_and_coins_stores" },
    {
      text: "Automobile Parts and Equipments",
      value: "automobile_parts_and_equipments",
    },
    { text: "Garden Supply Stores", value: "garden_supply_stores" },
    {
      text: "Household Appliance Stores",
      value: "household_appliance_stores",
    },
    { text: "Non-durable Goods", value: "non_durable_goods" },
    { text: "Pawn Shops", value: "pawn_shops" },
    {
      text: "Electrical Parts and Equipment",
      value: "electrical_parts_and_equipment",
    },
    { text: "Wig and Toupee Shops", value: "wig_and_toupee_shops" },
    {
      text: "Gift Novelty and Souvenir Shops",
      value: "gift_novelty_and_souvenir_shops",
    },
    { text: "Duty Free Stores", value: "duty_free_stores" },
    { text: "Dry Goods", value: "dry_goods" },
    { text: "Books and Publications", value: "books_and_publications" },
    {
      text: "Camera and Photographic Stores",
      value: "camera_and_photographic_stores",
    },
    { text: "Record Shops", value: "record_shops" },
    { text: "Meat Supply Stores", value: "meat_supply_stores" },
    { text: "Leather Goods and Luggage", value: "leather_goods_and_luggage" },
    { text: "Snowmobile Dealers", value: "snowmobile_dealers" },
    {
      text: "Men and Boys Clothing Stores",
      value: "men_and_boys_clothing_stores",
    },
    { text: "Paint Supply Stores", value: "paint_supply_stores" },
    { text: "Automotive Parts", value: "automotive_parts" },
    {
      text: "Jewellery and Watch Stores",
      value: "jewellery_and_watch_stores",
    },
    {
      text: "Auto Store Home Supply Stores",
      value: "auto_store_home_supply_stores",
    },
    { text: "Tent Stores", value: "tent_stores" },
    { text: "Shoe Stores Retail", value: "shoe_stores_retail" },
    {
      text: "Petroleum and Petroleum Products",
      value: "petroleum_and_petroleum_products",
    },
    { text: "Department Stores", value: "department_stores" },
    { text: "Automotive Tire Stores", value: "automotive_tire_stores" },
    { text: "Sport Apparel Stores", value: "sport_apparel_stores" },
    { text: "Variety Stores", value: "variety_stores" },
    {
      text: "Chemicals and Allied Products",
      value: "chemicals_and_allied_products",
    },
    { text: "Commercial Equipments", value: "commercial_equipments" },
    {
      text: "Fireplace Parts and Accessories",
      value: "fireplace_parts_and_accessories",
    },
    { text: "Family Clothing Stores", value: "family_clothing_stores" },
    { text: "Fabric and Sewing Stores", value: "fabric_and_sewing_stores" },
    { text: "Home Supply Warehouse", value: "home_supply_warehouse" },
    { text: "Art Supply Stores", value: "art_supply_stores" },
    {
      text: "Camper Recreational and Utility Trailer Dealers",
      value: "camper_recreational_and_utility_trailer_dealers",
    },
    {
      text: "Clocks and Silverware Stores",
      value: "clocks_and_silverware_stores",
    },
    { text: "Discount Stores", value: "discount_stores" },
    {
      text: "School Supplies and Stationery",
      value: "school_supplies_and_stationery",
    },
    { text: "Second Hand Stores", value: "second_hand_stores" },
    {
      text: "Watch and Jewellery Repair Stores",
      value: "watch_and_jewellery_repair_stores",
    },
    { text: "Liquor Stores", value: "liquor_stores" },
    { text: "Boat Dealers", value: "boat_dealers" },
    {
      text: "Opticians Optical Goods and Eyeglasse Stores",
      value: "opticians_optical_goods_and_eyeglasse_stores",
    },
    { text: "Wholesale Footwear Stores", value: "wholesale_footwear_stores" },
    { text: "Cosmetic Stores", value: "cosmetic_stores" },
    { text: "Home Furnishing Stores", value: "home_furnishing_stores" },
    { text: "Antique Stores", value: "antique_stores" },
    {
      text: "Plumbing and Heating Equipment",
      value: "plumbing_and_heating_equipment",
    },
    {
      text: "Telecommunication Equipment Stores",
      value: "telecommunication_equipment_stores",
    },
    { text: "Women Clothing", value: "women_clothing" },
    { text: "Florists", value: "florists" },
    { text: "Computer Software Stores", value: "computer_software_stores" },
    { text: "Building Matrial Stores", value: "building_matrial_stores" },
    {
      text: "Candy Nut Confectionery Shops",
      value: "candy_nut_confectionery_shops",
    },
    {
      text: "Glass and Wallpaper Stores",
      value: "glass_and_wallpaper_stores",
    },
    {
      text: "Commercial Photography and Graphic Design Services",
      value: "commercial_photography_and_graphic_design_services",
    },
    { text: "Video Game Supply Stores", value: "video_game_supply_stores" },
    { text: "Fuel Dealers", value: "fuel_dealers" },
    {
      text: "Drapery and Window Coverings Stores",
      value: "drapery_and_window_coverings_stores",
    },
    { text: "Hearing Aids Stores", value: "hearing_aids_stores" },
    { text: "Automotive Paint Shops", value: "automotive_paint_shops" },
    { text: "Durable Goods Stores", value: "durable_goods_stores" },
    {
      text: "Uniforms and Commercial Clothing Stores",
      value: "uniforms_and_commercial_clothing_stores",
    },
    { text: "Fur Shops", value: "fur_shops" },
    { text: "Industrial Supplies", value: "industrial_supplies" },
    { text: "Bicycle Stores", value: "bicycle_stores" },
    { text: "Second Hand Stores", value: "second_hand_stores" },
    {
      text: "Motorcycle Shops and Dealers",
      value: "motorcycle_shops_and_dealers",
    },
    {
      text: "Children and Infants Wear Stores",
      value: "children_and_infants_wear_stores",
    },
    { text: "Women Accessory Stores", value: "women_accessory_stores" },
    { text: "Construction Materials", value: "construction_materials" },
    {
      text: "Books Periodicals and Newspaper",
      value: "books_periodicals_and_newspaper",
    },
    { text: "Floor Covering Stores", value: "floor_covering_stores" },
    {
      text: "Crystal and Glassware Stores",
      value: "crystal_and_glassware_stores",
    },
    {
      text: "Accessory and Apparel Stores",
      value: "accessory_and_apparel_stores",
    },
    {
      text: "Hardware Equipment and Supply Stores",
      value: "hardware_equipment_and_supply_stores",
    },
    {
      text: "Computers Peripheral Equipment Software",
      value: "computers_peripheral_equipment_software",
    },
    {
      text: "Automobile and Truck Dealers",
      value: "automobile_and_truck_dealers",
    },
    {
      text: "Aircraft and Farm Equipment Dealers",
      value: "aircraft_and_farm_equipment_dealers",
    },
    {
      text: "Antique Shops Sales and Repairs",
      value: "antique_shops_sales_and_repairs",
    },
    { text: "Hearing Aids Stores", value: "hearing_aids_stores" },
    { text: "Music Stores", value: "music_stores" },
    {
      text: "Furniture and Home Furnishing Store",
      value: "furniture_and_home_furnishing_store",
    },
  ],
};

export const COUNTRY_LIST = {
  country: "India",
  value: "IN",
  states: [
    {
      text: "Andaman and Nicobar Islands",
      value: "andaman_and_nicobar_islands",
    },
    { text: "Andhra Pradesh", value: "andhra_pradesh" },
    { text: "Arunachal Pradesh", value: "arunachal_pradesh" },
    { text: "Assam", value: "assam" },
    { text: "Bihar", value: "bihar" },
    { text: "Chandigarh", value: "chandigarh" },
    { text: "Chhattisgarh", value: "chhattisgarh" },
    { text: "Dadra and Nagar Haveli", value: "dadra_and_nagar_haveli" },
    { text: "Daman and Diu", value: "daman_and_diu" },
    { text: "Delhi", value: "delhi" },
    { text: "Goa", value: "goa" },
    { text: "Gujarat", value: "gujarat" },
    { text: "Haryana", value: "haryana" },
    { text: "Himachal Pradesh", value: "himachal_pradesh" },
    { text: "Jammu and Kashmir", value: "jammu_and_kashmir" },
    { text: "Jharkhand", value: "jharkhand" },
    { text: "Karnataka", value: "karnataka" },
    { text: "Kerala", value: "kerala" },
    { text: "Ladakh", value: "ladakh" },
    { text: "Lakshadweep", value: "lakshadweep" },
    { text: "Madhya Pradesh", value: "madhya_pradesh" },
    { text: "Maharashtra", value: "maharashtra" },
    { text: "Manipur", value: "manipur" },
    { text: "Meghalaya", value: "meghalaya" },
    { text: "Mizoram", value: "mizoram" },
    { text: "Nagaland", value: "nagaland" },
    { text: "Odisha", value: "odisha" },
    { text: "Puducherry", value: "puducherry" },
    { text: "Punjab", value: "punjab" },
    { text: "Rajasthan", value: "rajasthan" },
    { text: "Sikkim", value: "sikkim" },
    { text: "Tamil Nadu", value: "tamil_nadu" },
    { text: "Telangana", value: "telangana" },
    { text: "Tripura", value: "tripura" },
    { text: "Uttar Pradesh", value: "uttar_pradesh" },
    { text: "Uttarakhand", value: "uttarakhand" },
    { text: "West Bengal", value: "west_bengal" },
  ],
};
